import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

type FlowStep = 'login' | 'signup' | 'estimate' | 'progress' | 'verification';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  zipCode: string;
  loanType: string;
  phoneNumber: string;
  rememberMe: boolean;
  loanAmount: number;
  verificationCode: string[];
}

const LoanApplicationFlow = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    zipCode: '',
    loanType: '',
    phoneNumber: '',
    rememberMe: false,
    loanAmount: 4500,
    verificationCode: ['', '', '', '', '', '']
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...formData.verificationCode];
      newCode[index] = value;
      setFormData(prev => ({ ...prev, verificationCode: newCode }));
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const LoginStep = () => (
    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Login To Account</h2>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-12"
              placeholder="••••••••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
              className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button type="button" className="text-sm text-teal-600 hover:text-teal-700">
            Forgot password?
          </button>
        </div>

        <button
          type="button"
          onClick={() => setCurrentStep('estimate')}
          className="w-full bg-teal-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-800 transition-colors"
        >
          Login
        </button>

        <p className="text-center text-gray-600">
          Already has an account?{' '}
          <button
            type="button"
            onClick={() => setCurrentStep('signup')}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );

  const SignupStep = () => (
    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Create New Account</h2>
      <p className="text-gray-600 mb-8">
        Don't Have an account?{' '}
        <button
          onClick={() => setCurrentStep('login')}
          className="text-teal-600 hover:text-teal-700 font-medium"
        >
          Sign Up
        </button>
      </p>
      
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter Your Last Name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Enter YourEmail"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Enter Your Last Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Loan Type</label>
          <select
            value={formData.loanType}
            onChange={(e) => handleInputChange('loanType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">Loan Type</option>
            <option value="car-title">Car Title Loan</option>
            <option value="motorcycle-title">Motorcycle Title Loan</option>
            <option value="rv-title">RV Title Loan</option>
            <option value="boat-title">Boat Title Loan</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => setCurrentStep('estimate')}
          className="w-full bg-teal-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-800 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );

  const EstimateStep = () => (
    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-teal-700 mb-4">${formData.loanAmount.toLocaleString()}</h2>
        
        <div className="relative mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>$2500</span>
            <span>$10,000</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-teal-700 h-2 rounded-full relative"
              style={{ width: `${((formData.loanAmount - 2500) / (10000 - 2500)) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-teal-700 rounded-full border-2 border-white shadow-lg"></div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Estimate</h3>
        <p className="text-gray-600 mb-8">You are eligible to apply for loan.</p>

        <button
          onClick={() => setCurrentStep('progress')}
          className="w-full bg-teal-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-800 transition-colors"
        >
          Apply for loan
        </button>
      </div>
    </div>
  );

  const ProgressStep = () => (
    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Save Your Progress</h2>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone No</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Add your Phone No to get a code"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Set up password for account</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-12"
              placeholder="Enter your Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-12"
              placeholder="Enter your Confirm Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCurrentStep('verification')}
          className="w-full bg-teal-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-800 transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );

  const VerificationStep = () => (
    <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Phone Verification</h2>
      <p className="text-gray-600 mb-8">
        We've sent an SMS with an activation code to your phone number{' '}
        <span className="text-teal-600 font-medium">"+1 123 45 6789."</span>
      </p>
      
      <div className="space-y-6">
        <div className="flex justify-center space-x-3">
          {formData.verificationCode.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
              className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => alert('Verification successful! Loan application completed.')}
          className="w-full bg-teal-700 text-white py-4 rounded-lg font-bold text-lg hover:bg-teal-800 transition-colors"
        >
          Verify
        </button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'login':
        return <LoginStep />;
      case 'signup':
        return <SignupStep />;
      case 'estimate':
        return <EstimateStep />;
      case 'progress':
        return <ProgressStep />;
      case 'verification':
        return <VerificationStep />;
      default:
        return <LoginStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-700 to-teal-800 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex items-center justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column - BMW Image */}
          <div className="relative">
            <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <img 
                src="https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="White BMW M4"
                className="rounded-2xl w-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Form Steps */}
          <div className="flex justify-center">
            {renderCurrentStep()}
          </div>
        </div>
      </div>

      {/* Back Button */}
      {currentStep !== 'login' && (
        <button
          onClick={() => {
            const steps: FlowStep[] = ['login', 'signup', 'estimate', 'progress', 'verification'];
            const currentIndex = steps.indexOf(currentStep);
            if (currentIndex > 0) {
              setCurrentStep(steps[currentIndex - 1]);
            }
          }}
          className="fixed top-6 left-6 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      )}
    </div>
  );
};

export default LoanApplicationFlow;