import type { OverviewCardProps } from "../../interfaces/OverviewCard";

export default function OverviewCard({
  icon,
  heading,
  content,
}: OverviewCardProps) {
  return (
    <div className="flex flex-col items-center gap-1 p-4 bg-[var(--color-bg-solid)] border border-[var(--color-border)] rounded-2xl shadow-sm w-full text-center">
      <span className="text-[var(--color-accent)] text-base">{icon}</span>
      <h3 className="font-bold">{heading}</h3>
      <p>{content}</p>
    </div>
  );
}
