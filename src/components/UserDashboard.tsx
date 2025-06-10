import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  DollarSign, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin,
  Car,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { UserProfile, ApplicationData } from '../types/ApplicationTypes';

interface UserDashboardProps {
  user: UserProfile;
  application: ApplicationData;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, application, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'in_progress':
      case 'pending_verification':
        return 'text-yellow-600 bg-yellow-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle size={16} />;
      case 'in_progress':
      case 'pending_verification':
        return <Clock size={16} />;
      case 'rejected':
        return <AlertCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Application Status Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Application Status</h3>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
            {getStatusIcon(application.status)}
            <span className="capitalize">{application.status.replace('_', ' ')}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <DollarSign size={32} className="mx-auto text-teal-600 mb-2" />
            <p className="text-sm text-gray-600">Loan Amount</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(application.loanAmount)}</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Calendar size={32} className="mx-auto text-teal-600 mb-2" />
            <p className="text-sm text-gray-600">Applied On</p>
            <p className="text-lg font-semibold text-gray-900">{formatDate(application.createdAt)}</p>
          </div>
          
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <FileText size={32} className="mx-auto text-teal-600 mb-2" />
            <p className="text-sm text-gray-600">Application ID</p>
            <p className="text-lg font-semibold text-gray-900">#{application.id.slice(-8).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Download size={20} className="text-teal-600" />
            <span className="font-medium">Download Documents</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Eye size={20} className="text-teal-600" />
            <span className="font-medium">View Application</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Phone size={20} className="text-teal-600" />
            <span className="font-medium">Contact Support</span>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <CreditCard size={20} className="text-teal-600" />
            <span className="font-medium">Payment Options</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Application Submitted</p>
              <p className="text-sm text-gray-600">{formatDate(application.createdAt)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Documents Uploaded</p>
              <p className="text-sm text-gray-600">{formatDate(application.updatedAt)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">Under Review</p>
              <p className="text-sm text-gray-600">Processing your application</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <p className="text-gray-900 font-medium">{application.personalInfo.firstName || 'Not provided'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <p className="text-gray-900 font-medium">{application.personalInfo.lastName || 'Not provided'}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <p className="text-gray-900 font-medium">{user.email}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <p className="text-gray-900 font-medium">{application.personalInfo.phoneNo || 'Not provided'}</p>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <p className="text-gray-900 font-medium">
            {application.personalInfo.homeStreetAddress && application.personalInfo.city && application.personalInfo.state
              ? `${application.personalInfo.homeStreetAddress}, ${application.personalInfo.city}, ${application.personalInfo.state} ${application.personalInfo.zipCode}`
              : 'Not provided'
            }
          </p>
        </div>
      </div>
    </div>
  );

  const ApplicationTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Application Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
            <p className="text-gray-900 font-medium">{formatCurrency(application.loanAmount)}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Application Status</label>
            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
              {getStatusIcon(application.status)}
              <span className="capitalize">{application.status.replace('_', ' ')}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
            <p className="text-gray-900 font-medium">{application.vehicleInfo.vehicleType || 'Not provided'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Make & Model</label>
            <p className="text-gray-900 font-medium">
              {application.vehicleInfo.make && application.vehicleInfo.model
                ? `${application.vehicleInfo.make} ${application.vehicleInfo.model}`
                : 'Not provided'
              }
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Year</label>
            <p className="text-gray-900 font-medium">{application.vehicleInfo.year || 'Not provided'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
            <p className="text-gray-900 font-medium">
              {application.incomeInfo.totalGrossMonthlyIncome 
                ? formatCurrency(parseInt(application.incomeInfo.totalGrossMonthlyIncome))
                : 'Not provided'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-teal-700">Title Loan Masters</h1>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Bell size={20} />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-teal-600" />
                </div>
                <span className="text-gray-700 font-medium">{user.firstName} {user.lastName}</span>
              </div>
              
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-lg p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'overview' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <FileText size={20} />
                  <span>Overview</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'profile' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User size={20} />
                  <span>Profile</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('application')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'application' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Car size={20} />
                  <span>Application</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'settings' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Settings size={20} />
                  <span>Settings</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'application' && <ApplicationTab />}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Settings</h3>
                <p className="text-gray-600">Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;