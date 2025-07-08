'use client';

import React from "react";
import Story from "../../../components/Story";
import NavBar from "../../../components/NavBar";

export default function JourneyPage() {
    return (
        <div className="md:ml-20 lg:ml-24 w-full h-screen">
            <style jsx global>{`
                body {
                    cursor: default;
                }
                .story-area {
                    cursor: none;
                    width: 100%;
                    height: 100vh;
                }
            `}</style>
            <NavBar />
            <div className="story-area">
                <Story />
            </div>
        </div>
    );
}

