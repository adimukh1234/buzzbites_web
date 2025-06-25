import HeroSection from '../../components/HeroSection';
import SplineBackground from '../../components/SplineBackground';
import NavBar from '../../components/NavBar';
import InstaconProduct from '../../components/InstaconProduct.fixed';
import ScrollReveal from '../../components/ScrollReveal';
import ParallaxSection from '../../components/ParallaxSection';
import MouseParallax from '../../components/MouseParallax';
import MetricCards from '../../components/MetricCards';
import TechScrollbar from '../../components/TechScrollbar';
import AnimatedTimeline from '../../components/AnimatedTimeline';
import ScrollSections from '../../components/ScrollSections';

import './globals.css';

export default function Home() {
  return (
    <>
      <TechScrollbar />
      <NavBar />
      <main className="main-content">
        <SplineBackground />
        <MouseParallax strength={0.02}>
          <HeroSection />
        </MouseParallax>

        <ParallaxSection offset={0.3} direction="up">
          <InstaconProduct />
        </ParallaxSection>
        
        <div className="relative z-10">
          <ScrollReveal effect="fade-up" delay={0.2}>
            <MetricCards />
          </ScrollReveal>
        </div>
        
        <ScrollReveal effect="fade-up" delay={0.3}>
          <AnimatedTimeline />
        </ScrollReveal>
        
        <ScrollSections />
      </main>
    </>
  );
}
