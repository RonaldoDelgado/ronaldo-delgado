import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const require = createRequire(import.meta.url);
function loadSource(relativePath, mocks = {}, globals = {}) {
  const filename = path.resolve(relativePath);
  const loadedModule = { exports: {} };
  const source = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const localRequire = (name) => {
    if (name in mocks) return mocks[name];
    if (name.startsWith("@/")) {
      const target = path.join("src", name.slice(2));
      return loadSource(`${target}${fs.existsSync(`${target}.tsx`) ? ".tsx" : ".ts"}`, mocks, globals);
    }
    return require(name);
  };
  vm.runInNewContext("(function(require,module,exports){" + source + "\n})", globals)(localRequire, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

const { defaultPortfolioContent: defaults } = loadSource("src/data/portfolio.ts");
const { normalizePortfolioContent: normalize } = loadSource("src/lib/portfolio-storage.ts");
const previousDescription = "Full Stack Developer con más de 3 años de experiencia (desde julio de 2023) en el desarrollo de aplicaciones web y móviles, APIs REST y bases de datos relacionales. Mi stack principal incluye TypeScript, React, Next.js, Node.js/NestJS, .NET 8/C#, PostgreSQL y Flutter. He desarrollado plataformas de comercio electrónico multivendedor y de gestión de operaciones empresariales, desde el modelo de datos hasta las interfaces por rol y el despliegue en Microsoft Azure. Integro y administro servicios de Microsoft Azure (servidores y máquinas virtuales, bases de datos PostgreSQL, almacenamiento, monitoreo y analítica, traducción e IA con Azure OpenAI) y APIs de terceros para conectar sistemas y automatizar procesos.";

test("hero keeps seniority out of the headline and removes fixed years, including saved defaults", () => {
  assert.equal(defaults.hero.headline, "Full Stack Developer | AI Engineer");
  assert.equal(normalize({ hero: { headline: "Full Stack Developer Semisenior | AI Engineer" } }).hero.headline, defaults.hero.headline);
  assert.match(defaults.hero.description, /semisenior/);
  assert.doesNotMatch(defaults.hero.description, /3 años|julio de 2023/);
  const migrated = normalize({ hero: { headline: "Full Stack Developer | AI Engineer", description: previousDescription } });
  assert.equal(migrated.hero.headline, defaults.hero.headline);
  assert.equal(migrated.hero.description, defaults.hero.description);
  assert.equal(normalize({ hero: { headline: "Mi título", description: "Mi experiencia propia" } }).hero.description, "Mi experiencia propia");
  assert.equal(normalize({ hero: { headline: "Mi título" } }).hero.headline, "Mi título");
});

function sliderHarness(images, reducedMotion = false) {
  let cursor = 0;
  const slots = [];
  const pending = [];
  let timer;
  let delay;
  const react = require("react");
  const hooks = {
    ...react,
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = initial;
      return [slots[index], (value) => { slots[index] = typeof value === "function" ? value(slots[index]) : value; }];
    },
    useRef(initial) {
      const index = cursor++;
      return slots[index] ??= { current: initial };
    },
    useEffect(effect, dependencies) {
      const index = cursor++;
      const previous = slots[index];
      if (!previous || dependencies.some((value, i) => value !== previous.dependencies[i])) {
        pending.push(() => {
          previous?.cleanup?.();
          slots[index] = { dependencies, cleanup: effect() };
        });
      }
    },
  };
  const window = {
    matchMedia: () => ({ matches: reducedMotion, addEventListener() {}, removeEventListener() {} }),
    setInterval: (callback, ms) => { timer = callback; delay = ms; return 1; },
    clearInterval: () => { timer = undefined; },
  };
  const { ProjectSlider } = loadSource("src/components/portfolio/project-slider.tsx", {
    react: hooks,
    "next/image": { __esModule: true, default: "img" },
    "@/components/portfolio/image-placeholder": { ImagePlaceholder: "placeholder" },
  }, { window });
  return {
    render() {
      cursor = 0;
      const tree = ProjectSlider({ images, title: "Demo" });
      pending.splice(0).forEach((effect) => effect());
      return tree;
    },
    tick: () => timer?.(),
    get delay() { return delay; },
  };
}
function find(tree, predicate) {
  if (!tree || typeof tree !== "object") return undefined;
  if (predicate(tree)) return tree;
  for (const child of [tree.props?.children].flat(Infinity)) {
    const found = find(child, predicate);
    if (found) return found;
  }
}
const images = [{ src: "/one.png", alt: "One" }, { src: "/two.png", alt: "Two" }];
const button = (tree, text) => find(tree, (node) => node.type === "button" && node.props["aria-label"]?.includes(text));

test("slider advances faster on a persistent animated track", () => {
  const harness = sliderHarness(images);
  harness.render();
  assert.equal(harness.delay, 3500);
  harness.tick();
  const tree = harness.render();
  const track = find(tree, (node) => node.props.className === "project-slider-track");
  assert.ok(track, "Slides stay mounted on a moving track");
  assert.equal(track.props.style.transform, "translateX(-100%)");
  assert.equal(track.props.children.length, 2);
  assert.equal(track.props.children[0].props["aria-hidden"], true);
  assert.equal(track.props.children[1].props["aria-hidden"], false);
  const css = fs.readFileSync("src/app/globals.css", "utf8");
  assert.match(css, /\.project-slider-track\s*\{[^}]*transition:\s*transform 360ms/);
});

test("previous/next wrapping, focus pause, pointer resume and reduced motion still work", () => {
  const harness = sliderHarness(images);
  let tree = harness.render();
  button(tree, "anterior").props.onClick();
  tree = harness.render();
  assert.ok(find(tree, (node) => node.props["aria-label"] === "Captura 2 de 2"));
  assert.equal(harness.tick(), undefined);
  button(tree, "siguiente").props.onClick();
  tree = harness.render();
  assert.ok(find(tree, (node) => node.props["aria-label"] === "Captura 1 de 2"));
  const resume = button(tree, "Reanudar");
  resume.props.onPointerDown();
  tree.props.onFocusCapture();
  resume.props.onClick({ detail: 1 });
  harness.render();
  harness.tick();
  tree = harness.render();
  assert.ok(find(tree, (node) => node.props["aria-label"] === "Captura 2 de 2"));
  tree.props.onFocusCapture();
  tree = harness.render();
  assert.ok(button(tree, "Reanudar"));
  const reduced = sliderHarness(images, true);
  reduced.render();
  const reducedTree = reduced.render();
  assert.equal(reduced.delay, undefined);
  assert.equal(button(reducedTree, "movimiento reducido").props.disabled, true);
  assert.equal(sliderHarness([]).render().type, "placeholder");
  assert.equal(find(sliderHarness(images.slice(0, 1)).render(), (node) => node.type === "button"), undefined);
});
