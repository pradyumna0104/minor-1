import React, { useState } from 'react';
import axios from 'axios'; // 1. Import axios

const WeatherAlertForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // 2. Add loading and success/error message states
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage('');

    try {
      // 3. This is the real API call
      // We can use a relative path because of the proxy
      await axios.post('/api/admin/weather-alert', {
        title,
        message,
      });

      // 4. Handle success
      setResponseMessage('Alert published successfully!');
      setTitle('');
      setMessage('');
    } catch (err) {
      // 5. Handle error
      setResponseMessage(err.response?.data?.message || 'Error publishing alert');
    } finally {
      // 6. Stop loading
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 7. Show success/error message */}
      {responseMessage && (
        <p className="text-center mb-4">{responseMessage}</p>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
          Alert Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slack-accent"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
          Alert Message
        </label>
        <textarea
          id="message"
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slack-accent"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-slack-accent text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
        disabled={loading} // 8. Disable button while loading
      >
        {loading ? 'Publishing...' : 'Publish Alert'}
      </button>
    </form>
  );
};

export default WeatherAlertForm;