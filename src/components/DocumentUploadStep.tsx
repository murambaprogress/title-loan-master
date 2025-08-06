import React, { useState } from 'react';
import { Upload, Camera, FileText, Check, ChevronDown } from 'lucide-react';
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
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, number>>({});

  // Required Documents
  const documents = [
    { id: 'gov_id_front', name: 'GOV Pic ID - front', required: true, type: 'single' },
    { id: 'gov_id_back', name: 'GOV Pic ID - Back', required: true, type: 'single' },
    { id: 'title', name: 'Title', required: true, type: 'single' },
    { id: 'back_of_title', name: 'Back of Title', required: true, type: 'single' },
    { id: 'vin_from_title', name: 'VIN from Title', required: true, type: 'multiple', maxPhotos: 7 },
    { id: 'vin_from_dash', name: 'VIN from Dash', required: true, type: 'single' },
    { id: 'vin_from_sticker', name: 'VIN from Sticker', required: true, type: 'single' },
    { id: 'odometer', name: 'Odometer', required: true, type: 'single' },
    { id: 'borrower', name: 'Borrower', required: true, type: 'single' },
    { id: 'front_of_car', name: 'Front of car', required: true, type: 'single' },
    { id: 'back_of_car', name: 'Back of Car', required: true, type: 'single' },
    { id: 'driver_side_of_car', name: 'Driver Side of car', required: true, type: 'single' },
    { id: 'passenger_side_of_car', name: 'Passenger side of car', required: true, type: 'single' }
  ];

  // Vehicle Interior/Exterior Photos
  const vehiclePhotos = [
    { id: 'inside_of_driver_side', name: 'Inside of Driver Side', required: true, type: 'single' },
    { id: 'inside_of_passenger_side', name: 'Inside of Passenger side', required: true, type: 'single' },
    { id: 'inside_of_back', name: 'Inside of Back', required: true, type: 'single' },
    { id: 'inside_interior_driver_side_seats', name: 'Inside Interior of driver Side seats', required: true, type: 'multiple', maxPhotos: 4 },
    { id: 'inside_interior_passenger_side_seats', name: 'Inside Interior of passenger side seats', required: true, type: 'multiple', maxPhotos: 3 },
    { id: 'inside_interior_back_seats', name: 'Inside Interior of back seats', required: true, type: 'single' },
    { id: 'series_of_vehicle', name: 'Series of vehicle', required: true, type: 'single' },
    { id: 'damages_on_front', name: 'Damages on the front', required: true, type: 'multiple', maxPhotos: 4 },
    { id: 'damages_on_back', name: 'Damages on the back', required: true, type: 'multiple', maxPhotos: 4 },
    { id: 'damages_on_driver_side', name: 'Damages on the driver side', required: true, type: 'multiple', maxPhotos: 4 },
    { id: 'damages_on_passenger_side', name: 'Damages on the passenger side', required: true, type: 'single' }
  ];

  const handleFileUpload = (docId: string) => {
    setUploadedDocs(prev => ({ ...prev, [docId]: true }));
  };

  const handlePhotoUpload = (photoId: string, isMultiple: boolean = false, maxPhotos: number = 1) => {
    if (isMultiple) {
      setUploadedPhotos(prev => {
        const currentCount = prev[photoId] || 0;
        const newCount = Math.min(currentCount + 1, maxPhotos);
        return { ...prev, [photoId]: newCount };
      });
    } else {
      setUploadedPhotos(prev => ({ ...prev, [photoId]: 1 }));
    }
  };

  const requiredDocsUploaded = documents
    .filter(doc => doc.required)
    .every(doc => uploadedDocs[doc.id]);

  const requiredPhotosUploaded = vehiclePhotos
    .filter(photo => photo.required)
    .every(photo => {
      if (photo.type === 'multiple') {
        return (uploadedPhotos[photo.id] || 0) >= (photo.maxPhotos || 1);
      }
      return uploadedPhotos[photo.id] >= 1;
    });

  const handleSubmit = () => {
    if (requiredDocsUploaded && requiredPhotosUploaded) {
      onNext();
    }
  };

  const renderUploadSection = (item: any, isPhoto: boolean = false) => {
    const isUploaded = isPhoto ? (uploadedPhotos[item.id] || 0) > 0 : uploadedDocs[item.id];
    const uploadCount = uploadedPhotos[item.id] || 0;
    const maxPhotos = item.maxPhotos || 1;
    const isMultiple = item.type === 'multiple';

    return (
      <div key={item.id} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <FileText size={24} className="text-gray-400" />
            <span className="font-medium text-gray-900">
              {item.name}
              {item.required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </div>
          {isUploaded && (
            <div className="flex items-center space-x-2 text-green-600">
              <Check size={20} />
              <span className="text-sm font-medium">
                {isMultiple ? `${uploadCount}/${maxPhotos} Uploaded` : 'Uploaded'}
              </span>
            </div>
          )}
        </div>
        
        {/* Show uploaded photos preview for multiple uploads */}
        {isPhoto && isMultiple && uploadCount > 0 && (
          <div className="flex space-x-2 mb-4 overflow-x-auto">
            {Array.from({ length: uploadCount }, (_, index) => (
              <div key={index} className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                <Camera size={16} className="text-gray-500" />
              </div>
            ))}
          </div>
        )}
        
        {(!isUploaded || (isMultiple && uploadCount < maxPhotos)) ? (
          <div className="flex space-x-4">
            <button
              onClick={() => isPhoto ? handlePhotoUpload(item.id, isMultiple, maxPhotos) : handleFileUpload(item.id)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
            >
              <Camera size={16} />
              <span>{isPhoto ? 'Capture' : 'Upload File'}</span>
            </button>
            <button
              onClick={() => isPhoto ? handlePhotoUpload(item.id, isMultiple, maxPhotos) : handleFileUpload(item.id)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Upload size={16} />
              <span>{isPhoto ? 'Attach File' : 'Browse'}</span>
            </button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-700 text-sm">
              {isMultiple && uploadCount < maxPhotos 
                ? `${uploadCount}/${maxPhotos} photos uploaded. You can add ${maxPhotos - uploadCount} more.`
                : 'Successfully uploaded and verified.'
              }
            </p>
            {isMultiple && uploadCount < maxPhotos && (
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handlePhotoUpload(item.id, isMultiple, maxPhotos)}
                  className="flex items-center space-x-2 px-3 py-1 bg-primary-500 text-white rounded text-sm hover:bg-primary-600 transition-colors duration-200"
                >
                  <Camera size={14} />
                  <span>Add More</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <ApplicationProgressTracker 
          currentStep="documents" 
          completedSteps={completedSteps as any[]} 
        />
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Pictures Required</h2>
          
          {/* Application Submitted Modal */}
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Application submitted</h2>
              <p className="text-gray-600 mb-8">Got to your user portal</p>
              
              <button
                onClick={onNext}
                className="w-full bg-primary-500 text-white py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
              >
                Go to Portal
              </button>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Required Documents Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Required Documents</h3>
              <p className="text-gray-600 mb-6">
                Please upload the following documents to complete your application. All documents marked with an asterisk (*) are required.
              </p>

              <div className="grid gap-6">
                {documents.map((doc) => renderUploadSection(doc, false))}
              </div>
            </div>

            {/* Vehicle Photos Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Vehicle Photos</h3>
              <p className="text-gray-600 mb-6">
                Please take clear photos of your vehicle from all required angles. Some sections require multiple photos.
              </p>

              <div className="grid gap-6">
                {vehiclePhotos.map((photo) => renderUploadSection(photo, true))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-2">Security & Privacy</h4>
              <p className="text-blue-700 text-sm leading-relaxed">
                All uploaded documents and photos are encrypted and securely stored using bank-level security protocols. 
                We use advanced encryption technology to protect your personal information and ensure your data remains confidential.
                Your photos will only be used for loan verification purposes and will not be shared with third parties.
              </p>
            </div>

            {/* Photo Guidelines */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-900 mb-2">Photo Guidelines</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Ensure photos are clear and well-lit</li>
                <li>• Take photos in good lighting conditions</li>
                <li>• Make sure all text and details are readable</li>
                <li>• Avoid shadows or glare on documents</li>
                <li>• For vehicle damage photos, capture close-up details</li>
                <li>• VIN numbers must be clearly visible and readable</li>
              </ul>
            </div>

            {/* Progress Summary */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Upload Progress</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Required Documents</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(Object.keys(uploadedDocs).length / documents.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {Object.keys(uploadedDocs).length}/{documents.length}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Vehicle Photos</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(Object.keys(uploadedPhotos).length / vehiclePhotos.length) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {Object.keys(uploadedPhotos).length}/{vehiclePhotos.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                onClick={onBack}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!requiredDocsUploaded || !requiredPhotosUploaded}
                className={`px-8 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  requiredDocsUploaded && requiredPhotosUploaded
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadStep;