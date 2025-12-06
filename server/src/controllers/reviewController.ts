import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { Review } from '../../../shared/models/Review';
import { Product } from '../../../shared/models/Product';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const createReview = async (req: Request, res: Response) => {
  try {
    const { productId, rating, comment, userId, userName } = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const imageFiles = files?.['images'] || [];

    // Validate
    if (!productId || !rating || !comment || !userId || !userName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Upload images
    const imageUrls: string[] = [];
    for (const file of imageFiles.slice(0, 3)) {
      try {
        const buffer = Buffer.from(file.buffer);
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'jifywigs/reviews' },
            (error, result) => error ? reject(error) : resolve(result)
          );
          uploadStream.end(buffer);
        });
        imageUrls.push((result as any).secure_url);
      } catch (uploadError) {
        console.warn('Image upload failed:', uploadError);
      }
    }

    // Create review
    const review = new Review({
      productId,
      userId,
      userName,
      rating,
      comment,
      images: imageUrls,
      verified: false, // Set to true if user purchased
      status: 'pending'
    });

    await review.save();

    res.status(201).json({
      _id: review._id,
      productId: review.productId,
      userName: review.userName,
      rating: review.rating,
      comment: review.comment,
      images: review.images,
      verified: review.verified,
      createdAt: review.createdAt
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};