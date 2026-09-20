import IncidentStreamTable from '../components/IncidentStreamTable';

export default function LiveFeed({ threats }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="px-3 py-1 rounded-full bg-white/10 text-white font-bold border border-white/20 backdrop-blur-md shadow-xs">
            ✦ REALTIME LOG STREAM
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans mt-2">
          Live Incident <span className="font-serif italic font-normal text-slate-300">Detection Feed</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Continuous telemetry stream of evaluated threat indicators stored in SQLite database.
        </p>
      </div>

      <IncidentStreamTable extraThreats={threats} />
    </div>
  );
}
