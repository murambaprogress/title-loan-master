import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VehicleQualification from './components/VehicleQualification';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';
import LoanApplicationFlow from './components/LoanApplicationFlow';

function App() {
  const [showLoanFlow, setShowLoanFlow] = useState(false);

  const handleLoginClick = () => {
    setShowLoanFlow(true);
  };

  const handleSignupClick = () => {
    setShowLoanFlow(true);
  };

  if (showLoanFlow) {
    return <LoanApplicationFlow />;
  }

  return (
    <div className="min-h-screen">
      <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <HeroSection />
      <VehicleQualification />
      <ServicesSection />
      <StatsSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}

export default App;