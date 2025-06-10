import React, { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';

interface HeaderProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoginClick, onSignupClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'About', href: '#about' },
    { name: 'Contact us', href: '#contact' },
  ];

  return (
    <header className="bg-teal-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Title Loan Masters</h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-yellow-400 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onLoginClick}
              className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-200"
            >
              <LogIn size={16} />
              <span>User Portal Login</span>
            </button>
            <button 
              onClick={onSignupClick}
              className="bg-white text-teal-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Create Account
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-yellow-400 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-teal-800 rounded-lg mt-2 p-4">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover:text-yellow-400 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-3 border-t border-teal-600">
                <button 
                  onClick={() => {
                    onLoginClick?.();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 hover:text-yellow-400 transition-colors duration-200 text-left"
                >
                  <LogIn size={16} />
                  <span>User Portal Login</span>
                </button>
                <button 
                  onClick={() => {
                    onSignupClick?.();
                    setIsMenuOpen(false);
                  }}
                  className="bg-white text-teal-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                >
                  Create Account
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;