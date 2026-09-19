import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Console from './pages/Console';
import ReportForm from './pages/ReportForm';
import LiveFeed from './pages/LiveFeed';
import Analytics from './pages/Analytics';
import { useThreats } from './hooks/useThreats';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { threats, addThreat } = useThreats();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cyber-dark text-slate-100 font-sans flex">
        
        {/* Left Vertical Navigation Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        {/* Main Content Area (Offset for Desktop Sidebar) */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          
          {/* Topbar Header */}
          <Topbar 
            onToggleSidebar={() => setSidebarOpen(prev => !prev)} 
          />

          {/* Page Routing Views */}
          <main className="flex-1 px-4 sm:px-6 py-6 max-w-7xl w-full mx-auto space-y-6">
            <Routes>
              <Route 
                path="/" 
                element={<Console threats={threats} />} 
              />
              <Route 
                path="/report" 
                element={<ReportForm addThreat={addThreat} />} 
              />
              <Route 
                path="/feed" 
                element={<LiveFeed threats={threats} />} 
              />
              <Route 
                path="/analytics" 
                element={<Analytics />} 
              />
            </Routes>
          </main>

          {/* Footer Bar */}
          <footer className="border-t border-cyber-border bg-cyber-dark py-4 text-xs font-mono text-slate-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
              <p>© {new Date().getFullYear()} threats.shieldcommunity.io — Shield AI Threat Detection System.</p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>SQLite Persistent Core</span>
                <span>•</span>
                <span className="text-cyan-400 font-bold">Neural Model v4.2</span>
              </div>
            </div>
          </footer>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
