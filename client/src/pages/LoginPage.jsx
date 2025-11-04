import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

const LoginPage = () => {
  const { t } = useTranslation();
  const { login } = useAuth(); // 2. Get the login function
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 3. Call the real login function
      const userData = await login(email, password);
      
      // 4. Redirect based on user role
      switch (userData.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'farmer':
          navigate('/farmer');
          break;
        case 'buyer':
          navigate('/buyer');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      // 5. Handle errors
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {t('login.title')}
        </h2>
        {/* Show error message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              {t('login.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slack-accent"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              {t('login.password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slack-accent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slack-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : t('login.button')}
          </button>
        </form>
        
        <p className="text-center mt-4 text-gray-600">
          {t('login.noAccount')}{' '}
          <Link to="/register" className="text-slack-accent font-semibold hover:underline">
            {t('register.button')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;