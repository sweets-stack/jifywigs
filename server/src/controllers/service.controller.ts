// server/src/controllers/service.controller.ts
import { Request, Response } from 'express';
import { Service } from '../models';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};