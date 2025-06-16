import Spline from '@splinetool/react-spline/next';

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] w-full text-center pt-20 pb-10 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="bg-yellow-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-glow animate-pulse">Whats New</span>
          <span className="bg-card text-yellow-400 text-xs font-medium px-2 py-1 rounded-full border border-yellow-500/30">Ease Update v0.1</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
          Intelligent Solutions<br />Powered by <span className="text-yellow-500">AI.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto mt-2 mb-6">
          Gain clarity and harness the power of your data with BuzzBites.<br />Our intuitive dashboard provides real-time analytics.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="glow text-base">Read More</button>
          <button className="glow text-base bg-yellow-500 hover:bg-yellow-600">Book a Demo &rarr;</button>
        </div>
      </div>
    </section>
  );
} 