'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import styles from './Story.module.css';

const Story = () => {
  // Track if we're on the first render
  const isFirstRender = useRef(true);
  
  // Define stories data inside the component with unique images
  const stories = [
    {
      profileImg: "/samples/pexels-joshsorenson-1714208.jpg",
      profileName: "Behance",
      title: [
        "Showcasing creative",
        "portfolios and projects",
        "from top designers"
      ],
      linkLabel: "Read More",
      linkSrc: "https://www.behance.net",
      storyImg: "/samples/pexels-alxs-919734.jpg"
    },
    {
      profileImg: "/samples/pexels-luis-gomes-166706-546819.jpg",
      profileName: "Dribbble",
      title: [
        "Inspiring design",
        "ideas and visual",
        "creations from experts"
      ],
      linkLabel: "Discover",
      linkSrc: "https://www.dribbble.com",
      storyImg: "/samples/pexels-junior-teixeira-1064069-2047905.jpg"
    },
    {
      profileImg: "/samples/pexels-joshsorenson-1714208.jpg",
      profileName: "Pinterest",
      title: [
        "Explore lifestyle",
        "visual moodboards",
        "and endless inspiration"
      ],
      linkLabel: "Browse",
      linkSrc: "https://www.pinterest.com",
      storyImg: "/samples/pexels-luis-gomes-166706-546819.jpg"
    },
    {
      profileImg: "/samples/pexels-luis-gomes-166706-546819.jpg",
      profileName: "Instagram",
      title: [
        "Trending reels",
        "behind the scenes",
        "stories that stick"
      ],
      linkLabel: "View",
      linkSrc: "https://www.instagram.com",
      storyImg: "/samples/pexels-joshsorenson-1714208.jpg"
    }
  ];

  const [activeStory, setActiveStory] = useState(0);
  // Always using 'next' direction since we only want forward navigation
  const [direction, setDirection] = useState('next');
  // We'll always show the cursor text now
  const [showCursorText] = useState(true);

  // Refs for DOM elements and timers
  const storyTimeoutRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const storyImgRef = useRef(null);

  const storyDuration = 8000; // Increased from 4 seconds to 8 seconds
  const contentUpdateDelay = 0.4;

  // Function to change the current story
  const changeStory = useCallback(() => {
    // If this is the very first render, just mark it as completed and don't transition
    if (isFirstRender.current) {
      isFirstRender.current = false;
      storyTimeoutRef.current = setTimeout(changeStory, storyDuration);
      return;
    }
    
    console.log("Changing story, direction: next"); // Debug log - always forward
    
    setActiveStory(currentActiveStory => {
      const previousStory = currentActiveStory;
      // Always go forward - removed direction conditional
      const newActiveStory = (currentActiveStory + 1) % stories.length;
      
      const story = stories[newActiveStory];

      // Animate profile name transition - always animate upward (next direction)
      gsap.to(`.${styles.profileName} p`, {
        y: -24, // Always using the 'next' animation direction
        duration: 0.5,
        delay: contentUpdateDelay,
      });

      // Animate title text transition - always animate upward (next direction)
      gsap.to(`.${styles.titleRow} h1`, {
        y: -48, // Always using the 'next' animation direction
        duration: 0.5,
        delay: contentUpdateDelay,
      });

      const currentImgContainer = document.querySelector(`.${styles.storyImg} .${styles.img}`);
      const currentImg = currentImgContainer?.querySelector('img');

      setTimeout(() => {
        // Update profile name - always animate from bottom to top (next direction)
        const newProfileName = document.createElement('p');
        newProfileName.innerText = story.profileName;
        newProfileName.style.transform = 'translateY(24px)'; // Always using the 'next' animation

        const profileNameDiv = document.querySelector(`.${styles.profileName}`);
        profileNameDiv?.appendChild(newProfileName);

        gsap.to(newProfileName, {
          y: 0,
          duration: 0.5,
          delay: contentUpdateDelay,
        });

        // Update title text - always animate from bottom to top (next direction)
        const titleRows = document.querySelectorAll(`.${styles.titleRow}`);
        story.title.forEach((line, index) => {
          if (titleRows[index]) {
            const newTitle = document.createElement('h1');
            newTitle.innerText = line;
            newTitle.style.transform = 'translateY(48px)'; // Always using the 'next' animation
            titleRows[index].appendChild(newTitle);

            gsap.to(newTitle, {
              y: 0,
              duration: 0.5,
              delay: contentUpdateDelay,
            });
          }
        });

        // Create and animate new image
        const newImgContainer = document.createElement('div');
        newImgContainer.classList.add(styles.img);
        const newStoryImg = document.createElement('img');
        newStoryImg.src = story.storyImg;
        newStoryImg.alt = story.profileName;
        newImgContainer.appendChild(newStoryImg);

        storyImgRef.current?.appendChild(newImgContainer);

        animateNewImage(newImgContainer);

        const upcomingImg = newStoryImg;
        animateImageScale(currentImg, upcomingImg);

        resetIndexHighlights(previousStory);
        animateIndexHighlights(newActiveStory);

        clearUpElements();

        // Reset timeout for auto story change
        clearTimeout(storyTimeoutRef.current);
        storyTimeoutRef.current = setTimeout(changeStory, storyDuration);
      }, 200);

      // Update profile image and link after a delay
      setTimeout(() => {
        const profileImg = document.querySelector(`.${styles.profileIcon} img`);
        if (profileImg) profileImg.src = story.profileImg;

        const link = document.querySelector(`.${styles.link} a`);
        if (link) {
          link.textContent = story.linkLabel;
          link.href = story.linkSrc;
        }
      }, 600);

      return newActiveStory;
    });
  }, [direction, stories, contentUpdateDelay, storyDuration]);

  // Animation for new image clip path - always animate from right to left (next direction)
  const animateNewImage = (imgContainer) => {
    gsap.set(imgContainer, {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    });

    gsap.to(imgContainer, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: "power2.inOut",
    });
  };

  // Animation for scaling and rotating images during transition - always going forward
  const animateImageScale = (currentImg, upcomingImg) => {
    if (!currentImg || !upcomingImg) return;
    
    gsap.to(currentImg, {
      scale: 2,
      rotate: 25, // Always use the 'next' animation (positive rotation)
      duration: 1,
      ease: "power4.inOut",
      onComplete: function() {
        if (currentImg && currentImg.parentElement) {
          currentImg.parentElement.remove();
        }
      }
    });

    gsap.fromTo(upcomingImg, 
      {
        scale: 2,
        rotate: -25, // Always use the 'next' animation (negative initial rotation)
      }, 
      {
        scale: 1,
        rotate: 0,
        duration: 1,
        ease: "power4.inOut",
      }
    );
  };

  // Reset the highlight animation for a specific index - always using next direction
  const resetIndexHighlights = (index) => {
    const indices = document.querySelectorAll(`.${styles.index}`);
    if (!indices[index]) return;
    
    const highlight = indices[index].querySelector(`.${styles.indexHighlight}`);
    if (!highlight) return;
    
    gsap.killTweensOf(highlight);
    gsap.to(highlight, {
      width: '100%', // Always use the 'next' animation
      duration: 0.3,
      onStart: () => {
        gsap.to(highlight, {
          transformOrigin: "right center",
          scaleX: 0,
          duration: 0.3,
        });
      }
    });
  };

  // Animate the highlight for the active index
  const animateIndexHighlights = (index) => {
    const indices = document.querySelectorAll(`.${styles.index}`);
    if (!indices[index]) return;
    
    const highlight = indices[index].querySelector(`.${styles.indexHighlight}`);
    if (!highlight) return;
    
    gsap.set(highlight, {
      width: "0%",
      scaleX: 1,
      transformOrigin: "right center",
    });

    gsap.to(highlight, {
      width: "100%",
      duration: storyDuration / 1000,
      ease: "none",
    });
  };

  // Clear old elements to prevent memory leaks
  const clearUpElements = () => {
    const profileNameDiv = document.querySelector(`.${styles.profileName}`);
    const titleRows = document.querySelectorAll(`.${styles.titleRow}`);

    if (profileNameDiv) {
      while (profileNameDiv.childElementCount > 2) {
        profileNameDiv.removeChild(profileNameDiv.firstChild);
      }
    }

    titleRows.forEach((titleRow) => {
      while (titleRow.childElementCount > 2) {
        titleRow.removeChild(titleRow.firstChild);
      }
    });
  };

  // Handle mouse movement to update cursor - always show "Next"
  const handleMouseMove = useCallback((event) => {
    if (!cursorRef.current || !cursorTextRef.current) return;
    
    const { clientX, clientY } = event;
    gsap.to(cursorRef.current, {
      x: clientX - cursorRef.current.offsetWidth / 2,
      y: clientY - cursorRef.current.offsetHeight / 2,
      duration: 0.3,
      ease: "power2.out",
    });

    // Always display "Next" on the cursor
    cursorTextRef.current.textContent = "Next";
  }, []);
  
  // These handlers are no longer needed since we always want to show "Next"
  const handleStoryMouseEnter = useCallback(() => {
    // No longer hide text
  }, []);
  
  const handleStoryMouseLeave = useCallback(() => {
    // No longer need to restore text
  }, []);

  // Handle click to change story - always move forward regardless of click position
  const handleClick = useCallback((e) => {
    // Mark first render as complete to ensure animations work properly
    isFirstRender.current = false;
    
    // Always set direction to 'next' regardless of click position
    setDirection('next');
    
    // Clear current timeout and transition
    clearTimeout(storyTimeoutRef.current);
    setActiveStory(currentActiveStory => {
      resetIndexHighlights(currentActiveStory);
      return currentActiveStory;
    });
    
    // Small timeout to ensure direction is set before story changes
    setTimeout(() => {
      changeStory();
    }, 10);
  }, [changeStory]);

  // Container ref for mouse events
  const containerRef = useRef(null);
  
  // Setup and cleanup effects
  useEffect(() => {
    // Ensure direction is always set to 'next' on component mount
    setDirection('next');
    
    // Start with first story animation only
    animateIndexHighlights(activeStory);
    
    // Only set up the auto-advance timer (will run after storyDuration)
    storyTimeoutRef.current = setTimeout(() => {
      // Always using next direction
      changeStory();
    }, storyDuration);

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    // Set initial text for cursor
    if (cursorTextRef.current) {
      cursorTextRef.current.textContent = "Next";
    }

    // Cleanup function
    return () => {
      clearTimeout(storyTimeoutRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, [handleMouseMove, handleClick]);

  return (
    <div className={styles.container} ref={containerRef} style={{ cursor: 'none' }}>
      <div className={styles.cursor} ref={cursorRef}>
        <p ref={cursorTextRef}>Next</p>
      </div>

      <div className={styles.storyImg} ref={storyImgRef}>
        <div className={styles.img}>
          <img src={stories[activeStory].storyImg} alt={stories[activeStory].profileName} />
        </div>
      </div>

      <div className={styles.storyContent}>
        <div className={styles.row}>
          <div className={styles.indices}>
            {stories.map((_, index) => (
              <div className={styles.index} key={index}>
                <div className={styles.indexHighlight}></div>
              </div>
            ))}
          </div>

          <div className={styles.profile}>
            <div className={styles.profileIcon}>
              <img src={stories[activeStory].profileImg} alt="Profile Icon" />
            </div>
            <div className={styles.profileName}>
              <p>{stories[activeStory].profileName}</p>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.title}>
            {stories[activeStory].title.map((line, index) => (
              <div className={styles.titleRow} key={index}>
                <h1>{line}</h1>
              </div>
            ))}
          </div>
          <div className={styles.link}>
            <a 
              href={stories[activeStory].linkSrc} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {stories[activeStory].linkLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;