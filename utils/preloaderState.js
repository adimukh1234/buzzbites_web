'use client';
// This utility manages the preloader state across page navigation

// Create a singleton to track if the initial load has happened
let hasLoaded = false;

export const preloaderState = {
  get hasInitiallyLoaded() {
    // If running on the client, return the stored state
    if (typeof window !== 'undefined') {
      return hasLoaded;
    }
    // On server, always return false
    return false;
  },
  
  setLoaded() {
    hasLoaded = true;
  }
};
