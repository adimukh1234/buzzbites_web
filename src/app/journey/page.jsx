'use client';

import React from "react";
import Story from "../../../components/Story";
import NavBar from "../../../components/NavBar";

export default function JourneyPage() {
    // Add global styles to hide the default cursor when on Story
    // but show it when on NavBar
    const pageStyle = {
        position: "relative",
        width: "100%",
        height: "100%"
    };
    
    return (
        <div style={pageStyle}>
            <style jsx global>{`
                body {
                    cursor: default;
                }
                .story-area {
                    cursor: none;
                }
            `}</style>
            <NavBar />
            <div className="story-area">
                <Story />
            </div>
        </div>
    );
}

