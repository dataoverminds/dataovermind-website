import { Hero } from "@/components/sections/Hero";
import { DemoSection } from "@/components/sections/DemoSection";
import { Services } from "@/components/sections/Services";
import { UseCases } from "@/components/sections/UseCases";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { TechStack } from "@/components/sections/TechStack";
// import { BlogPreview } from "@/components/sections/BlogPreview"; // TODO: Re-enable when Sanity blog is ready
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <DemoSection />
      <Services />
      <UseCases />
      <HowItWorks />
      <CaseStudies />
      <TechStack />
      {/* <BlogPreview /> */}
      <CTA />
    </>
  );
}
