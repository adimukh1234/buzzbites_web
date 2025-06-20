'use client';

export default function FuturisticOverlay({ opacity = 'low', className = '' }) {
  // Define opacity levels
  const opacityValues = {
    low: {
      grid: 'opacity-[0.07]',
      data: 'opacity-[0.05]',
      circuit: 'opacity-[0.04]',
      scanLine: 'opacity-[0.1]'
    },
    medium: {
      grid: 'opacity-[0.15]',
      data: 'opacity-[0.08]',
      circuit: 'opacity-[0.07]',
      scanLine: 'opacity-[0.15]'
    },
    high: {
      grid: 'opacity-[0.2]',
      data: 'opacity-[0.12]',
      circuit: 'opacity-[0.1]',
      scanLine: 'opacity-[0.2]'
    }
  };

  const opacitySet = opacityValues[opacity] || opacityValues.low;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Tech Grid Background */}
      <div className={`tech-grid absolute inset-0 ${opacitySet.grid}`}></div>
      
      {/* Binary Data Visualization */}
      <div className={`data-numbers absolute inset-0 ${opacitySet.data}`}></div>
      
      {/* Circuit Board Patterns */}
      <div className={`circuit-overlay absolute inset-0 ${opacitySet.circuit}`}></div>
      
      {/* Scanning Line Effect */}
      <div className={`tech-scanline-container absolute inset-0 ${opacitySet.scanLine}`}>
        <div className="tech-scanline-horizontal"></div>
        <div className="tech-scanline-vertical"></div>
      </div>
      
      {/* Corner Brackets */}
      <div className="tech-corner-container absolute inset-0 z-10">
        <div className="tech-corner-lt"></div>
        <div className="tech-corner-rt"></div>
        <div className="tech-corner-lb"></div>
        <div className="tech-corner-rb"></div>
      </div>
    </div>
  );
}
