import HeroSection from '../../components/HeroSection';
import Dashboard from '../../components/Dashboard';
import FeatureCards from '../../components/FeatureCards';
import SplineBackground from '../../components/SplineBackground';
import NavBar from '../../components/NavBar';
import InstaconProduct from '../../components/InstaconProduct';
import ScrollReveal from '../../components/ScrollReveal';
import ParallaxSection from '../../components/ParallaxSection';
import MouseParallax from '../../components/MouseParallax';

import './globals.css';

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <SplineBackground />
        <MouseParallax strength={0.02}>
          <HeroSection />
        </MouseParallax>

        <ParallaxSection offset={0.3} direction="up">
          <InstaconProduct />
        </ParallaxSection>
        
        <ScrollReveal effect="fade-up">
          <Dashboard />
        </ScrollReveal>
        
        <ScrollReveal effect="fade-up" delay={0.2}>
          <FeatureCards />
        </ScrollReveal>
      </main>
    </>
  );
}
