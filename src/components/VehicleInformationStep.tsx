import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import ApplicationProgressTracker from './ApplicationProgressTracker';
import { VehicleInfo } from '../types/ApplicationTypes';

interface VehicleInformationStepProps {
  data: Partial<VehicleInfo>;
  onNext: (data: Partial<VehicleInfo>) => void;
  onBack: () => void;
  completedSteps: string[];
}

const VehicleInformationStep: React.FC<VehicleInformationStepProps> = ({
  data,
  onNext,
  onBack,
  completedSteps
}) => {
  const [formData, setFormData] = useState<Partial<VehicleInfo>>({
    borrowAmount: '',
    vehicleInsuranceType: '',
    originalTitle: '',
    titleIssueDate: '',
    vehicleColor: '',
    plateTagCounty: '',
    confirmPlateTag: '',
    vin: '',
    yearOfCar: '',
    modelOfCar: '',
    odometerMileage: '',
    vehicleWorth: '',
    titleStatus: '',
    titleRemarks: '',
    titleNo: '',
    plateTagState: '',
    plateTag: '',
    plateTagType: '',
    reEnterVin: '',
    makeOfCar: '',
    styleOfCar: '',
    mileageVerification: '',
    ...data
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const vehicleInsuranceTypes = [
    'Full Coverage',
    'Liability Only',
    'Comprehensive',
    'Collision',
    'No Insurance'
  ];

  const titleStatuses = [
    'Clear Title',
    'Lien Title',
    'Salvage Title',
    'Rebuilt Title',
    'Flood Title'
  ];

  const plateTagTypes = [
    'Standard',
    'Specialty',
    'Personalized',
    'Commercial',
    'Temporary'
  ];

  const carMakes = [
    'Honda', 'Toyota', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai',
    'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Mazda', 'Subaru',
    'Kia', 'Jeep', 'Ram', 'GMC', 'Cadillac', 'Lexus', 'Acura', 'Infiniti'
  ];

  const carStyles = [
    'Sedan', 'SUV', 'Hatchback', 'Coupe', 'Convertible', 'Wagon',
    'Pickup Truck', 'Van', 'Crossover', 'Sports Car'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <ApplicationProgressTracker 
          currentStep="vehicle" 
          completedSteps={completedSteps as any[]} 
        />
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Vehicle Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How much do you want to borrow
                </label>
                <input
                  type="text"
                  value={formData.borrowAmount}
                  onChange={(e) => handleInputChange('borrowAmount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter Amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you think your car is worth
                </label>
                <input
                  type="text"
                  value={formData.vehicleWorth}
                  onChange={(e) => handleInputChange('vehicleWorth', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter Amount"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What type of Vehicle Insurance do you have?
                </label>
                <div className="relative">
                  <select
                    value={formData.vehicleInsuranceType}
                    onChange={(e) => handleInputChange('vehicleInsuranceType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 appearance-none"
                  >
                    <option value="">Option to Choose One</option>
                    {vehicleInsuranceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title Status
                </label>
                <div className="relative">
                  <select
                    value={formData.titleStatus}
                    onChange={(e) => handleInputChange('titleStatus', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 appearance-none"
                  >
                    <option value="">Option to Choose One</option>
                    {titleStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Title
                </label>
                <div className="relative">
                  <select
                    value={formData.originalTitle}
                    onChange={(e) => handleInputChange('originalTitle', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 appearance-none"
                  >
                    <option value="">Option to Choose One</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title Remarks
                </label>
                <div className="relative">
                  <select
                    value={formData.titleRemarks}
                    onChange={(e) => handleInputChange('titleRemarks', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 appearance-none"
                  >
                    <option value="">Option to Choose One</option>
                    <option value="none">None</option>
                    <option value="lien">Lien</option>
                    <option value="salvage">Salvage</option>
                    <option value="flood">Flood</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title Issue Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.titleIssueDate}
                    onChange={(e) => handleInputChange('titleIssueDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  />
                  <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title No
                </label>
                <input
                  type="text"
                  value={formData.titleNo}
                  onChange={(e) => handleInputChange('titleNo', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter Title No"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Color
                </label>
                <input
                  type="text"
                  value={formData.vehicleColor}
                  onChange={(e) => handleInputChange('vehicleColor', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter Color"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plate/Tag State
                </label>
                <input
                  type="text"
                  value={formData.plateTagState}
                  onChange={(e) => handleInputChange('plateTagState', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter Plate/Tag State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plate/Tag County
                </label>
                <input
                  type="text"
                  value={formData.plateTagCounty}
                  onChange={(e) => handleInputChange('plateTagCounty', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter Plate/Tag County"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plate/Tag
                </label>
                <input
                  type="text"
                  value={formData.plateTag}
                  onChange={(e) => handleInputChange('plateTag', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter Plate/Tag"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Plate/Tag
                </label>
                <input
                  type="text"
                  value={formData.confirmPlateTag}
                  onChange={(e) => handleInputChange('confirmPlateTag', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter/Confirm Plate/Tag"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plate/Tag Type
                </label>
                <div className="relative">
                  <select
                    value={formData.plateTagType}
                    onChange={(e) => handleInputChange('plateTagType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 appearance-none"
                  >
                    <option value="">Select Plate/Tag Type</option>
                    {plateTagTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  VIN
                </label>
                <input
                  type="text"
                  value={formData.vin}
                  onChange={(e) => handleInputChange('vin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter the VIN"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Re-Enter the VIN
                </label>
                <input
                  type="text"
                  value={formData.reEnterVin}
                  onChange={(e) => handleInputChange('reEnterVin', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Re-Enter the VIN"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Car
                </label>
                <div className="relative">
                  <select
                    value={formData.yearOfCar}
                    onChange={(e) => handleInputChange('yearOfCar', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 appearance-none"
                  >
                    <option value="">Select Year of car</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Make of Car
                </label>
                <div className="relative">
                  <select
                    value={formData.makeOfCar}
                    onChange={(e) => handleInputChange('makeOfCar', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 appearance-none"
                  >
                    <option value="">Enter Make of Car</option>
                    {carMakes.map(make => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model of Car
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.modelOfCar}
                    onChange={(e) => handleInputChange('modelOfCar', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                    placeholder="Enter Model of Car"
                  />
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style of Car
                </label>
                <div className="relative">
                  <select
                    value={formData.styleOfCar}
                    onChange={(e) => handleInputChange('styleOfCar', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 appearance-none"
                  >
                    <option value="">Enter Style of Car</option>
                    {carStyles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Odometer Mileage
                </label>
                <input
                  type="text"
                  value={formData.odometerMileage}
                  onChange={(e) => handleInputChange('odometerMileage', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter the Odometer Mileage"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mileage Verification
                </label>
                <input
                  type="text"
                  value={formData.mileageVerification}
                  onChange={(e) => handleInputChange('mileageVerification', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
                  placeholder="Enter the Mileage Verification"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={onBack}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleInformationStep;