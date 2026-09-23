import { deliveryStages } from "@/data/portfolio";

export function OrchestrationDiagram() {
  return (
    <div className="orchestration-panel">
      <div className="orchestration-track" aria-hidden="true">
        <span className="orchestration-signal" />
      </div>
      <ol className="relative grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {deliveryStages.map((stage) => (
          <li key={stage.step} className="orchestration-node">
            <span className="font-mono text-[0.8rem] tracking-[0.16em] text-emerald-300">{stage.step}</span>
            <strong className="mt-5 block text-sm text-white">{stage.title}</strong>
            <span className="mt-2 block text-sm leading-6 text-slate-400">{stage.detail}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
