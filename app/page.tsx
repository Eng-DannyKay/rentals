import BestDealSection from "./(home)/sections/bestDealSection";
import BestSellerSection from "./(home)/sections/bestSellerSection";
import BrandSection from "./(home)/sections/brandSection";
import { CallToActionSection } from "./(home)/sections/callToActionSection";
import HeroSection from "./(home)/sections/heroSection";
import { ServicesSection } from "./(home)/sections/serviceSection";
import { TestimonialsSection } from "./(home)/sections/testimonialsSection";
import RentalsBrandSection from "./(home)/sections/wheelsBrandSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BrandSection />
      <BestSellerSection />
      <BestDealSection />
      <ServicesSection />
      <TestimonialsSection />
      <RentalsBrandSection />
      <CallToActionSection />
    </div>
  );
}
