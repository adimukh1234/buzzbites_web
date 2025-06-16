'use client';

import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleLoad = () => {
    console.log('Spline model loaded successfully');
    setIsModelLoaded(true);
  };

  const handleError = (error) => {
    console.error('Error loading Spline model:', error);
    setError(error);
  };

  return (
    <>
      <div className="fixed inset-0 w-full h-full -z-10">
        <Spline 
          scene="https://prod.spline.design/pr54my4R4q3Ypo3H/scene.splinecode" 
          style={{ width: '100%', height: '100%' }}
          onLoad={handleLoad}
          onError={handleError}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#1a1a00]/50 to-[#2a2a00]/60" />
      </div>
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded">
          Error loading 3D model: {error.message}
        </div>
      )}
      <style jsx global>{`
        body {
          opacity: ${isModelLoaded ? 1 : 0};
          transition: opacity 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
} 