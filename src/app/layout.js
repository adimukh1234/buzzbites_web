import "./globals.css";
import SmoothScroll from "../../components/SmoothScroll";
import FuturisticOverlay from "../../components/FuturisticOverlay";

export const metadata = {
  title: "BuzzBites",
  description: "Fine-tuning and RLHF solutions for enterprise AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Global futuristic background overlays */}
        <FuturisticOverlay opacity="low" className="z-0 fixed" />
        
        <SmoothScroll>
          <div className="relative z-10">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
