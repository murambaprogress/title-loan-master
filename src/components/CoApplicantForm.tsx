import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { PersonalInfo, IncomeInfo } from '../types/ApplicationTypes';

interface CoApplicantFormProps {
  onNext: (data: { personalInfo: Partial<PersonalInfo>, incomeInfo: Partial<IncomeInfo> }) => void;
  onBack: () => void;
}

const CoApplicantForm: React.FC<CoApplicantFormProps> = ({ onNext, onBack }) => {
  const [personalData, setPersonalData] = useState<Partial<PersonalInfo>>({
    borrowAmount: '',
    firstName: '',
    lastName: '',
    socialSecurityNo: '',
    phoneNo: '',
    identificationNo: '',
    banksName: '',
    city: '',
    zipCode: '',
    emailAddress: '',
    identificationType: '',
    idIssuingAgency: '',
    dateOfBirth: '',
    homeStreetAddress: '',
    state: ''
  });

  const [incomeData, setIncomeData] = useState<Partial<IncomeInfo>>({
    incomeSource: '',
    employmentDuration: '',
    totalGrossMonthlyIncome: '',
    paymentFrequency: '',
    nextPayDate: '',
    lastPayDate: '',
    activeBankruptcy: '',
    directDeposit: '',
    identificationNo: '',
    hasCoApplicant: false
  });

  const [militaryStatus, setMilitaryStatus] = useState({
    isActiveDuty: false,
    isDependent: false,
    isReserve: false
  });

  const handlePersonalInputChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalData(prev => ({ ...prev, [field]: value }));
  };

  const handleIncomeInputChange = (field: keyof IncomeInfo, value: string) => {
    setIncomeData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ personalInfo: personalData, incomeInfo: incomeData });
  };

  const identificationTypes = [
    'Driver\'s License',
    'State ID',
    'Passport',
    'Military ID'
  ];

  const issuingAgencies = [
    'DMV',
    'State Department',
    'Department of Defense',
    'Other'
  ];

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Tracker */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="ml-2 text-sm font-medium text-green-600">Personal</span>
          </div>
          <div className="w-16 h-0.5 mx-4 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="ml-2 text-sm font-medium text-gray-500">Income</span>
          </div>
          <div className="w-16 h-0.5 mx-4 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="ml-2 text-sm font-medium text-gray-500">Vehicle</span>
          </div>
          <div className="w-16 h-0.5 mx-4 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-medium">
              4
            </div>
            <span className="ml-2 text-sm font-medium text-gray-500">Picture Required</span>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Co-Applicant</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How much do you want to borrow
                  </label>
                  <input
                    type="text"
                    value={personalData.borrowAmount}
                    onChange={(e) => handlePersonalInputChange('borrowAmount', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={personalData.firstName}
                    onChange={(e) => handlePersonalInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter First Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={personalData.lastName}
                    onChange={(e) => handlePersonalInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Last Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={personalData.emailAddress}
                    onChange={(e) => handlePersonalInputChange('emailAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Email Address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Security No
                  </label>
                  <input
                    type="text"
                    value={personalData.socialSecurityNo}
                    onChange={(e) => handlePersonalInputChange('socialSecurityNo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Social Security No"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Identification Type
                  </label>
                  <div className="relative">
                    <select
                      value={personalData.identificationType}
                      onChange={(e) => handlePersonalInputChange('identificationType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 appearance-none"
                    >
                      <option value="">Select Identification Type</option>
                      {identificationTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone No
                  </label>
                  <input
                    type="tel"
                    value={personalData.phoneNo}
                    onChange={(e) => handlePersonalInputChange('phoneNo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Phone No"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Issuing Agency
                  </label>
                  <div className="relative">
                    <select
                      value={personalData.idIssuingAgency}
                      onChange={(e) => handlePersonalInputChange('idIssuingAgency', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 appearance-none"
                    >
                      <option value="">Select ID Issuing Agency</option>
                      {issuingAgencies.map(agency => (
                        <option key={agency} value={agency}>{agency}</option>
                      ))}
                    </select>
                    <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Identification No
                  </label>
                  <input
                    type="text"
                    value={personalData.identificationNo}
                    onChange={(e) => handlePersonalInputChange('identificationNo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Identification No"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={personalData.dateOfBirth}
                      onChange={(e) => handlePersonalInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    />
                    <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banks Name
                  </label>
                  <input
                    type="text"
                    value={personalData.banksName}
                    onChange={(e) => handlePersonalInputChange('banksName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Banks Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Home Street Address
                  </label>
                  <input
                    type="text"
                    value={personalData.homeStreetAddress}
                    onChange={(e) => handlePersonalInputChange('homeStreetAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Home Street Address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your City
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={personalData.city}
                      onChange={(e) => handlePersonalInputChange('city', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                      placeholder="Select Your city"
                    />
                    <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your State
                  </label>
                  <div className="relative">
                    <select
                      value={personalData.state}
                      onChange={(e) => handlePersonalInputChange('state', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 appearance-none"
                    >
                      <option value="">Select Your State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    zip code
                  </label>
                  <input
                    type="text"
                    value={personalData.zipCode}
                    onChange={(e) => handlePersonalInputChange('zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter zip code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Home Street Address
                  </label>
                  <input
                    type="text"
                    value={personalData.homeStreetAddress}
                    onChange={(e) => handlePersonalInputChange('homeStreetAddress', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Home Street Address"
                  />
                </div>
              </div>
            </div>

            {/* Income Information Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Income Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Income Source
                  </label>
                  <input
                    type="text"
                    value={incomeData.incomeSource}
                    onChange={(e) => handleIncomeInputChange('incomeSource', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Employer/Income Source"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How long have you been employed
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={incomeData.employmentDuration}
                      onChange={(e) => handleIncomeInputChange('employmentDuration', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
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
                    value={incomeData.totalGrossMonthlyIncome}
                    onChange={(e) => handleIncomeInputChange('totalGrossMonthlyIncome', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How often are you paid?
                  </label>
                  <input
                    type="text"
                    value={incomeData.paymentFrequency}
                    onChange={(e) => handleIncomeInputChange('paymentFrequency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next pay Date?
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={incomeData.nextPayDate}
                      onChange={(e) => handleIncomeInputChange('nextPayDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
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
                      value={incomeData.lastPayDate}
                      onChange={(e) => handleIncomeInputChange('lastPayDate', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    />
                    <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you in Active Bankruptcy?
                  </label>
                  <div className="relative">
                    <select
                      value={incomeData.activeBankruptcy}
                      onChange={(e) => handleIncomeInputChange('activeBankruptcy', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Do you have Direct Deposit? (Yes / No)
                  </label>
                  <div className="relative">
                    <select
                      value={incomeData.directDeposit}
                      onChange={(e) => handleIncomeInputChange('directDeposit', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50 appearance-none"
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
                    Identification No
                  </label>
                  <input
                    type="text"
                    value={incomeData.identificationNo}
                    onChange={(e) => handleIncomeInputChange('identificationNo', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    placeholder="Enter Identification No"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-gray-50"
                    />
                    <Calendar size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Military Status Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Please select one of the following :</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="activeDuty"
                    checked={militaryStatus.isActiveDuty}
                    onChange={(e) => setMilitaryStatus({...militaryStatus, isActiveDuty: e.target.checked})}
                    className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="activeDuty" className="text-sm text-gray-700">
                    I AM an active duty member of the Army, Navy, Marine corps, Air Force or Coast Guard, on active duty
                  </label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="dependent"
                    checked={militaryStatus.isDependent}
                    onChange={(e) => setMilitaryStatus({...militaryStatus, isDependent: e.target.checked})}
                    className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="dependent" className="text-sm text-gray-700">
                    I AM a dependent of an active duty member of the Armed Forces because I am the member's spouse, the member's child under the age of 18, or I am financially dependent on such a member.
                  </label>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="reserve"
                    checked={militaryStatus.isReserve}
                    onChange={(e) => setMilitaryStatus({...militaryStatus, isReserve: e.target.checked})}
                    className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="reserve" className="text-sm text-gray-700">
                    I AM NOT a regular or reserve member of the Army, Navy, Marine corps, Air Force or Coast Guard, on active duty or a dependent of such a member.
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">
                <span className="font-semibold">Note*</span><br />
                Under personal information add email address Add disclosure- You authorize CashTitle and its affiliates to contact you by email using the email address you give above for business purposes and the marketing of products and services. Please provide a phone number and email address that is personal to you, not a shared work or phone number or email address.
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
    </div>
  );
};

export default CoApplicantForm;