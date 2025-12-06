// server/src/controllers/wholesale.controller.ts
import { Request, Response } from 'express';
import { WholesaleApplication } from '../models';

export const createWholesaleApplication = async (req: Request, res: Response) => {
  try {
    const application = new WholesaleApplication({
      ...req.body,
      userId: req.user?.id,
      submittedAt: new Date(),
      status: 'pending',
    });

    await application.save();

    // Send notification to admin
    // (Integration with EmailService/SMS later)

    res.status(201).json({ success: true, application });
  } catch (error) {
    res.status(400).json({ message: 'Submission failed', error: (error as Error).message });
  }
};

export const getWholesaleApplications = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};

    const applications = await WholesaleApplication.find(filter)
      .populate('userId', 'name email')
      .sort({ submittedAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const total = await WholesaleApplication.countDocuments(filter);

    res.json({
      applications,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
};

export const updateWholesaleApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const application = await WholesaleApplication.findByIdAndUpdate(
      id,
      {
        status,
        notes,
        reviewedAt: new Date(),
        reviewedBy: req.user?.id,
      },
      { new: true }
    ).populate('userId', 'name email');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Trigger email to applicant
    // await NotificationService.sendWholesaleStatusUpdate(application);

    res.json({ success: true, application });
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
};