import type React from "react";
import Hero from "../components/HeroSection";
import BatchCard from "../components/BatchCard";
import FooterSection from "../components/FooterSection";

const LandingPage: React.FC = () => {
    return (
        <div>
            <Hero />
            <BatchCard />
            <FooterSection />
        </div>
    )
}
export default LandingPage;