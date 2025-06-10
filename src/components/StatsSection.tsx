import React from 'react';
import { MapPin, CreditCard, Clock, CheckCircle } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: MapPin,
      title: 'Serving Multiple States Nationwide',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: CreditCard,
      title: 'Flexible payment terms',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Clock,
      title: 'Fast approval – cash in 30 minutes!',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our States
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className={`w-16 h-16 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {stat.title}
              </h3>
            </div>
          ))}
        </div>

        {/* What Sets Us Apart Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              What Sets Us Apart?
            </h2>
            
            <FeatureItem 
              title="Fast & Easy Process"
              description="Apply online or in-store and get same-day cash."
              isOpen={true}
            />
            <FeatureItem 
              title="No Late Fees"
              description="We understand life happens. No penalties for late payments."
            />
            <FeatureItem 
              title="No high interest fees"
              description="Competitive rates that won't break your budget."
            />
            <FeatureItem 
              title="Transparent Terms"
              description="Clear, upfront pricing with no hidden fees or surprises."
            />
          </div>

          {/* Right Column - Images */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-4 shadow-xl">
              <img 
                src="https://images.pexels.com/photos/1230777/pexels-photo-1230777.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Person holding car keys"
                className="rounded-xl w-full object-cover h-64 mb-4"
              />
              <div className="absolute -bottom-4 -right-4 w-32 h-32">
                <img 
                  src="https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400" 
                  alt="Car exterior"
                  className="rounded-xl w-full h-full object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
  isOpen?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, isOpen = false }) => {
  const [expanded, setExpanded] = React.useState(isOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-semibold text-gray-900">{title}</span>
        <CheckCircle 
          size={20} 
          className={`transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''} text-teal-600`}
        />
      </button>
      {expanded && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
};

export default StatsSection;