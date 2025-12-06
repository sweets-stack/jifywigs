// server/src/utils/sms.ts
import axios from 'axios';

export const sendSMS = async (to: string, message: string) => {
  // In real app: integrate with SMS provider (Termii, Twilio, etc.)
  console.log(`[SMS] To: ${to} | Message: ${message}`);
  return { success: true };
};