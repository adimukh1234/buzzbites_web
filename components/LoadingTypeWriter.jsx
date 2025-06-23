'use client';
import { useState, useEffect } from 'react';

export default function LoadingTypeWriter({ messages, typingSpeed = 50, changeMessageDelay = 1000 }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    const currentMessage = messages[currentMessageIndex];

    // Determine typing/deleting effect timeout
    let timeout;

    if (isDeleting) {
      // When deleting, remove one character
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev.substring(0, prev.length - 1));
        
        // When done deleting, move to next message
        if (displayedText.length <= 1) {
          setIsDeleting(false);
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }
      }, typingSpeed / 2); // Delete faster than typing
    } else {
      // When typing, add one character
      if (displayedText.length < currentMessage.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentMessage.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // When done typing, wait a moment, then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, changeMessageDelay);
      }
    }

    // Cleanup timeout
    return () => clearTimeout(timeout);
  }, [messages, currentMessageIndex, displayedText, isDeleting, typingSpeed, changeMessageDelay]);

  if (!messages || messages.length === 0) return null;

  return <span className="inline-block">{displayedText}<span className="animate-pulse">_</span></span>;
}
