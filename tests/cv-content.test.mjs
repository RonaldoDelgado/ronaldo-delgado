import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

for (const [language, filename, role, experience] of [
  ["es", "ronaldo-delgado-cv.html", "Desarrollador Full Stack Semisenior", /experiencia profesional y en proyectos propios/],
  ["en", "ronaldo-delgado-cv-en.html", "Mid-Level Full Stack Developer", /professional and independent project experience/],
]) {
  test(`${language}: level-neutral summary without fixed years; actual Luhos role retained`, () => {
    const html = fs.readFileSync(`public/${filename}`, "utf8");
    const summary = html.match(/<p class="summary">([\s\S]*?)<\/p>/)[1].replace(/\s+/g, " ");
    assert.doesNotMatch(summary, /3\+? (?:años|years)|since July 2023|desde julio de 2023/i);
    assert.doesNotMatch(summary, /semisenior|mid-level/i);
    assert.match(summary, experience);
    assert.match(html, /<title>Ronaldo Delgado \| Full Stack Developer<\/title>/);
    const jobs = [...html.matchAll(/<h3>([^<]+) · <span class="company-role">([^<]+)<\/span><\/h3>/g)]
      .filter((entry) => ["Luhos", "Tanku", "Gudfy"].includes(entry[2]));
    assert.equal(jobs.length, 3);
    assert.equal(jobs[0][1], role);
    assert.equal(jobs[0][2], "Luhos");
    assert.equal(jobs[1][1], "Full Stack Developer");
    assert.equal(jobs[1][2], "Tanku");
    assert.equal(jobs[2][1], "Full Stack Developer");
    assert.equal(jobs[2][2], "Gudfy");
    assert.match(html, /2025 – /);
    assert.match(html, /2023 – /);
    assert.match(html, /src="foto-perfil.jpg"/);
    assert.match(summary, /Azure OpenAI/);
  });
}
