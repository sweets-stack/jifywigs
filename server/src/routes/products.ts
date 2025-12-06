import express from 'express';
import { getProducts, getProductById } from '../controllers/product.controller';

const router = express.Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

// POST /api/products
router.post('/', (req, res) => {
  res.json({ message: 'Create product - Not implemented yet' });
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
  res.json({ message: 'Update product - Not implemented yet' });
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  res.json({ message: 'Delete product - Not implemented yet' });
});

export default router;