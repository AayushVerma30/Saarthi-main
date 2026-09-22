export default function EventsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900">Events</h1>
        <p className="text-slate-500">No events currently scheduled.</p>
      </div>
      
      {/* Empty State / Content removed as requested */}
      <div className="flex items-center justify-center py-20 text-slate-400">
        No data available.
      </div>
    </div>
  );
}
