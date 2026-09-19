import InspectionPanel from '../components/InspectionPanel';

export default function ReportForm({ addThreat }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="border-b border-cyber-border pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
            INDICATOR SCANNER
          </span>
          <span>•</span>
          <span>threats.shieldcommunity.io</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight font-sans mt-1">
          Ingest & Analyze Indicator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Input suspicious URLs, IP addresses, or email headers for real-time parameter sanitization and AI risk scoring.
        </p>
      </div>

      <InspectionPanel onThreatAdded={addThreat} />
    </div>
  );
}
