import { NavLink } from 'react-router-dom';

export default function Topbar({ onToggleSidebar }) {
  return (
    <header className="bg-black/60 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Button & Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl btn-3d-secondary text-slate-200 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search threat indicators, IP addresses, domains, or CVE IDs..."
              className="w-full pl-10 pr-4 py-2.5 input-3d rounded-xl text-xs text-white placeholder-slate-400 outline-none transition font-sans"
            />
          </div>
        </div>

        {/* Right Side: Quick Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Quick Scan Action Button (Shiny Metallic 3D Primary) */}
          <NavLink
            to="/report"
            className="btn-3d-primary px-4 py-2 rounded-full text-xs shrink-0 shadow-md"
          >
            <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Scan Indicator</span>
          </NavLink>

        </div>

      </div>
    </header>
  );
}
