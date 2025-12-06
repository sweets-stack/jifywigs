// server/src/controllers/admin.controller.ts

import { Request, Response } from 'express';
import { AdminService } from '../services/AdminService';

export const getAnalyticsDashboard = async (req: Request, res: Response) => {
  try {
    const { range = 'month' } = req.query;
    const data = await AdminService.getAnalyticsDashboard(range as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: (error as Error).message });
  }
};

export const exportAnalytics = async (req: Request, res: Response) => {
  try {
    const { metric, range = 'month' } = req.query;
    const csv = await AdminService.exportMetric(metric as string, range as string);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${metric}_${range}_report.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: 'Export failed', error: (error as Error).message });
  }
};