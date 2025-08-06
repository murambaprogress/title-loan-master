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
  AlertCircle,
  Edit,
  Plus,
  Search,
  Filter,
  ChevronRight,
  UserPlus
} from 'lucide-react';
import { UserProfile, ApplicationData } from '../types/ApplicationTypes';
import ApplicationStorage from '../utils/ApplicationStorage';

interface UserDashboardProps {
  user: UserProfile;
  application: ApplicationData;
  onLogout: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, application, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [applications, setApplications] = useState<ApplicationData[]>([application]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
    address: application.personalInfo.homeStreetAddress || '',
    city: application.personalInfo.city || '',
    state: application.personalInfo.state || '',
    zipCode: application.personalInfo.zipCode || ''
  });

  const storage = ApplicationStorage.getInstance();

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

  const handleProfileUpdate = () => {
    // Update user profile logic
    const updatedUser = { ...user, ...profileData };
    storage.saveUser(updatedUser);
    setShowEditProfile(false);
  };

  const handleNewApplication = () => {
    // Create new application logic
    const newApp = storage.createApplication(user.id, 5000);
    setApplications([...applications, newApp]);
  };

  // Overview Tab
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.firstName}!</h2>
        <p className="text-teal-100">Manage your applications and profile from your dashboard.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
            </div>
            <FileText size={32} className="text-teal-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Loans</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <DollarSign size={32} className="text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Borrowed</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(application.loanAmount)}</p>
            </div>
            <CreditCard size={32} className="text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Account Status</p>
              <p className="text-2xl font-bold text-green-600">Active</p>
            </div>
            <CheckCircle size={32} className="text-green-600" />
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Applications</h3>
          <button
            onClick={handleNewApplication}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors duration-200"
          >
            <Plus size={16} />
            <span>New Application</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Application #{app.id.slice(-8).toUpperCase()}</h4>
                    <p className="text-sm text-gray-600">{formatCurrency(app.loanAmount)} • {formatDate(app.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                    {getStatusIcon(app.status)}
                    <span className="capitalize">{app.status.replace('_', ' ')}</span>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Applications Tab
  const ApplicationsTab = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button
            onClick={handleNewApplication}
            className="flex items-center space-x-2 px-4 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors duration-200"
          >
            <Plus size={16} />
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="grid gap-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Application #{app.id.slice(-8).toUpperCase()}</h3>
                <p className="text-gray-600">Submitted on {formatDate(app.createdAt)}</p>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                {getStatusIcon(app.status)}
                <span className="capitalize">{app.status.replace('_', ' ')}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <DollarSign size={24} className="mx-auto text-teal-600 mb-2" />
                <p className="text-sm text-gray-600">Loan Amount</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(app.loanAmount)}</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Car size={24} className="mx-auto text-teal-600 mb-2" />
                <p className="text-sm text-gray-600">Vehicle</p>
                <p className="text-lg font-bold text-gray-900">
                  {app.vehicleInfo.make && app.vehicleInfo.model
                    ? `${app.vehicleInfo.make} ${app.vehicleInfo.model}`
                    : 'Not provided'
                  }
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Calendar size={24} className="mx-auto text-teal-600 mb-2" />
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-lg font-bold text-gray-900">{formatDate(app.updatedAt)}</p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Eye size={16} />
                <span>View Details</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Download size={16} />
                <span>Download</span>
              </button>
              {app.status === 'in_progress' && (
                <button className="flex items-center space-x-2 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors duration-200">
                  <Edit size={16} />
                  <span>Continue</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Profile Tab
  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
          <button
            onClick={() => setShowEditProfile(!showEditProfile)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors duration-200"
          >
            <Edit size={16} />
            <span>{showEditProfile ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        </div>
        
        {showEditProfile ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profileData.phoneNumber}
                  onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  value={profileData.state}
                  onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleProfileUpdate}
                className="px-6 py-3 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors duration-200"
              >
                Save Changes
              </button>
              <button
                onClick={() => setShowEditProfile(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <p className="text-gray-900 font-medium">{user.firstName}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <p className="text-gray-900 font-medium">{user.lastName}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <p className="text-gray-900 font-medium">{user.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <p className="text-gray-900 font-medium">{user.phoneNumber || 'Not provided'}</p>
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
        )}
      </div>
      
      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive updates about your applications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">SMS Notifications</h4>
              <p className="text-sm text-gray-600">Receive text updates on your phone</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Marketing Communications</h4>
              <p className="text-sm text-gray-600">Receive promotional offers and updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
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
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
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
                  onClick={() => setActiveTab('applications')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'applications' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Car size={20} />
                  <span>Applications</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                    activeTab === 'profile' ? 'bg-teal-100 text-teal-700' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User size={20} />
                  <span>Manage Profile</span>
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
            {activeTab === 'applications' && <ApplicationsTab />}
            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Settings</h3>
                <p className="text-gray-600">Additional settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;