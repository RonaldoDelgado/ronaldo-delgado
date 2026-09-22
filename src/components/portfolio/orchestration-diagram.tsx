import { deliveryStages } from "@/data/portfolio";

export function OrchestrationDiagram() {
  return (
    <div className="orchestration-panel" role="img" aria-label="Flujo de entrega Full Stack: necesidad, interfaz, APIs, datos, servicios e inteligencia artificial, entrega y seguimiento">
      <div className="orchestration-track" aria-hidden="true">
        <span className="orchestration-signal" />
      </div>
      <ol className="relative grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {deliveryStages.map((stage) => (
          <li key={stage.step} className="orchestration-node">
            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-emerald-300">{stage.step}</span>
            <strong className="mt-5 block text-sm text-white">{stage.title}</strong>
            <span className="mt-2 block text-xs leading-5 text-slate-400">{stage.detail}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
