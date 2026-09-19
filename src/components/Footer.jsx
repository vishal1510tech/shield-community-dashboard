import { SYSTEM_META } from '../data/mockThreats';

export default function Footer() {
  return (
    <footer className="border-t border-obsidian-800 bg-obsidian-950 py-4 font-mono text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <span>© {new Date().getFullYear()} {SYSTEM_META.domain}</span>
          <span className="mx-2 text-slate-700">|</span>
          <span className="text-slate-400">Automated PII & Session Token Sanitization Engine</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>Engine: <strong className="text-slate-300">{SYSTEM_META.engineVersion}</strong></span>
          <span className="text-slate-700">•</span>
          <span>Storage: <strong className="text-slate-300">{SYSTEM_META.dbType}</strong></span>
        </div>
      </div>
    </footer>
  );
}
