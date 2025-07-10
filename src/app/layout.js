import "./globals.css";
import "./horizontal-scroll-layout.css";
import SmoothScroll from "../../components/SmoothScroll";
import FuturisticOverlay from "../../components/FuturisticOverlay";
import PreLoader from "../../components/PreLoader";
import FullPageFooter from "../../components/FullPageFooter";

export const metadata = {
  title: "BuzzBites",
  description: "Fine-tuning and RLHF solutions for enterprise AI",
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* Preloader - The suppressHydrationWarning above helps with client/server rendering differences */}
        <PreLoader />
        
        {/* Global futuristic background overlays */}
        <FuturisticOverlay opacity="low" className="z-0 fixed" />
        
        <SmoothScroll>
          <div className="relative z-10">
            {children}
          </div>
          <FullPageFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
