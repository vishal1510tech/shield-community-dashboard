import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReportForm from './pages/ReportForm';
import LiveFeed from './pages/LiveFeed';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        
        {/* Navigation Bar */}
        <nav className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-700 tracking-tight">ShieldCommunity</h1>
            <div className="space-x-6 font-medium">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Report Threat</Link>
              <Link to="/feed" className="text-gray-600 hover:text-blue-600 transition">Live Feed</Link>
              <Link to="/analytics" className="text-gray-600 hover:text-blue-600 transition">Analytics</Link>
            </div>
          </div>
        </nav>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<ReportForm />} />
          <Route path="/feed" element={<LiveFeed />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;