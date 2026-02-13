export default function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: string;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-(--app-fg) md:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-(--muted)">{subtitle}</p> : null}
      </div>
      {action ? (
        <button className="text-xs uppercase tracking-[0.22em] text-(--muted) transition hover:text-(--app-fg)">
          {action}
        </button>
      ) : null}
    </div>
  );
}
