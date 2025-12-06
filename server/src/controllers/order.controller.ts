// server/src/controllers/order.controller.ts
import { Request, Response } from 'express';
import { Order } from '../models';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const order = new Order({
      userId: req.user.id,
      items,
      totalAmount,
      shippingAddress,
      trackingNumber: `JW${Date.now().toString(36).toUpperCase()}`,
      status: 'pending',
    });
    
    await order.save();
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(400).json({ message: 'Order creation failed', error: (error as Error).message });
  }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    order.status = status;
    order.updatedAt = new Date();
    await order.save();
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(400).json({ message: 'Status update failed' });
  }
};