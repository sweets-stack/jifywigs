// server/src/utils/geo.ts
import axios from 'axios';

export const getCountryFromIP = async (ip: string): Promise<string> => {
  if (ip === '127.0.0.1' || ip === '::1') return 'NG';

  try {
    const res = await axios.get(`https://ipapi.co/${ip}/json/`, {
      timeout: 2000,
    });
    return res.data.country || 'NG';
  } catch {
    return 'NG';
  }
};