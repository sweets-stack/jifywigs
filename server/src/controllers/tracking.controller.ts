// server/src/controllers/tracking.controller.ts
import { Request, Response } from 'express';
import { Order, Booking } from '../models';

export const getTrackingInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Try Order first
    const order = await Order.findOne({ trackingNumber: id });
    if (order) {
      return res.json({
        type: 'order',
        id: order._id,
        trackingNumber: order.trackingNumber,
        status: order.status,
        items: order.items,
        updatedAt: order.updatedAt,
        history: [
          { status: 'Order Placed', date: order.createdAt },
          { status: 'Processing', date: order.updatedAt },
          ...(order.status === 'shipped' ? [{ status: 'Shipped', date: new Date() }] : []),
          ...(order.status === 'delivered' ? [{ status: 'Delivered', date: new Date() }] : []),
        ],
      });
    }

    // Try Booking
    const booking = await Booking.findOne({ trackingNumber: id }).populate('services.serviceId');
    if (booking) {
      return res.json({
        type: 'booking',
        id: booking._id,
        trackingNumber: booking.trackingNumber,
        status: booking.status,
        services: booking.services.map((s: any) => s.serviceId.name),
        updatedAt: booking.updatedAt,
        history: [
          { status: 'Booking Submitted', date: booking.createdAt },
          ...(booking.status !== 'pending' ? [{ status: 'Confirmed', date: new Date(Date.now() - 86400000) }] : []),
          ...(booking.status === 'received' ? [{ status: 'Wig Received', date: new Date() }] : []),
          ...(booking.status === 'in_progress' ? [{ status: 'Treatment Started', date: new Date() }] : []),
          ...(booking.status === 'completed' ? [{ status: 'Completed', date: new Date() }] : []),
        ],
      });
    }

    res.status(404).json({ message: 'Tracking number not found' });
  } catch (error) {
    res.status(500).json({ message: 'Tracking failed' });
  }
};