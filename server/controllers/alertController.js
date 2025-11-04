import WeatherAlert from '../models/WeatherAlert.js';

// @desc    Get all weather alerts
// @route   GET /api/alerts/weather
// @access  Private (all logged-in users)
export const getWeatherAlerts = async (req, res) => {
  try {
    // Get latest 5 alerts, newest first
    const alerts = await WeatherAlert.find({})
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};