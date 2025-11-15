import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth(); // 2. Get the register function
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // 3. Set loading

    try {
      // 4. Call the real register function
      await register(name, email, password, role);
      
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      // 5. Handle errors from the server
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false); // 6. Stop loading
    }
  };

  // return (
  //   <div className="flex justify-center items-center mt-10">
  //     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
  //       <h2 className="text-2xl font-bold text-center mb-6">
  //         {t('register.title')}
  //       </h2>
  //       {/* Show error message */}
  //       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
  //       <form onSubmit={handleSubmit}>
  //         {/* ... (name, email, password, role inputs) ... */}
  //          <div className="mb-4">
  //           <label
  //             htmlFor="name"
  //             className="block text-gray-700 font-semibold mb-2"
  //           >
  //             {t('register.name')}
  //           </label>
  //           <input
  //             type="text"
  //             id="name"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slack-accent"
  //             required
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label
  //             htmlFor="email"
  //             className="block text-gray-700 font-semibold mb-2"
  //           >
  //             {t('login.email')}
  //           </label>
  //           <input
  //             type="email"
  //             id="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slack-accent"
  //             required
  //           />
  //         </div>
  //         <div className="mb-4">
  //           <label
  //             htmlFor="password"
  //             className="block text-gray-700 font-semibold mb-2"
  //           >
  //             {t('login.password')}
  //           </label>
  //           <input
  //             type="password"
  //             id="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slack-accent"
  //             required
  //           />
  //         </div>
  //         <div className="mb-6">
  //           <label
  //             htmlFor="role"
  //             className="block text-gray-700 font-semibold mb-2"
  //           >
  //             {t('register.role')}
  //           </label>
  //           <select
  //             id="role"
  //             value={role}
  //             onChange={(e) => setRole(e.target.value)}
  //             className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slack-accent"
  //           >
  //             <option value="buyer">{t('register.buyer')}</option>
  //             <option value="farmer">{t('register.farmer')}</option>
  //           </select>
  //         </div>
  //         <button
  //           type="submit"
  //           className="w-full bg-slack-primary text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
  //           disabled={loading} // Disable button while loading
  //         >
  //           {loading ? 'Registering...' : t('register.button')}
  //         </button>
  //       </form>
  //       <p className="text-center mt-4 text-gray-600">
  //         {t('register.haveAccount')}{' '}
  //         <Link to="/login" className="text-slack-accent font-semibold hover:underline">
  //           {t('header.login')}
  //         </Link>
  //       </p>
  //     </div>
  //   </div>
  // );
return (
    <div
      className="min-h-[85vh] flex justify-center items-center px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/green-tea-bud-leaves-green-tea-plantations-morning_335224-955.jpg?ga=GA1.1.1727961086.1757165532&semt=ais_hybrid&w=740&q=80')",
      }}
    >
      <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/30">
        <h2 className="text-3xl font-bold text-center mb-6 text-slack-primary">
          {t('register.title')}
        </h2>

        {error && <p className="text-red-600 text-center bg-red-50 py-2 px-3 rounded-md mb-4 border border-red-200">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
              {t('register.name')}
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slack-primary bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
              {t('login.email')}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slack-primary bg-white"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">
              {t('login.password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slack-primary bg-white"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-gray-800 font-semibold mb-2">
              {t('register.role')}
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slack-primary"
            >
              <option value="buyer">{t('register.buyer')}</option>
              <option value="farmer">{t('register.farmer')}</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-slack-primary text-white py-2 rounded-lg font-semibold hover:bg-slack-accent transition-colors disabled:opacity-70"
            disabled={loading}
          >
            {loading ? 'Registering...' : t('register.button')}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700">
          {t('register.haveAccount')}{' '}
          <Link to="/login" className="text-slack-primary font-semibold hover:underline">
            {t('header.login')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;