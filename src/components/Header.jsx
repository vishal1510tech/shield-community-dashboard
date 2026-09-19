import { NavLink } from 'react-router-dom';
import { SYSTEM_META } from '../data/mockThreats';

export default function Header() {
  return (
    <header className="bg-obsidian-900 border-b border-obsidian-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-3">
        
        {/* Brand & Domain Badge */}
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-obsidian-850 border border-obsidian-700 flex items-center justify-center text-signal-500 font-mono text-sm font-bold">
            ST
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-slate-100 font-sans">
                Shield<span className="text-signal-500">Threats</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-obsidian-950 px-2 py-0.5 rounded-sm border border-obsidian-800">
                {SYSTEM_META.domain}
              </span>
            </div>
            <span className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 font-medium -mt-0.5">
              Operational Telemetry Console
            </span>
          </div>
        </NavLink>

        {/* Global Navigation Tabs */}
        <nav className="flex items-center gap-1 font-mono text-xs">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => 
              `px-3 py-1.5 rounded-sm transition-colors border ${
                isActive 
                  ? 'bg-obsidian-800 text-signal-500 border-obsidian-700 font-bold' 
                  : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-obsidian-850'
              }`
            }
          >
            Console View
          </NavLink>

          <NavLink 
            to="/feed" 
            className={({ isActive }) => 
              `px-3 py-1.5 rounded-sm transition-colors border ${
                isActive 
                  ? 'bg-obsidian-800 text-signal-500 border-obsidian-700 font-bold' 
                  : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-obsidian-850'
              }`
            }
          >
            Live Log
          </NavLink>

          <NavLink 
            to="/analytics" 
            className={({ isActive }) => 
              `px-3 py-1.5 rounded-sm transition-colors border ${
                isActive 
                  ? 'bg-obsidian-800 text-signal-500 border-obsidian-700 font-bold' 
                  : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-obsidian-850'
              }`
            }
          >
            Analytics
          </NavLink>
        </nav>

        {/* Engine Operational Status */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-obsidian-950 border border-obsidian-800 rounded-sm font-mono text-xs text-slate-400">
          <span className="w-2 h-2 rounded-sm bg-emerald-500"></span>
          <span>{SYSTEM_META.nodeId}</span>
          <span className="text-slate-600">•</span>
          <span className="text-emerald-400 font-bold">{SYSTEM_META.telemetryStatus}</span>
        </div>

      </div>
    </header>
  );
}
