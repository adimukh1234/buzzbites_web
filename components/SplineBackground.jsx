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
          scene="/web_3_agency_saas_hero_section.spline" 
          style={{ width: '100%', height: '100%', transform: 'translateY(-100px) scale(1.2)' }}
          onLoad={handleLoad}
          onError={handleError}
        />
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