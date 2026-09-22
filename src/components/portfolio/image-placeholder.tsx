import { ImageIcon } from "lucide-react";

interface ImagePlaceholderProps {
  label: string;
  note?: string;
  className?: string;
}

export function ImagePlaceholder({ label, note, className = "" }: ImagePlaceholderProps) {
  return (
    <div className={`placeholder-grid relative overflow-hidden rounded-[1.5rem] border border-dashed border-emerald-200/25 bg-[#0a1714] ${className}`}>
      <div className="relative flex h-full min-h-48 items-center justify-center p-6 text-center">
        <div className="max-w-sm">
          <span className="mx-auto grid size-11 place-items-center rounded-2xl border border-emerald-200/20 bg-emerald-300/8 text-emerald-200">
            <ImageIcon className="size-5" aria-hidden="true" />
          </span>
          <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-emerald-200">Placeholder editorial</p>
          <p className="mt-2 font-semibold text-white">{label}</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {note ?? "Captura real pendiente. No se muestra una imagen ficticia."}
          </p>
        </div>
      </div>
    </div>
  );
}
