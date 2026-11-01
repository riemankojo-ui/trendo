
export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const cls = size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl";
  return (
    <span className={`font-extrabold tracking-tight ${cls}`} aria-label="TRENDO">
      <span className="text-trendo-primary">TREN</span>
      <span className="text-trendo-text">DO</span>
    </span>
  );
}