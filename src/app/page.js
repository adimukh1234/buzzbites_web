import HeroSection from '../../components/HeroSection';
import Dashboard from '../../components/Dashboard';
import FeatureCards from '../../components/FeatureCards';
import SplineBackground from '../../components/SplineBackground';
import NavBar from '../../components/NavBar';

import './globals.css';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <SplineBackground />
        <HeroSection />
        <Dashboard />
        <FeatureCards />
        
      </main>
    </>
  );
}
