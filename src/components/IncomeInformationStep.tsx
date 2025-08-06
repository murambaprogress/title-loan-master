import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import ApplicationProgressTracker from './ApplicationProgressTracker';
import CoApplicantModal from './CoApplicantModal';
import { IncomeInfo } from '../types/ApplicationTypes';

interface IncomeInformationStepProps {
  data: Partial<IncomeInfo>;
  onNext: (data: Partial<IncomeInfo>) => void;
  onBack: () => void;
  completedSteps: string[];
}

const IncomeInformationStep: React.FC<IncomeInformationStepProps> = ({
  data,
  onNext,
  onBack,
  completedSteps
}) => {
  const [formData, setFormData] = useState<Partial<IncomeInfo>>({
    incomeSource: '',
    employmentDuration: '',
    totalGrossMonthlyIncome: '',
    paymentFrequency: '',
    nextPayDate: '',
    lastPayDate: '',
    activeBankruptcy: '',
    directDeposit: '',
    identificationNo: '',
    hasCoApplicant: false,
    ...data
  });

  const [showCoApplicantModal, setShowCoApplicantModal] = useState(false);

  const handleInputChange = (field: keyof IncomeInfo, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCoApplicantModal(true);
  };

  const handleCoApplicantResponse = (hasCoApplicant: boolean) => {
    setShowCoApplicantModal(false);
    const finalData = { ...formData, hasCoApplicant };
    onNext(finalData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <ApplicationProgressTracker 
          currentStep="income" 
          completedSteps={completedSteps as any[]} 
        />
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Income Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Income Source
                </label>
                <input
                  type="text"
                  value={formData.incomeSource}
                  onChange={(e) => handleInputChange('incomeSource', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter Employer/Income Source"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How long have you been employed
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.employmentDuration}
                    onChange={(e) => handleInputChange('employmentDuration', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                  <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total gross monthly income?
                </label>
                <input
                  type="text"
                  value={formData.totalGrossMonthlyIncome}
                  onChange={(e) => handleInputChange('totalGrossMonthlyIncome', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Enter Amount"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How often are you paid?
                </label>
                <select
                  value={formData.paymentFrequency}
                  onChange={(e) => handleInputChange('paymentFrequency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select Payment Frequency</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="semi-monthly">Semi-Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Next pay Date?
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.nextPayDate}
                    onChange={(e) => handleInputChange('nextPayDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                  <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last pay Date?
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.lastPayDate}
                    onChange={(e) => handleInputChange('lastPayDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                  <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you in Active Bankruptcy?
                </label>
                <select
                  value={formData.activeBankruptcy}
                  onChange={(e) => handleInputChange('activeBankruptcy', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have Direct Deposit? (Yes / No)
                </label>
                <select
                  value={formData.directDeposit}
                  onChange={(e) => handleInputChange('directDeposit', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                >
                  <option value="">Option to Choose One</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">
                <span className="font-semibold">Note*</span><br />
                Alimony, child support or separate maintenance income does not need to be revealed if you do not wish it to be considered as a basis for repaying this obligation. Do not include the income of a spouse or another person in your total income calculation. To qualify you must have a regular source of income.
              </p>
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
                className="px-8 py-3 bg-teal-700 text-white rounded-lg font-medium hover:bg-teal-800 transition-colors duration-200"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>

      <CoApplicantModal
        isOpen={showCoApplicantModal}
        onYes={() => handleCoApplicantResponse(true)}
        onNo={() => handleCoApplicantResponse(false)}
      />
    </div>
  );
};

export default IncomeInformationStep;