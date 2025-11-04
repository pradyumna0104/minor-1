import mongoose from 'mongoose';

const mandiPriceSchema = mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    trend: {
      type: String,
      enum: ['upward', 'downward', 'stable'],
      default: 'stable',
    },
    // For graph generation
    priceHistory: [
      {
        price: Number,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MandiPrice = mongoose.model('MandiPrice', mandiPriceSchema);
export default MandiPrice;