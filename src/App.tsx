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

  const handleApplyClick = () => {
    setShowLoanFlow(true);
  };

  const handleBackToHome = () => {
    setShowLoanFlow(false);
  };

  if (showLoanFlow) {
    return <LoanApplicationFlow onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen">
      <Header onLoginClick={handleApplyClick} onSignupClick={handleApplyClick} />
      <HeroSection onApplyClick={handleApplyClick} />
      <VehicleQualification />
      <ServicesSection onApplyClick={handleApplyClick} />
      <StatsSection />
      <CallToActionSection onApplyClick={handleApplyClick} />
      <Footer />
    </div>
  );
}

export default App;