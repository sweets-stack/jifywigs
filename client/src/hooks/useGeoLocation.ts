// client/src/hooks/useGeoLocation.ts
import { useState, useEffect } from 'react';

export const useGeoLocation = () => {
  const [country, setCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch('/api/utils/geo');
        const data = await res.json();
        setCountry(data.country);
      } catch {
        setCountry('NG'); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, []);

  return { country, loading };
};