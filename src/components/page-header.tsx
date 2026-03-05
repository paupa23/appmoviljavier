import { HelpButton } from "@/components/help-button";

interface PageHeaderProps {
  title: string;
  description?: string;
  helpKey?: string;
}

export function PageHeader({ title, description, helpKey }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 pb-2">
      <div className="space-y-1.5">
        {/* Overline */}
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-0.5 rounded-full"
            style={{ background: "linear-gradient(90deg, #F54C49, #CA605E)" }}
          />
          <span
            className="text-[10px] font-bold tracking-[0.25em] uppercase"
            style={{ color: "#F54C49", fontFamily: "'Geist', sans-serif" }}
          >
            Sección
          </span>
        </div>

        {/* Título */}
        <h1
          className="text-3xl font-bold leading-tight"
          style={{
            color: "#F8F6F6",
            fontFamily: "'Geist', sans-serif",
            letterSpacing: "-0.03em",
            textShadow: "0 2px 20px rgba(245,76,73,0.15)",
          }}
        >
          {title}
        </h1>

        {/* Descripción */}
        {description && (
          <p
            className="text-sm leading-relaxed"
            style={{ color: "#755E5E", fontFamily: "'Noto Sans JP', sans-serif" }}
          >
            {description}
          </p>
        )}
      </div>

      {helpKey && (
        <div className="flex-shrink-0 mt-1">
          <HelpButton helpKey={helpKey} />
        </div>
      )}
    </div>
  );
}
