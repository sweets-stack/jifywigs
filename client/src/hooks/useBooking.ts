// client/src/hooks/useBooking.ts
import { useState } from 'react';

export const useBooking = () => {
  const [bookingId, setBookingId] = useState<string | null>(null);

  const createBooking = async (payload?: unknown) => {
    // In real app: call API
    const id = `BK-${Date.now().toString().slice(-4)}`;
    setBookingId(id);
    return id;
  };

  return {
    bookingId,
    createBooking,
  };
};