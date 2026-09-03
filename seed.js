import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
dotenv.config();

const img = {
  iphoneOrange: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=85',
  iphoneBlue: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=900&q=85',
  samsung: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85',
  pixel: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85',
  oneplus: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=900&q=85'
};
const plans = (base, low = 0) => [
  { tenureMonths: 3, monthlyAmount: Math.round(base / 3), interestRate: 0, cashback: 7500 },
  { tenureMonths: 6, monthlyAmount: Math.round(base / 6), interestRate: 0, cashback: 7500 },
  { tenureMonths: 12, monthlyAmount: Math.round(base / 12), interestRate: 0, cashback: 7500 },
  { tenureMonths: 24, monthlyAmount: Math.round((base * 1.03) / 24), interestRate: 0, cashback: 7500 },
  { tenureMonths: 36, monthlyAmount: Math.round((base * 1.105) / 36), interestRate: 10.5, cashback: 7500 },
  { tenureMonths: 48, monthlyAmount: Math.round((base * 1.105) / 48), interestRate: 10.5, cashback: 7500 }
];
const data = [
  { slug:'apple-iphone-17-pro', brand:'Apple', name:'iPhone 17 Pro', description:'Premium smartphone with a pro camera system and all-day performance.', variants:[
    {name:'256GB Orange',color:'Orange',storage:'256GB',image:img.iphoneOrange,mrp:134900,price:127400,emiPlans:plans(127400)},
    {name:'512GB Blue',color:'Blue',storage:'512GB',image:img.iphoneBlue,mrp:154900,price:146900,emiPlans:plans(146900)}]},
  { slug:'samsung-s24-ultra', brand:'Samsung', name:'Galaxy S24 Ultra', description:'Large flagship display, powerful camera and premium titanium design.', variants:[
    {name:'256GB Titanium Black',color:'Titanium Black',storage:'256GB',image:img.samsung,mrp:129999,price:119999,emiPlans:plans(119999)},
    {name:'512GB Titanium Gray',color:'Titanium Gray',storage:'512GB',image:img.samsung,mrp:139999,price:129999,emiPlans:plans(129999)}]},
  { slug:'google-pixel-9-pro', brand:'Google', name:'Pixel 9 Pro', description:'Google AI features with a refined camera experience.', variants:[
    {name:'256GB Obsidian',color:'Obsidian',storage:'256GB',image:img.pixel,mrp:109999,price:99999,emiPlans:plans(99999)},
    {name:'512GB Porcelain',color:'Porcelain',storage:'512GB',image:img.pixel,mrp:119999,price:109999,emiPlans:plans(109999)}]},
  { slug:'oneplus-13', brand:'OnePlus', name:'OnePlus 13', description:'Fast, fluid flagship performance with a vivid display.', variants:[
    {name:'256GB Black',color:'Black',storage:'256GB',image:img.oneplus,mrp:69999,price:64999,emiPlans:plans(64999)},
    {name:'512GB Blue',color:'Blue',storage:'512GB',image:img.oneplus,mrp:79999,price:73999,emiPlans:plans(73999)}]}
];
await mongoose.connect(process.env.MONGODB_URI);
await Product.deleteMany({});
await Product.insertMany(data);
console.log(`Seeded ${data.length} products.`);
await mongoose.disconnect();
