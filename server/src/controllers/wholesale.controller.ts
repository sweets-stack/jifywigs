// server/src/controllers/wholesale.controller.ts
import { Request, Response } from 'express';
// import { WholesaleApplication } from '../models'; // REMOVE IF NOT USING

export const createWholesaleApplication = async (req: Request, res: Response) => {
  try {
    // If you're not using wholesale, return 501 Not Implemented
    return res.status(501).json({ 
      success: false, 
      message: 'Wholesale applications are not available at this time' 
    });
    
    /* 
    // If you want to keep the code but disable:
    const application = new WholesaleApplication({
      ...req.body,
      userId: req.user?.id,
      submittedAt: new Date(),
      status: 'pending',
    });

    await application.save();
    res.status(201).json({ success: true, application });
    */
  } catch (error) {
    res.status(400).json({ message: 'Submission failed', error: (error as Error).message });
  }
};

export const getWholesaleApplications = async (req: Request, res: Response) => {
  // Return empty or disabled
  res.json({
    applications: [],
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      pages: 0,
    },
  });
};

export const updateWholesaleApplication = async (req: Request, res: Response) => {
  return res.status(501).json({ 
    success: false, 
    message: 'Wholesale applications are not available at this time' 
  });
};