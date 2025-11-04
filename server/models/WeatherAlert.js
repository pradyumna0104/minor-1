import mongoose from 'mongoose';

const weatherAlertSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const WeatherAlert = mongoose.model('WeatherAlert', weatherAlertSchema);
export default WeatherAlert;