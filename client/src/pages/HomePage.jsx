// import React from 'react';
// import { useTranslation } from 'react-i18next';

// const HomePage = () => {
//   const { t } = useTranslation();

//   return (
//     <div className="text-center p-10">
//       <h1 className="text-4xl font-bold">{t('home.welcome')}</h1>
//       {/* Add more content here */}
//     </div>
//   );
// };

// export default HomePage;

import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: "📈",
      title: "Market Intelligence",
      description: "Real-time crop prices, demand forecasts, and market trends to maximize your profits"
    },
    {
      icon: "🌱",
      title: "Smart Farming Tools",
      description: "AI-powered recommendations for crop selection, irrigation, and pest management"
    },
    {
      icon: "🛡️",
      title: "Insurance & Support",
      description: "Comprehensive crop insurance and financial assistance programs for your security"
    },
    {
      icon: "👥",
      title: "Community Network",
      description: "Connect with fellow farmers, share knowledge, and grow together"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Farmers" },
    { number: "₹2.5Cr+", label: "Income Generated" },
    { number: "15+", label: "States Covered" },
    { number: "98%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-emerald-600/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="text-lg">🏆</span>
              <span>Trusted by Farmers Across India</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('home.welcome')}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
              Empowering farmers with modern tools, market access, and financial support for sustainable agriculture
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl">
                Get Started Today
                <span className="text-xl">→</span>
              </button>
              <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-600 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-green-100 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to Thrive
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions designed specifically for the modern Indian farmer
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-green-200"
              >
                <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center text-4xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Simple Steps to Success
            </h2>
            <p className="text-xl text-gray-600">Get started in minutes, not days</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 relative">
            {[
              { step: "01", title: "Register", desc: "Create your free account with basic details" },
              { step: "02", title: "Explore", desc: "Access tools, resources, and market insights" },
              { step: "03", title: "Grow", desc: "Increase yields and income with our support" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center h-full">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:flex absolute top-8 -right-10 xl:-right-6 items-center justify-center w-8 h-8">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 sm:p-12 lg:p-16 text-center text-white shadow-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already benefiting from our platform
            </p>
            <button className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2">
              Start Your Journey
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600">We're here to help you succeed</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: "📞", title: "Call Us", info: "1800-XXX-XXXX" },
              { icon: "✉️", title: "Email Us", info: "support@farmersupport.in" },
              { icon: "📍", title: "Visit Us", info: "Regional offices nationwide" }
            ].map((contact, index) => (
              <div key={index} className="bg-white p-6 rounded-xl text-center shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  {contact.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{contact.title}</h3>
                <p className="text-gray-600">{contact.info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;