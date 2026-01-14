import { useEffect } from "react";
import { VoiceGuideProvider, useVoiceGuideContext } from "@/components/VoiceGuideProvider";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import AchievementsSection from "@/components/AchievementsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionVoiceTrigger from "@/components/SectionVoiceTrigger";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollToTop from "@/components/ScrollToTop";

const IndexContent = () => {
  const { playGreeting } = useVoiceGuideContext();

  useEffect(() => {
    // Play greeting after first user interaction
    const handleClick = () => {
      playGreeting();
      window.removeEventListener("click", handleClick);
    };
    window.addEventListener("click", handleClick);
  }, [playGreeting]);

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />

        <SectionVoiceTrigger
          sectionId="about"
          message="Here you can learn more about my background, skills, and journey."
        >
          <AboutSection />
        </SectionVoiceTrigger>

        <SectionVoiceTrigger
          sectionId="skills"
          message="Here I showcase my technical skills in frontend, backend, AI and machine learning, and the tools I use."
        >
          <SkillsSection />
        </SectionVoiceTrigger>

        <SectionVoiceTrigger
          sectionId="projects"
          message="These are some of the projects where I focus on solving real-world problems using technology."
        >
          <ProjectsSection />
        </SectionVoiceTrigger>

        <SectionVoiceTrigger
          sectionId="blog"
          message="I also write about web development, AI, and my community building experiences. Check out my articles."
        >
          <BlogSection />
        </SectionVoiceTrigger>

        <SectionVoiceTrigger
          sectionId="achievements"
          message="Here are my achievements and community contributions, including founding the HackLoop developer community."
        >
          <AchievementsSection />
        </SectionVoiceTrigger>

        <SectionVoiceTrigger
          sectionId="experience"
          message="This section covers my professional journey and career path in tech."
        >
          <ExperienceSection />
        </SectionVoiceTrigger>

        <SectionVoiceTrigger
          sectionId="contact"
          message="If you'd like to collaborate or connect, you can reach me here."
        >
          <ContactSection />
        </SectionVoiceTrigger>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

const Index = () => (
  <VoiceGuideProvider>
    <IndexContent />
  </VoiceGuideProvider>
);

export default Index;
