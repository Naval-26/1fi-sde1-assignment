import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routes/products.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL?.split(',').map(s => s.trim()) || '*' }));
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true, service: '1Fi EMI API' }));
app.use('/api/products', productRoutes);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;
if (!uri) { console.error('MONGODB_URI is missing'); process.exit(1); }

mongoose.connect(uri).then(() => {
  app.listen(port, () => console.log(`API running on http://localhost:${port}`));
}).catch(err => { console.error('MongoDB connection failed', err); process.exit(1); });
