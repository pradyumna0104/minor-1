import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const WeatherAlertDisplay = () => {
  const { t } = useTranslation();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { data } = await axios.get('/api/alerts/weather');
        setAlerts(data);
      } catch (err) {
        console.error('Failed to fetch alerts');
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  if (loading) {
    return <p>{t('alerts.loading')}</p>;
  }

  if (alerts.length === 0) {
    return null; // Don't show anything if no alerts
  }

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow mb-6">
      <h2 className="font-bold text-lg mb-2">{t('alerts.title')}</h2>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div key={alert._id} className="border-b border-yellow-300 pb-2 last:border-b-0">
            <h3 className="font-semibold">{alert.title}</h3>
            <p>{alert.message}</p>
            <p className="text-xs text-yellow-600">
              {new Date(alert.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherAlertDisplay;