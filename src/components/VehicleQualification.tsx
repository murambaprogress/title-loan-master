import React, { useState } from 'react';
import { Car, ArrowRight } from 'lucide-react';

const VehicleQualification = () => {
  const [qualificationData, setQualificationData] = useState({
    vehicle: '',
    model: '',
    year: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQualificationData({
      ...qualificationData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckNow = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Qualification check:', qualificationData);
    // Handle qualification check
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-teal-600 font-semibold text-lg mb-2">Value of Your Vehicle</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We offer loans strictly on the value of your car
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Turn your car into instant cash without selling it. We assess your vehicle's equity and book value competitive loan amounts with flexible repayment arrangements.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Qualification Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Check Your Loan Amount Qualification Today!
            </h3>
            <p className="text-gray-600 mb-8">To check how much $ you qualify for</p>
            
            <form onSubmit={handleCheckNow} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select your Vehicle
                </label>
                <select
                  name="vehicle"
                  value={qualificationData.vehicle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select your Vehicle</option>
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                  <option value="suv">SUV</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="rv">RV</option>
                  <option value="boat">Boat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Vehicle Model
                </label>
                <select
                  name="model"
                  value={qualificationData.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select Vehicle Model</option>
                  <option value="honda">Honda</option>
                  <option value="toyota">Toyota</option>
                  <option value="ford">Ford</option>
                  <option value="chevrolet">Chevrolet</option>
                  <option value="nissan">Nissan</option>
                  <option value="hyundai">Hyundai</option>
                  <option value="bmw">BMW</option>
                  <option value="mercedes">Mercedes-Benz</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Year
                </label>
                <select
                  name="year"
                  value={qualificationData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-800 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Check Now</span>
                <ArrowRight size={20} />
              </button>
            </form>
          </div>

          {/* Right Column - Vehicle Images */}
          <div className="relative">
            <div className="flex justify-center items-center">
              <img 
                src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="White car and yellow motorcycle"
                className="rounded-2xl shadow-2xl w-full max-w-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleQualification;