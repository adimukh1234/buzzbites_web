import Header from '../../components/Header';
import HeroSection from '../../components/HeroSection';
import Dashboard from '../../components/Dashboard';
import FeatureCards from '../../components/FeatureCards';
import SplineBackground from '../../components/SplineBackground';
import './globals.css';

export default function Home() {
  return (
    <main>
      <SplineBackground />
      <Header />
      <HeroSection />
      <Dashboard />
      <FeatureCards />
    </main>
  );
}
