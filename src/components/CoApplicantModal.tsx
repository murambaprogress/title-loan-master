import React from 'react';
import { UserPlus } from 'lucide-react';

interface CoApplicantModalProps {
  isOpen: boolean;
  onYes: () => void;
  onNo: () => void;
}

const CoApplicantModal: React.FC<CoApplicantModalProps> = ({
  isOpen,
  onYes,
  onNo
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserPlus size={32} className="text-primary-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Do you want to add a <span className="text-primary-500">Co-Applicant?</span>
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            We'll be asking personal and income information about the 
            this co-applicant for loan application process.
          </p>
          
          <div className="flex space-x-4">
            <button
              onClick={onNo}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              NO
            </button>
            <button
              onClick={onYes}
              className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
            >
              YES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoApplicantModal;