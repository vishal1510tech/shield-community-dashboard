import { useState } from 'react';

export default function LiveFeed() {
  // Mock data simulating Ruhan's database and Arbaaz's threat scores
  const [threats] = useState([
    { id: 1, type: 'URL', indicator: 'http://free-crypto-giveaway.com', score: 95, timestamp: '10 mins ago' },
    { id: 2, type: 'IP', indicator: '192.168.1.45', score: 65, timestamp: '1 hour ago' },
    { id: 3, type: 'Email', indicator: 'invoice-update@paypa1-support.com', score: 88, timestamp: '2 hours ago' },
    { id: 4, type: 'URL', indicator: 'https://local-library.org', score: 12, timestamp: '5 hours ago' },
  ]);

  // Dynamic styling function based on Risk Score
  const getRiskColor = (score) => {
    if (score >= 80) return 'bg-red-100 border-red-500 text-red-900';
    if (score >= 40) return 'bg-yellow-100 border-yellow-500 text-yellow-900';
    return 'bg-green-100 border-green-500 text-green-900';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Live Community Threats</h2>
      
      <div className="space-y-4">
        {threats.map((threat) => (
          <div 
            key={threat.id} 
            className={`p-5 rounded-xl border-l-8 shadow-sm flex justify-between items-center ${getRiskColor(threat.score)}`}
          >
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <span className="font-bold uppercase tracking-wider text-sm opacity-80">
                  [{threat.type}]
                </span>
                <span className="text-sm opacity-70">{threat.timestamp}</span>
              </div>
              <p className="font-mono text-lg font-semibold truncate max-w-md">
                {threat.indicator}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-3xl font-black">{threat.score}/100</div>
              <div className="text-sm font-medium uppercase tracking-wide opacity-80">Risk Score</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}