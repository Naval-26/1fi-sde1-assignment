import mongoose from 'mongoose';

const emiPlanSchema = new mongoose.Schema({
  tenureMonths: { type: Number, required: true },
  monthlyAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true },
  cashback: { type: Number, default: 0 }
}, { _id: true });

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  storage: { type: String, required: true },
  image: { type: String, required: true },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  emiPlans: { type: [emiPlanSchema], validate: v => v.length >= 2 }
}, { _id: true });

const productSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true, index: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '' },
  variants: { type: [variantSchema], validate: v => v.length >= 2 }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
