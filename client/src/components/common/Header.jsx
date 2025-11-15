// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from './LanguageSwitcher';

// const Header = () => {
//   const { t } = useTranslation();

//   return (
//     <header className="bg-slack-primary text-white shadow-md">
//       <nav className="container mx-auto p-4 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-bold">
//           {t('header.title')}
//         </Link>
//         <div className="flex items-center space-x-4">
//           <Link to="/" className="hover:text-slack-accent">
//             {t('header.home')}
//           </Link>
//           <Link to="/login" className="hover:text-slack-accent">
//             {t('header.login')}
//           </Link>
//           <LanguageSwitcher />
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react'; // for icons
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-slack-primary text-white shadow-md">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-bold">
          {t('header.title')}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-slack-accent transition-colors duration-200">
            {t('header.home')}
          </Link>
          <Link to="/login" className="hover:text-slack-accent transition-colors duration-200">
            {t('header.login')}
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slack-primary border-t border-white/20">
          <div className="flex flex-col items-start p-4 space-y-3">
            <Link
              to="/"
              className="w-full text-left hover:text-slack-accent transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {t('header.home')}
            </Link>
            <Link
              to="/login"
              className="w-full text-left hover:text-slack-accent transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {t('header.login')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
