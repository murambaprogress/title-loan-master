import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import VehicleQualification from './components/VehicleQualification';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import CallToActionSection from './components/CallToActionSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
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