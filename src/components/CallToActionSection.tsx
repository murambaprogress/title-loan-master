import React, { useState } from 'react';

interface CallToActionSectionProps {
  onApplyClick?: () => void;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ onApplyClick }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    loanType: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Call to Action form submitted:', formData);
    onApplyClick?.();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-700 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Call to Action
          </h2>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Need cash fast? Voozh makes it simple! Apply today and receive funds 
            in as little as 48 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="First Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Last Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Zip Code"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Loan Type
                </label>
                <select
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select Loan Type</option>
                  <option value="car-title">Car Title Loan</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors duration-200 transform hover:scale-105 shadow-lg"
              >
                Apply Now
              </button>
            </form>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <img 
                src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Happy man using smartphone for loan application"
                className="rounded-xl w-full object-cover h-96"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;