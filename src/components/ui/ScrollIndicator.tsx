export function ScrollIndicator() {
  return (
    <div
      className="pointer-events-none flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-eyebrow text-steel">Scroll</span>
      <span className="relative flex h-10 w-6 justify-center rounded-full border border-steel/40">
        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand animate-scrolldot" />
      </span>
    </div>
  );
}
