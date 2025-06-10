import React, { useState } from 'react';
import { Upload, Camera, FileText, Check } from 'lucide-react';
import ApplicationProgressTracker from './ApplicationProgressTracker';

interface DocumentUploadStepProps {
  onNext: () => void;
  onBack: () => void;
  completedSteps: string[];
}

const DocumentUploadStep: React.FC<DocumentUploadStepProps> = ({
  onNext,
  onBack,
  completedSteps
}) => {
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});

  const documents = [
    { id: 'id', name: 'Government Issued ID', required: true },
    { id: 'vehicle_title', name: 'Vehicle Title', required: true },
    { id: 'insurance', name: 'Vehicle Insurance', required: true },
    { id: 'income_proof', name: 'Proof of Income', required: true },
    { id: 'bank_statement', name: 'Bank Statement', required: false },
    { id: 'utility_bill', name: 'Utility Bill', required: false }
  ];

  const handleFileUpload = (docId: string) => {
    // Simulate file upload
    setUploadedDocs(prev => ({ ...prev, [docId]: true }));
  };

  const requiredDocsUploaded = documents
    .filter(doc => doc.required)
    .every(doc => uploadedDocs[doc.id]);

  const handleSubmit = () => {
    if (requiredDocsUploaded) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <ApplicationProgressTracker 
          currentStep="documents" 
          completedSteps={completedSteps as any[]} 
        />
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Picture Required</h2>
          
          <div className="space-y-6">
            <p className="text-gray-600 mb-8">
              Please upload the following documents to complete your application. Required documents are marked with an asterisk (*).
            </p>

            <div className="grid gap-6">
              {documents.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <FileText size={24} className="text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {doc.name}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </span>
                    </div>
                    {uploadedDocs[doc.id] && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <Check size={20} />
                        <span className="text-sm font-medium">Uploaded</span>
                      </div>
                    )}
                  </div>
                  
                  {!uploadedDocs[doc.id] ? (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleFileUpload(doc.id)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Upload size={16} />
                        <span>Upload File</span>
                      </button>
                      <button
                        onClick={() => handleFileUpload(doc.id)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Camera size={16} />
                        <span>Take Photo</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-700 text-sm">
                        Document successfully uploaded and verified.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-sm">
                <span className="font-semibold">Note:</span> All uploaded documents are encrypted and securely stored. 
                We use bank-level security to protect your personal information.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={onBack}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!requiredDocsUploaded}
                className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  requiredDocsUploaded
                    ? 'bg-teal-700 text-white hover:bg-teal-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Complete Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadStep;