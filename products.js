import { Router } from 'express';
import Product from '../models/Product.js';
const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const products = await Product.find({}, 'slug brand name description variants').sort({ createdAt: 1 });
    res.json(products);
  } catch (e) { next(e); }
});

router.get('/:slug', async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (e) { next(e); }
});
export default router;
