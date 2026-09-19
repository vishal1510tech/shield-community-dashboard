import { NavLink } from 'react-router-dom';
import { SYSTEM_HEALTH } from '../data/mockThreats';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Vertical Sidebar Console Panel */}
      <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-cyber-dark border-r border-cyber-border z-50 flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Top Header & Brand */}
        <div className="p-5 border-b border-cyber-border space-y-4">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold text-lg shadow-sm shadow-cyan-500/20">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <span className="text-base font-extrabold text-slate-100 tracking-tight flex items-center gap-1.5 font-sans">
                  Shield<span className="text-cyan-400">AI</span>
                </span>
                <span className="block text-[10px] font-mono tracking-widest text-slate-400 font-semibold uppercase -mt-0.5">
                  Threat Detection
                </span>
              </div>
            </NavLink>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
              v4.2
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-3 py-4 space-y-6 overflow-y-auto font-sans">
          
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 mb-2 font-semibold">
              Monitoring & SOC
            </span>
            <nav className="space-y-1">
              <NavLink
                to="/"
                end
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-card-hover border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Overview Dashboard</span>
                </div>
              </NavLink>

              <NavLink
                to="/feed"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-card-hover border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Live Threat Feed</span>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30">
                  LIVE
                </span>
              </NavLink>

              <NavLink
                to="/analytics"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-card-hover border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Threat Analytics</span>
                </div>
              </NavLink>

              <NavLink
                to="/report"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-cyber-card-hover border border-transparent'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Indicator Scanner</span>
                </div>
              </NavLink>
            </nav>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 mb-2 font-semibold">
              Telemetry Engine
            </span>
            <div className="space-y-1 text-xs">
              <div className="px-3 py-2 rounded-lg bg-cyber-card border border-cyber-border text-slate-400 space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span>CPU Cluster Load</span>
                  <span className="font-mono text-cyan-400 font-bold">{SYSTEM_HEALTH.cpuUsage}%</span>
                </div>
                <div className="w-full bg-cyber-border h-1.5 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${SYSTEM_HEALTH.cpuUsage}%` }}></div>
                </div>

                <div className="flex justify-between items-center text-[11px] pt-1">
                  <span>RAM Memory</span>
                  <span className="font-mono text-blue-400 font-bold">{SYSTEM_HEALTH.memoryUsage}%</span>
                </div>
                <div className="w-full bg-cyber-border h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: `${SYSTEM_HEALTH.memoryUsage}%` }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Operator Profile Card */}
        <div className="p-3 border-t border-cyber-border bg-cyber-card">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-cyber-dark border border-cyber-border">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/30">
              OP
            </div>
            <div className="flex-1 truncate">
              <span className="block text-xs font-bold text-slate-100 truncate">SOC Lead Operator</span>
              <span className="block text-[10px] font-mono text-emerald-400 font-semibold truncate">
                threats.shieldcommunity.io
              </span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
}
