import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Title Loan Masters</h3>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for fast, hassle-free title loans. Get the cash you need while keeping your vehicle.
            </p>
            <div className="flex space-x-4">
              <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Twitter size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
              <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors duration-200" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-200">Services</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Car Title Loans</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Motorcycle Title Loans</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">RV Title Loans</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Loan Buyout Program</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-teal-400" />
                <span className="text-gray-300">1-800-LOAN-NOW</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-teal-400" />
                <span className="text-gray-300">info@titleloanmasters.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-teal-400" />
                <span className="text-gray-300">Nationwide Service</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Title Loan Masters. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;