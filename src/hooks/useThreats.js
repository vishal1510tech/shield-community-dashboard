import { useState, useEffect, useCallback } from 'react';
import { RECENT_INCIDENTS } from '../data/mockThreats';

export function useThreats() {
  const [threats, setThreats] = useState(RECENT_INCIDENTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchThreats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/threats');
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setThreats(data);
      }
    } catch {
      // Keep initial RECENT_INCIDENTS dataset when server API is offline
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchThreats();
  }, [fetchThreats]);

  const addThreat = useCallback((newThreat) => {
    setThreats(prev => [newThreat, ...prev]);
  }, []);

  return {
    threats,
    loading,
    error,
    refreshThreats: fetchThreats,
    addThreat
  };
}
