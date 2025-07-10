'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function HorizontalScrollLayoutGSAP() {
    const containerRef = useRef(null);
    const panelsContainerRef = useRef(null);
    const progressRef = useRef(null);
    const navigationRef = useRef(null);

    useEffect(() => {
        // Wait for DOM to be ready
        const initGSAPScrollTrigger = () => {
            const panels = document.querySelectorAll(".panel");
            const panelsContainer = panelsContainerRef.current;
            const progressFill = progressRef.current;
            const navigation = navigationRef.current;
            const parallaxElements = document.querySelectorAll(".parallax");
            const copyEmailBtn = document.querySelector(".copy-email");
            const copyTooltip = document.querySelector(".copy-tooltip");

            if (!panels.length || !panelsContainer) return;

            // Set up horizontal scroll accounting for navbar
            const getAvailableWidth = () => {
                if (window.innerWidth >= 1024) {
                    return window.innerWidth - 96; // lg:w-24 = 96px
                } else if (window.innerWidth >= 768) {
                    return window.innerWidth - 80; // w-20 = 80px
                } else {
                    return window.innerWidth; // Full width on mobile (margin handles spacing)
                }
            };
            
            const availableWidth = getAvailableWidth();
            const totalWidth = panels.length * availableWidth;
            const moveDistance = totalWidth - availableWidth;

            // Create the main horizontal scroll animation
            const horizontalTl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: () => `+=${totalWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        // Update progress bar
                        if (progressFill) {
                            gsap.set(progressFill, { scaleX: self.progress });
                        }
                        
                        // Update page counter
                        const currentPanelIndex = Math.round(self.progress * (panels.length - 1)) + 1;
                        const navText = document.querySelectorAll(".nav-text")[1];
                        if (navText) {
                            const formattedIndex = currentPanelIndex.toString().padStart(2, "0");
                            const totalPanels = panels.length.toString().padStart(2, "0");
                            navText.textContent = `${formattedIndex} / ${totalPanels}`;
                        }

                        // Update active panels
                        panels.forEach((panel, index) => {
                            const panelProgress = (self.progress * (panels.length - 1)) - index;
                            const isActive = Math.abs(panelProgress) < 0.5;
                            const isVisited = panelProgress > 0.5;
                            
                            panel.classList.toggle("active", isActive);
                            panel.classList.toggle("visited", isVisited);
                        });
                    }
                }
            });

            // Animate the horizontal movement
            horizontalTl.to(panelsContainer, {
                x: -moveDistance,
                ease: "none",
                duration: 1
            });

            // Set up parallax effects for images
            parallaxElements.forEach((element) => {
                gsap.fromTo(element, 
                    { x: "-20%" },
                    {
                        x: "20%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: element.closest('.panel'),
                            start: "left right",
                            end: "right left",
                            scrub: true,
                            containerAnimation: horizontalTl,
                            invalidateOnRefresh: true
                        }
                    }
                );
            });

            // Animate panel content on entry
            panels.forEach((panel, index) => {
                const content = panel.querySelector('.panel-content, .panel-full-content, .panel-video-content, .contact-content');
                const words = panel.querySelectorAll('.word');
                
                if (content) {
                    // First panel should be immediately visible
                    if (index === 0) {
                        gsap.set(content, { opacity: 1, y: 0 });
                        // Animate in with a short delay for better UX
                        gsap.fromTo(content, 
                            { opacity: 0, y: 30 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 1,
                                ease: "power2.out",
                                delay: 0.3
                            }
                        );
                    } else {
                        // Other panels animate on scroll
                        gsap.fromTo(content, 
                            { opacity: 0, y: 50 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: panel,
                                    start: "left center",
                                    end: "center center",
                                    containerAnimation: horizontalTl,
                                    toggleActions: "play reverse play reverse"
                                }
                            }
                        );
                    }
                }

                // Animate words with stagger
                if (words.length) {
                    // First panel words should be immediately visible with stagger animation
                    if (index === 0) {
                        gsap.set(words, { opacity: 1, y: 0 });
                        // Animate in with stagger for a nice effect
                        gsap.fromTo(words, 
                            { opacity: 0, y: 15 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.6,
                                ease: "power2.out",
                                stagger: 0.05,
                                delay: 0.6
                            }
                        );
                    } else {
                        // Other panels animate on scroll
                        gsap.fromTo(words, 
                            { opacity: 0, y: 20 },
                            {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                ease: "power2.out",
                                stagger: 0.03,
                                scrollTrigger: {
                                    trigger: panel,
                                    start: "left center",
                                    end: "center center",
                                    containerAnimation: horizontalTl,
                                    toggleActions: "play reverse play reverse"
                                }
                            }
                        );
                    }
                }
            });

            // Set panel widths
            gsap.set(panels, { width: "100vw" });

            // Copy email functionality
            if (copyEmailBtn && copyTooltip) {
                copyEmailBtn.addEventListener("click", () => {
                    navigator.clipboard.writeText("hello@buzzbites.in").then(() => {
                        gsap.set(copyTooltip, { opacity: 1, visibility: "visible" });
                        gsap.to(copyTooltip, {
                            opacity: 0,
                            visibility: "hidden",
                            duration: 0.3,
                            delay: 2
                        });
                    });
                });
            }

            // Split text animation setup
            const splitTexts = document.querySelectorAll(".split-text");
            splitTexts.forEach((text) => {
                const words = text.textContent.split(" ");
                text.innerHTML = words
                    .map((word) => `<span class="word">${word}</span>`)
                    .join(" ");
            });

            // Initialize parallax images
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

            // Video background setup
            const videoBackground = document.querySelector(".video-background");
            if (videoBackground) {
                videoBackground.playbackRate = 0.6;
            }

            // Show navigation with animation
            if (navigation) {
                gsap.to(navigation, {
                    opacity: 1,
                    duration: 0.6,
                    delay: 0.5,
                    ease: "power2.out"
                });
            }

            // Refresh ScrollTrigger on resize
            const handleResize = () => {
                ScrollTrigger.refresh();
            };

            window.addEventListener('resize', handleResize);

            // Cleanup function
            return () => {
                window.removeEventListener('resize', handleResize);
                ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            };
        };

        // Initialize with a small delay to ensure DOM is ready
        const timeoutId = setTimeout(initGSAPScrollTrigger, 100);

        return () => {
            clearTimeout(timeoutId);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="horizontal-scroll-layout" ref={containerRef}>
            <div className="page-container">
                <div className="horizontal-container">
                    <div className="panels-container" ref={panelsContainerRef}>
                        {/* First panel: Editorial split */}
                        <section className="panel panel-split editorial-split" data-index="0">
                            <div className="editorial-content">
                                <div className="panel-content">
                                    <div className="chapter">Our Journey</div>
                                    <h1 className="title split-text">From Digital Media Roots to Product-First Vision</h1>
                                    <div className="text">
                                        <p className="split-text">Every step in our journey has been about learning, building, and evolving. From creating digital media platforms to launching our flagship product — here's how Buzzbites became what it is today.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="editorial-image">
                                <div className="image-wrapper">
                                    <img src="/journey-hero-image.jpg" alt="Buzzbites Journey Timeline" className="parallax" data-speed="0.3" />
                                </div>
                            </div>
                        </section>

                        {/* Second panel: Full background with content */}
                        <section className="panel panel-full" data-index="1">
                            <div className="image-wrapper">
                                <img src="/foundation-2018.jpg" alt="Buzzbites Foundation 2018" className="panel-full-background parallax" data-speed="0.2" />
                            </div>
                            <div className="panel-full-overlay"></div>
                            <div className="panel-full-content">
                                <div className="chapter">2018</div>
                                <h2 className="title split-text">The Foundation</h2>
                                <div className="text">
                                    <p className="split-text">Buzzbites Media & Entertainment Pvt. Ltd. is born in Kolkata. Founded by Shawli Mukherjee and Swaroop Saha with a shared vision: build digital-first platforms that blend creativity with technology.</p>
                                </div>
                            </div>
                        </section>

                        {/* Third panel: Fixed background with big text */}
                        <section className="panel panel-fixed" data-index="2">
                            <div className="image-wrapper">
                                <img src="/media-tech-2019.jpg" alt="Media Tech Platforms 2019" className="panel-fixed-image parallax" data-speed="0.25" />
                            </div>
                            <div className="panel-fixed-content">
                                <div className="space-text">2019</div>
                            </div>
                        </section>

                        {/* Fourth panel: Editorial split (reversed) */}
                        <section className="panel panel-split editorial-split" data-index="3">
                            <div className="editorial-image">
                                <div className="image-wrapper">
                                    <img src="/media-tech-chapter.jpg" alt="The Media-Tech Chapter" className="parallax" data-speed="0.3" />
                                </div>
                            </div>
                            <div className="editorial-content">
                                <div className="panel-content">
                                    <div className="chapter">The Media-Tech Chapter</div>
                                    <h2 className="title split-text">Launched first media-tech platforms for OTT and video-on-demand</h2>
                                    <div className="text">
                                        <p className="split-text">Building custom OTT apps for local and regional content providers. We focused on creating seamless digital experiences that brought entertainment directly to users across diverse platforms and devices.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Fifth panel: Full background with big text */}
                        <section className="panel panel-full" data-index="4">
                            <div className="image-wrapper">
                                <img src="/al-scaling-2020.jpg" alt="Regional Platforms Scaling 2020" className="panel-full-background parallax" data-speed="0.2" />
                            </div>
                            <div className="panel-full-overlay"></div>
                            <div className="panel-full-content">
                                <div className="beyond-text">2020</div>
                                <div className="text">
                                    <p className="split-text">Buzzbites supported multiple small-to-mid scale OTT businesses with full-stack development. We focused on solving tech gaps in entertainment delivery across India.</p>
                                </div>
                            </div>
                        </section>

                        {/* Sixth panel: Split panel with dialogue */}
                        <section className="panel panel-split" data-index="5">
                            <div className="panel-left">
                                <div className="panel-content">
                                    <div className="direction-label">2021</div>
                                    <div className="quote-container">
                                        <div className="quote">"Strategic Pivot: Buzzbites shifts from service-driven to product-first strategy. An early concept for Instacon was born — targeting field-force visibility."</div>
                                        <div className="author">THE STRATEGIC PIVOT</div>
                                    </div>
                                    <div className="image-container">
                                        <div className="image-wrapper">
                                            <img src="/strategic-pivot-2021.png" alt="Strategic Pivot 2021" className="parallax" data-speed="0.15" />
                                        </div>
                                    </div>
                                    <div className="conclusion-text">
                                        <p className="split-text">The pivot marked a fundamental shift in our approach - from building solutions for others to creating our own innovative product.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-right">
                                <div className="panel-content">
                                    <div className="direction-label">2022</div>
                                    <div className="qregionuote-container">
                                        <div className="quote">"MVP of Instacon launched for internal pilots with GPS attendance and real-time location tracking capabilities."</div>
                                        <div className="author">INSTACON LAUNCHES</div>
                                    </div>
                                    <div className="full-quote">
                                        "The first version of Instacon represented our vision coming to life - a tool that would revolutionize workforce management and field-force visibility."
                                    </div>
                                    <div className="text">
                                        <p className="split-text">From concept to reality, Instacon emerged as our flagship product, designed to solve real-world challenges in workforce tracking and management.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Seventh panel: Big text with image */}
                        <section className="panel panel-full" data-index="6">
                            <div className="image-wrapper">
                                <img src="/adoption-momentum-2023.jpg" alt="Adoption and Momentum 2023" className="panel-full-background parallax" data-speed="0.3" />
                            </div>
                            <div className="panel-full-overlay"></div>
                            <div className="panel-full-content">
                                <div className="mega-text">2023</div>
                                <div className="text">
                                    <p className="split-text">Instacon goes live on App Store and Google Play. Gathers strong early traction from SME clients across Pharma, FMCG, and field sales teams.</p>
                                </div>
                            </div>
                        </section>

                        {/* Eighth panel: Video with text */}
                        <section className="panel panel-video" data-index="7">
                            <video className="video-background" autoPlay loop muted playsInline>
                                <source src="/buzzbites-2024-success.mp4" type="video/mp4" />
                            </video>
                            <div className="panel-video-overlay"></div>
                            <div className="panel-video-content">
                                <div className="mega-text">2024</div>
                            </div>
                        </section>

                        {/* Ninth panel: Contact */}
                        <section className="panel panel-contact" data-index="8">
                            <div className="contact-container">
                                <div className="contact-content">
                                    <div className="space-text contact-name">THE NEXT CHAPTER</div>
                                    <div className="email-wrapper">
                                        <a href="mailto:hello@buzzbites.in" className="email">hello@buzzbites.in</a>
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

            {/* Navigation */}
            <div className="navigation" ref={navigationRef}>
                <div className="nav-text">SCROLL</div>
                <div className="nav-progress">
                    <div className="nav-progress-fill" ref={progressRef}></div>
                </div>
                <div className="nav-text">01 / 09</div>
            </div>
        </div>
    );
}
