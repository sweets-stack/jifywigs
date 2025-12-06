// server/src/controllers/booking.controller.ts
import { Request, Response } from 'express';
import { Booking } from '../models';
import { v4 as uuidv4 } from 'uuid';

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { services, wigPhotos, description, appointmentDate, pickupOption } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const booking = new Booking({
      userId: req.user.id,
      services,
      wigPhotos,
      description,
      appointmentDate: new Date(appointmentDate),
      pickupOption,
    });

    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(400).json({ message: 'Booking failed', error: (error as Error).message });
  }
};

export const getBookingsByUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const bookings = await Booking.find({ userId: req.user.id }).populate('services.serviceId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};