export default function Loading() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden bg-brand-100/40"
      role="status"
      aria-label="Loading page"
    >
      <div className="route-progress h-full w-1/3 bg-brand-500" />
    </div>
  );
}
