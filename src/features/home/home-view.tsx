import { FeaturesSection } from "./components/features-section";
import { FuneralTypeSelection } from "./components/funeral-type-selection";
import { HeroSection } from "./components/hero-section";
import { TestimonialsSection } from "./components/testimonials-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FuneralTypeSelection />
      <FeaturesSection />
      <TestimonialsSection />
    </>
  );
}
