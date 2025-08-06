import React from 'react';
import { Car, TrendingUp, ArrowRight, Coins } from 'lucide-react';

interface ServicesSectionProps {
  onApplyClick?: () => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onApplyClick }) => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Services
          </h2>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Car Title Loans */}
          <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-6">
              <img 
                src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Multiple cars for title loans"
                className="rounded-xl w-full max-w-md object-cover h-48"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Car Title Loans
            </h3>
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              Leverage your car's value for a quick, hassle-free loan while continuing to drive it. No credit check required!
            </p>
            <button 
              onClick={onApplyClick}
              className="w-full bg-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Apply For Car Title Loan</span>
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Title Loan Buyout Program */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 rounded-full p-6">
                <Coins size={64} className="text-green-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Title Loan Buyout Program
            </h3>
            <p className="text-teal-100 text-center mb-8 leading-relaxed">
              Stuck in a high-interest loan? Refinance with us and lower your payments with better terms.
            </p>
            <button 
              onClick={onApplyClick}
              className="w-full bg-green-500 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Find the Right Loan for You!</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Title Loan Buy Out Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-3xl p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white/10 rounded-2xl p-8">
                <img 
                  src="https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="White BMW M4"
                  className="rounded-xl w-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Title Loan Buy Out
              </h2>
              <p className="text-xl text-teal-100 font-semibold">
                Better Rates. Lower Payments. More Savings!
              </p>
              <p className="text-blue-100 leading-relaxed text-lg">
                If you're trapped in a costly loan, we can help! Our Title Loan Buyout Program allows you to refinance your existing loan with better interest rates and improved repayment terms.
              </p>
              <button 
                onClick={onApplyClick}
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Take Control of Your Loan Today!
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;