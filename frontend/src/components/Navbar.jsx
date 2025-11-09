import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h1 className="text-xl font-display font-bold bg-gradient-gold bg-clip-text text-transparent">
                GoldTracker
              </h1>
              <p className="text-xs text-gray-400">Premium Price Insights</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-300 hover:text-gold-400 transition-colors font-medium">
              Dashboard
            </a>
            <a href="/comparison" className="text-gray-300 hover:text-gold-400 transition-colors font-medium">
              Compare
            </a>
            <a href="/historical" className="text-gray-300 hover:text-gold-400 transition-colors font-medium">
              Trends
            </a>
            <button className="btn-premium text-sm">
              Refresh Rates
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-gold-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-white/10">
            <a href="/" className="block text-gray-300 hover:text-gold-400 transition-colors py-2">
              Dashboard
            </a>
            <a href="/comparison" className="block text-gray-300 hover:text-gold-400 transition-colors py-2">
              Compare
            </a>
            <a href="/historical" className="block text-gray-300 hover:text-gold-400 transition-colors py-2">
              Trends
            </a>
            <button className="btn-premium text-sm w-full mt-2">
              Refresh Rates
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;