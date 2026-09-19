import { NavLink } from 'react-router-dom';

export default function Topbar({ onToggleSidebar, onOpenReportModal }) {
  return (
    <header className="bg-cyber-dark/80 backdrop-blur-md border-b border-cyber-border sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Button & Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-cyber-card border border-cyber-border text-slate-400 hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search threat indicators, IP addresses, domains, or CVE IDs..."
              className="w-full pl-9 pr-4 py-2 bg-cyber-card border border-cyber-border rounded-lg text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500 transition font-mono"
            />
          </div>
        </div>

        {/* Right Side: Status Pills & Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Domain Status Tag */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-cyber-card border border-cyber-border rounded-lg text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>threats.shieldcommunity.io</span>
          </div>

          {/* Quick Scan Action Button */}
          <NavLink
            to="/report"
            className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-cyber-dark text-xs font-extrabold rounded-lg transition shadow-md shadow-cyan-500/20 flex items-center gap-1.5 shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Scan Indicator</span>
          </NavLink>

        </div>

      </div>
    </header>
  );
}
