import IncidentStreamTable from '../components/IncidentStreamTable';

export default function LiveFeed({ threats }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-cyber-border pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
            REALTIME LOG STREAM
          </span>
          <span>•</span>
          <span>threats.shieldcommunity.io</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-sans mt-1">
          Live Incident Detection Feed
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Continuous telemetry stream of evaluated threat indicators stored in SQLite database.
        </p>
      </div>

      <IncidentStreamTable extraThreats={threats} />
    </div>
  );
}
