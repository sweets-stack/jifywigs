import { Request, Response } from 'express';
import { Product } from '../schemas/Product'; // Use your server's Product model

export const getProducts = async (req: Request, res: Response) => {
  try {
    console.log('📦 Fetching products...');
    
    // Get query parameters
    const { 
      category, 
      lace, 
      density, 
      length, 
      price_min, 
      price_max, 
      new: isNew, 
      sale, 
      inStock 
    } = req.query;

    const filters: any = {};
    
    // Apply filters
    if (category) filters.category = category;
    if (lace) filters.laceType = lace;
    if (density) filters.density = Number(density);
    if (length) filters.length = length;
    
    // Price range filter
    if (price_min || price_max) {
      const priceFilter: any = {};
      if (price_min) priceFilter.$gte = Number(price_min);
      if (price_max) priceFilter.$lte = Number(price_max);
      filters.$or = [
        { discountPrice: priceFilter },
        { price: priceFilter }
      ];
    }
    
    // New products filter
    if (isNew === 'true') filters.isNewProduct = true;
    
    // Sale products filter
    if (sale === 'true') filters.discountPrice = { $ne: null };
    
    // Stock filter
    const inStockParam = req.query.inStock as string;
    if (inStockParam === 'false') filters.inStock = false;
    else if (inStockParam === 'true') filters.inStock = true;
    
    console.log('Filters:', filters);
    
    // Fetch products
    const products = await Product.find(filters)
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`✅ Found ${products.length} products`);
    res.json(products);
    
  } catch (error: any) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: error.message 
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`📦 Fetching product with ID: ${id}`);
    
    const product = await Product.findById(id).lean();
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error: any) {
    console.error('❌ Error fetching product:', error);
    res.status(500).json({ 
      error: 'Failed to fetch product',
      message: error.message 
    });
  }
};