import React from 'react';
import { Hand } from 'lucide-react';

interface ResumeApplicationModalProps {
  isOpen: boolean;
  onResume: () => void;
  onLeave: () => void;
}

const ResumeApplicationModal: React.FC<ResumeApplicationModalProps> = ({
  isOpen,
  onResume,
  onLeave
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Hand size={32} className="text-primary-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back</h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            It seems like you are back again and did not complete loan application yet. 
            You can not login to account until you have completed the loan application all steps.
          </p>
          
          <div className="flex space-x-4">
            <button
              onClick={onLeave}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              NO, Leave
            </button>
            <button
              onClick={onResume}
              className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
            >
              YES, Resume Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeApplicationModal;