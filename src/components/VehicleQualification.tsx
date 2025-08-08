import React, { useState } from 'react';
import { Car, ArrowRight } from 'lucide-react';
import PrimaryCTAButton from './PrimaryCTAButton';

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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We use your vehicle's value and condition to offer loans with flexible repayment options
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Turn your car into instant cash without selling it. We use your vehicle's value and condition to offer loans with flexible repayment options.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Qualification Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Check Your Loan Amount Qualification Today!
            </h3>
            
            <form onSubmit={handleCheckNow} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select your Vehicle
                </label>
                <select
                  name="vehicle"
                  value={qualificationData.vehicle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select your Vehicle</option>
                  <option value="car">Car</option>
                  <option value="truck">Truck</option>
                  <option value="suv">SUV</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Vehicle Make
                </label>
                <select
                  name="model"
                  value={qualificationData.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                >
                  <option value="">Select Vehicle Make</option>
                  <option value="acura">Acura</option>
                  <option value="audi">Audi</option>
                  <option value="bmw">BMW</option>
                  <option value="buick">Buick</option>
                  <option value="cadillac">Cadillac</option>
                  <option value="chevrolet">Chevrolet</option>
                  <option value="chrysler">Chrysler</option>
                  <option value="dodge">Dodge</option>
                  <option value="ford">Ford</option>
                  <option value="gmc">GMC</option>
                  <option value="honda">Honda</option>
                  <option value="hyundai">Hyundai</option>
                  <option value="infiniti">Infiniti</option>
                  <option value="jeep">Jeep</option>
                  <option value="kia">Kia</option>
                  <option value="lexus">Lexus</option>
                  <option value="lincoln">Lincoln</option>
                  <option value="mazda">Mazda</option>
                  <option value="mercedes">Mercedes-Benz</option>
                  <option value="mitsubishi">Mitsubishi</option>
                  <option value="nissan">Nissan</option>
                  <option value="ram">Ram</option>
                  <option value="subaru">Subaru</option>
                  <option value="toyota">Toyota</option>
                  <option value="volkswagen">Volkswagen</option>
                  <option value="volvo">Volvo</option>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
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
                className="w-full"
              >
                <PrimaryCTAButton type="submit" fullWidth className="flex items-center justify-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight size={20} />
                </PrimaryCTAButton>
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