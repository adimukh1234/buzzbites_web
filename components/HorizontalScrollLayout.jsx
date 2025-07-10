'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScrollLayout() {
    const containerRef = useRef(null);
    const panelsContainerRef = useRef(null);
    const progressRef = useRef(null);
    const navigationRef = useRef(null);

    useEffect(() => {
        const initializeHorizontalScroll = () => {
            // DOM elements
            const pageContainer = document.querySelector(".page-container");
            const horizontalContainer = document.querySelector(".horizontal-container");
            const panelsContainer = document.querySelector(".panels-container");
            const panels = document.querySelectorAll(".panel");
            const progressFill = document.querySelector(".nav-progress-fill");
            const navText = document.querySelectorAll(".nav-text")[1];
            const parallaxElements = document.querySelectorAll(".parallax");
            const leftMenu = document.querySelector(".left-menu");
            const menuBtn = document.querySelector(".menu-btn");
            const sectionNavItems = document.querySelectorAll(".section-nav-item");
            const videoBackground = document.querySelector(".video-background");
            const copyEmailBtn = document.querySelector(".copy-email");
            const copyTooltip = document.querySelector(".copy-tooltip");

            // Constants
            const SMOOTH_FACTOR = 0.065;
            const WHEEL_SENSITIVITY = 1.0;
            const PANEL_COUNT = panels.length;
            const MENU_WIDTH = 250;
            const MENU_COLLAPSED_WIDTH = 60;
            const PARALLAX_INTENSITY = 0.5;

            // State variables
            let targetX = 0;
            let currentX = 0;
            let currentProgress = 0;
            let targetProgress = 0;
            let panelWidth = window.innerWidth;
            let maxScroll = (PANEL_COUNT - 1) * panelWidth;
            let isAnimating = false;
            let currentPanel = 0;
            let lastPanel = -1;
            let menuExpanded = false;

            // Touch variables
            let isDragging = false;
            let startX = 0;
            let startScrollX = 0;
            let velocityX = 0;
            let lastTouchX = 0;
            let lastTouchTime = 0;

            // Helper functions
            const lerp = (start, end, factor) => start + (end - start) * factor;
            const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

            // Copy email functionality
            if (copyEmailBtn) {
                copyEmailBtn.addEventListener("click", () => {
                    const email = document.querySelector(".email").textContent;
                    navigator.clipboard.writeText(email).then(() => {
                        copyTooltip.classList.add("active");
                        setTimeout(() => {
                            copyTooltip.classList.remove("active");
                        }, 2000);
                    });
                });
            }

            // Menu animation
            const animateMenuItems = (show) => {
                sectionNavItems.forEach((item, index) => {
                    if (show) {
                        setTimeout(() => {
                            item.classList.add("animate-in");
                        }, 50 + index * 30);
                    } else {
                        item.classList.remove("animate-in");
                    }
                });
            };

            // Toggle menu expansion
            if (menuBtn) {
                menuBtn.addEventListener("click", () => {
                    menuExpanded = !menuExpanded;
                    leftMenu.classList.toggle("expanded");
                    document.body.classList.toggle("menu-expanded");

                    if (menuExpanded) {
                        setTimeout(() => {
                            animateMenuItems(true);
                        }, 150);
                    } else {
                        animateMenuItems(false);
                    }

                    setTimeout(() => {
                        updateDimensions(false);
                    }, 400);
                });
            }

            // Parallax effect
            const updateParallax = () => {
                parallaxElements.forEach((element) => {
                    if (!element) return;
                    const speed = Number.parseFloat(element.dataset.speed) || 0.2;
                    const PARALLAX_INTENSITY = 0.2;
                    const moveX = -currentX * speed * PARALLAX_INTENSITY;
                    element.style.transform = `translateX(${moveX}px)`;
                });
            };

            // Update dimensions
            const updateDimensions = (animate = true) => {
                panelWidth = window.innerWidth;
                maxScroll = (PANEL_COUNT - 1) * panelWidth;
                targetX = currentPanel * panelWidth;
                currentX = targetX;

                panels.forEach((panel) => {
                    panel.style.width = `${panelWidth}px`;
                });

                if (animate) {
                    panelsContainer.classList.add("transitioning");
                    setTimeout(() => {
                        panelsContainer.classList.remove("transitioning");
                    }, 400);
                }

                panelsContainer.style.transform = `translateX(-${currentX}px)`;
                updateParallax();
            };

            // Navigate to section
            sectionNavItems.forEach((item) => {
                item.addEventListener("click", () => {
                    const index = Number.parseInt(item.getAttribute("data-index"));
                    targetX = index * panelWidth;

                    sectionNavItems.forEach((navItem) => {
                        navItem.classList.remove("active");
                    });
                    item.classList.add("active");

                    startAnimation();

                    if (window.innerWidth < 768 && menuExpanded) {
                        menuExpanded = false;
                        leftMenu.classList.remove("expanded");
                        document.body.classList.remove("menu-expanded");
                        animateMenuItems(false);

                        setTimeout(() => {
                            updateDimensions(false);
                        }, 400);
                    }
                });
            });

            // Split text animation
            const splitTexts = document.querySelectorAll(".split-text");
            splitTexts.forEach((text) => {
                const words = text.textContent.split(" ");
                text.innerHTML = words
                    .map((word) => `<span class="word">${word}</span>`)
                    .join(" ");

                const wordElements = text.querySelectorAll(".word");
                wordElements.forEach((word, index) => {
                    word.style.transitionDelay = `${index * 0.02}s`;
                });
            });

            // Update page counter
            const updatePageCount = () => {
                const currentPanelIndex = Math.round(currentX / panelWidth) + 1;
                const formattedIndex = currentPanelIndex.toString().padStart(2, "0");
                const totalPanels = PANEL_COUNT.toString().padStart(2, "0");
                if (navText) {
                    navText.textContent = `${formattedIndex} / ${totalPanels}`;
                }

                sectionNavItems.forEach((item, index) => {
                    if (index === currentPanelIndex - 1) {
                        item.classList.add("active");
                    } else {
                        item.classList.remove("active");
                    }
                });
            };

            // Update progress bar
            const updateProgress = () => {
                targetProgress = currentX / maxScroll;
                currentProgress = lerp(currentProgress, targetProgress, SMOOTH_FACTOR * 1.5);
                if (progressFill) {
                    progressFill.style.transform = `scaleX(${currentProgress})`;
                }
            };

            // Update active panel
            const updateActivePanel = () => {
                currentPanel = Math.round(currentX / panelWidth);
                if (currentPanel !== lastPanel) {
                    panels.forEach((panel) => {
                        panel.classList.remove("was-active");
                    });

                    if (lastPanel >= 0 && panels[lastPanel]) {
                        panels[lastPanel].classList.remove("active");
                    }

                    if (panels[currentPanel]) {
                        panels[currentPanel].classList.add("active");
                    }

                    for (let i = 0; i < panels.length; i++) {
                        if (i < currentPanel) {
                            panels[i].classList.add("visited");
                        } else {
                            panels[i].classList.remove("visited");
                        }
                    }

                    lastPanel = currentPanel;
                }
            };

            // Animation loop
            const animate = () => {
                currentX = lerp(currentX, targetX, SMOOTH_FACTOR);
                if (panelsContainer) {
                    panelsContainer.style.transform = `translateX(-${currentX}px)`;
                }

                updateProgress();
                updatePageCount();
                updateActivePanel();
                updateParallax();

                if (Math.abs(targetX - currentX) > 0.1 || isAnimating) {
                    requestAnimationFrame(animate);
                } else {
                    isAnimating = false;
                }
            };

            // Start animation
            const startAnimation = () => {
                if (!isAnimating) {
                    isAnimating = true;
                    requestAnimationFrame(animate);
                }
            };

            // Event handlers
            const handleWheel = (e) => {
                e.preventDefault();
                targetX = clamp(targetX + e.deltaY * WHEEL_SENSITIVITY, 0, maxScroll);
                startAnimation();
            };

            const handleMouseDown = (e) => {
                if (e.target.closest(".left-menu") || e.target.closest(".copy-email")) return;

                isDragging = true;
                startX = e.clientX;
                startScrollX = currentX;
                lastTouchX = e.clientX;
                lastTouchTime = Date.now();
                document.body.style.cursor = "grabbing";
                e.preventDefault();
            };

            const handleMouseMove = (e) => {
                if (!isDragging) return;
                const dx = e.clientX - startX;
                targetX = clamp(startScrollX - dx, 0, maxScroll);

                const currentTime = Date.now();
                const timeDelta = currentTime - lastTouchTime;
                if (timeDelta > 0) {
                    const touchDelta = lastTouchX - e.clientX;
                    velocityX = (touchDelta / timeDelta) * 15;
                }

                lastTouchX = e.clientX;
                lastTouchTime = currentTime;
                startAnimation();
            };

            const handleMouseUp = () => {
                if (!isDragging) return;
                isDragging = false;
                document.body.style.cursor = "grab";

                if (Math.abs(velocityX) > 0.5) {
                    targetX = clamp(targetX + velocityX * 8, 0, maxScroll);
                }

                const nearestPanel = Math.round(targetX / panelWidth);
                targetX = nearestPanel * panelWidth;
                startAnimation();
            };

            const handleTouchStart = (e) => {
                if (e.target.closest(".left-menu") || e.target.closest(".copy-email")) return;

                isDragging = true;
                startX = e.touches[0].clientX;
                startScrollX = currentX;
                lastTouchX = e.touches[0].clientX;
                lastTouchTime = Date.now();
            };

            const handleTouchMove = (e) => {
                if (!isDragging) return;
                const dx = e.touches[0].clientX - startX;
                targetX = clamp(startScrollX - dx, 0, maxScroll);

                const currentTime = Date.now();
                const timeDelta = currentTime - lastTouchTime;
                if (timeDelta > 0) {
                    const touchDelta = lastTouchX - e.touches[0].clientX;
                    velocityX = (touchDelta / timeDelta) * 12;
                }

                lastTouchX = e.touches[0].clientX;
                lastTouchTime = currentTime;
                e.preventDefault();
                startAnimation();
            };

            const handleTouchEnd = () => {
                if (!isDragging) return;
                isDragging = false;

                if (Math.abs(velocityX) > 0.5) {
                    targetX = clamp(targetX + velocityX * 6, 0, maxScroll);
                }

                const nearestPanel = Math.round(targetX / panelWidth);
                targetX = nearestPanel * panelWidth;
                startAnimation();
            };

            // Event listeners
            if (horizontalContainer) {
                horizontalContainer.addEventListener("wheel", handleWheel, { passive: false });
                horizontalContainer.addEventListener("mousedown", handleMouseDown);
                window.addEventListener("mousemove", handleMouseMove);
                window.addEventListener("mouseup", handleMouseUp);
                horizontalContainer.addEventListener("touchstart", handleTouchStart, { passive: true });
                horizontalContainer.addEventListener("touchmove", handleTouchMove, { passive: false });
                horizontalContainer.addEventListener("touchend", handleTouchEnd, { passive: true });
            }

            window.addEventListener("resize", () => {
                updateDimensions();
            });

            // Initialize parallax elements
            parallaxElements.forEach((img) => {
                if (img.tagName === "IMG") {
                    if (img.complete) {
                        img.classList.add("loaded");
                    } else {
                        img.addEventListener("load", () => {
                            img.classList.add("loaded");
                        });
                    }
                }
            });

            // Video background
            if (videoBackground) {
                videoBackground.playbackRate = 0.6;
            }

            // Initialize
            updateDimensions();
            updateActivePanel();
            updatePageCount();
            startAnimation();

            // Show navigation after initialization
            const navigation = document.querySelector(".navigation");
            if (navigation) {
                setTimeout(() => {
                    navigation.classList.add("visible");
                }, 500);
            }

            // Initial animation
            setTimeout(() => {
                if (panels[0]) panels[0].classList.add("active");
                if (sectionNavItems[0]) sectionNavItems[0].classList.add("active");
            }, 100);

            setTimeout(() => {
                updateParallax();
            }, 200);
        };

        // Initialize after component mounts
        initializeHorizontalScroll();
    }, []);

    return (
        <div className="horizontal-scroll-layout">
            {/* Left Menu */}
            <div className="left-menu">
                <div className="left-menu-top">
                    <button className="menu-btn" aria-label="Toggle menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="left-menu-middle">
                    <div className="logo">SPACE</div>
                </div>
                <div className="section-nav">
                    <a className="section-nav-item" data-index="0">
                        <span className="section-nav-item-number">01</span>
                        <span>Introduction</span>
                    </a>
                    <a className="section-nav-item" data-index="1">
                        <span className="section-nav-item-number">02</span>
                        <span>Matthew</span>
                    </a>
                    <a className="section-nav-item" data-index="2">
                        <span className="section-nav-item-number">03</span>
                        <span>Beyond</span>
                    </a>
                    <a className="section-nav-item" data-index="3">
                        <span className="section-nav-item-number">04</span>
                        <span>Rick</span>
                    </a>
                    <a className="section-nav-item" data-index="4">
                        <span className="section-nav-item-number">05</span>
                        <span>Cosmos</span>
                    </a>
                    <a className="section-nav-item" data-index="5">
                        <span className="section-nav-item-number">06</span>
                        <span>Dialogue</span>
                    </a>
                    <a className="section-nav-item" data-index="6">
                        <span className="section-nav-item-number">07</span>
                        <span>Infinite</span>
                    </a>
                    <a className="section-nav-item" data-index="7">
                        <span className="section-nav-item-number">08</span>
                        <span>Vision</span>
                    </a>
                    <a className="section-nav-item" data-index="8">
                        <span className="section-nav-item-number">09</span>
                        <span>Contact</span>
                    </a>
                </div>
            </div>

            <div className="page-container">
                <div className="horizontal-container">
                    <div className="panels-container">
                        {/* First panel: Editorial split */}
                        <section className="panel panel-split editorial-split" data-index="0">
                            <div className="editorial-content">
                                <div className="panel-content">
                                    <div className="chapter">The Conversation</div>
                                    <h1 className="title split-text">When you look up at the stars, you're really looking at the past. Our time here is brief, but our gaze is eternal</h1>
                                    <div className="text">
                                        <p className="split-text">The vast emptiness of space offers us perspective. It reminds us how small we are in the grand scheme of things. Yet somehow, that doesn't diminish us – it elevates our existence into something miraculous.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="editorial-image">
                                <div className="image-wrapper">
                                    <img src="https://cdn.cosmos.so/996569d5-2f19-40e9-9504-af3009286f9f.jpeg" alt="Space perspective" className="parallax" data-speed="0.3" />
                                </div>
                            </div>
                        </section>

                        {/* Second panel: Full background */}
                        <section className="panel panel-full" data-index="1">
                            <div className="image-wrapper">
                                <img src="https://cdn.cosmos.so/6828e15d-6b7e-4116-ba62-99493fa821cf.jpeg" alt="Cave opening" className="panel-full-background parallax" data-speed="0.2" />
                            </div>
                            <div className="panel-full-overlay"></div>
                            <div className="panel-full-content">
                                <div className="chapter">Matthew</div>
                                <h2 className="title split-text">The universe doesn't care about our plans. It only rewards our presence</h2>
                                <div className="text">
                                    <p className="split-text">We think we know what's out there, but man, we've barely scratched the surface. It's like we're children opening our eyes for the first time. Every discovery is just the beginning of ten thousand more questions.</p>
                                </div>
                            </div>
                        </section>

                        {/* Third panel: Fixed panel */}
                        <section className="panel panel-fixed" data-index="2">
                            <div className="image-wrapper">
                                <img src="https://cdn.cosmos.so/47895928-9611-45a3-b94d-0d8ef8ac02dc.jpeg" alt="Galaxy view" className="panel-fixed-image parallax" data-speed="0.25" />
                            </div>
                            <div className="panel-fixed-content">
                                <div className="space-text">BEYOND</div>
                            </div>
                        </section>

                        {/* Fourth panel: Editorial split reversed */}
                        <section className="panel panel-split editorial-split" data-index="3">
                            <div className="editorial-image">
                                <div className="image-wrapper">
                                    <img src="https://cdn.cosmos.so/a28a9abc-6d7a-4160-a44b-2d9968c689c6.jpeg" alt="Space explorer" className="parallax" data-speed="0.3" />
                                </div>
                            </div>
                            <div className="editorial-content">
                                <div className="panel-content">
                                    <div className="chapter">Rick</div>
                                    <h2 className="title split-text">Silence is the canvas where the universe reveals itself</h2>
                                    <div className="text">
                                        <p className="split-text">There's something profound about the emptiness. It's not empty at all. It's full of potential. The space between things – that's where the magic happens. We're drawn to explore not because we want to conquer, but because we yearn to understand.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Fifth panel: Full background with COSMOS */}
                        <section className="panel panel-full" data-index="4">
                            <div className="image-wrapper">
                                <img src="https://cdn.cosmos.so/e3817e25-3312-43ea-b666-75aa0bc4b5ae.jpeg" alt="Deep space" className="panel-full-background parallax" data-speed="0.2" />
                            </div>
                            <div className="panel-full-overlay"></div>
                            <div className="panel-full-content">
                                <div className="beyond-text">COSMOS</div>
                                <div className="text">
                                    <p className="split-text">Sometimes I think about how every atom in our bodies was forged in the heart of a dying star. We're not just in the universe – the universe is in us. That connection, that's what drives us forward.</p>
                                </div>
                            </div>
                        </section>

                        {/* Sixth panel: Split with quotes */}
                        <section className="panel panel-split" data-index="5">
                            <div className="panel-left">
                                <div className="panel-content">
                                    <div className="direction-label">Matthew</div>
                                    <div className="quote-container">
                                        <div className="quote">"I've always approached the cosmos with a sense of wonder. It's like looking at your reflection in a mirror that stretches into infinity. You see yourself, but you also see beyond yourself."</div>
                                        <div className="author">INTERSTELLAR, 2014</div>
                                    </div>
                                    <div className="image-container">
                                        <div className="image-wrapper">
                                            <img src="https://cdn.cosmos.so/f22462ad-b33d-448d-aa08-cfbbbe79ef42.jpeg" alt="Space journey" className="parallax" data-speed="0.15" />
                                        </div>
                                    </div>
                                    <div className="conclusion-text">
                                        <p className="split-text">Looking out there is really looking in here. The questions we ask about the stars are really questions about ourselves.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-right">
                                <div className="panel-content">
                                    <div className="direction-label">Rick</div>
                                    <div className="quote-container">
                                        <div className="quote">"Great art creates space. Great space creates perspective. When we stand at the edge of the known, that's where true creativity begins."</div>
                                        <div className="author">CREATIVE PROCESS, 2022</div>
                                    </div>
                                    <div className="full-quote">
                                        "The universe doesn't rush, yet everything gets done. That's the paradox we're trying to understand – infinite patience paired with constant evolution."
                                    </div>
                                    <div className="text">
                                        <p className="split-text">What we discover out there transforms everything down here. Each revelation about a distant galaxy reshapes how we see ourselves on this pale blue dot.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Seventh panel: Big text with image */}
                        <section className="panel panel-full" data-index="6">
                            <div className="image-wrapper">
                                <img src="https://cdn.cosmos.so/ee8be9fb-15f6-4f3b-a13f-309cbf5453c2.jpeg" alt="Space infinite" className="panel-full-background parallax" data-speed="0.3" />
                            </div>
                            <div className="panel-full-overlay"></div>
                            <div className="panel-full-content">
                                <div className="mega-text">INFINITE</div>
                                <div className="text">
                                    <p className="split-text">The universe expands in all directions at once, infinitely complex and infinitely simple. We are but a momentary gathering of stardust, witnessing the cosmic dance.</p>
                                </div>
                            </div>
                        </section>

                        {/* Eighth panel: Video with text */}
                        <section className="panel panel-video" data-index="7">
                            <video className="video-background" autoPlay loop muted playsInline>
                                <source src="https://cdn.cosmos.so/fdfc1996-66fd-4536-8d36-0ad173a4acff.mp4" type="video/mp4" />
                            </video>
                            <div className="panel-video-overlay"></div>
                            <div className="panel-video-content">
                                <div className="mega-text">VISION</div>
                            </div>
                        </section>

                        {/* Ninth panel: Contact */}
                        <section className="panel panel-contact" data-index="8">
                            <div className="contact-container">
                                <div className="contact-content">
                                    <div className="space-text contact-name">GET IN TOUCH</div>
                                    <div className="email-wrapper">
                                        <a href="mailto:hi@filip.fyi" className="email">hi@filip.fyi</a>
                                        <button className="copy-email" title="Copy email" aria-label="Copy email to clipboard">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                            </svg>
                                        </button>
                                        <span className="copy-tooltip">Copied!</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div className="navigation">
                <div className="nav-text">SCROLL</div>
                <div className="nav-progress">
                    <div className="nav-progress-fill"></div>
                </div>
                <div className="nav-text">01 / 09</div>
            </div>
        </div>
    );
}
