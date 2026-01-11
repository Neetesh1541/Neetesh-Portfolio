import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import AchievementsSection from '@/components/AchievementsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollReveal from '@/components/ScrollReveal';
import ScrollToTop from '@/components/ScrollToTop';
import VoiceGuideProvider from '@/components/VoiceGuideProvider';
import SectionVoiceTrigger from '@/components/SectionVoiceTrigger';

const Index = () => {
  return (
    <ThemeProvider>
      <VoiceGuideProvider>
        <LoadingScreen />
        <div className="min-h-screen relative">
          <ParticleBackground />
          <Navbar />
          <main className="relative z-10">
            <HeroSection />
            
            <SectionVoiceTrigger
              sectionId="about"
              message="Here you can learn more about my background, skills, and journey."
            >
              <ScrollReveal variant="fadeUp">
                <AboutSection />
              </ScrollReveal>
            </SectionVoiceTrigger>
            
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <SkillsSection />
            </ScrollReveal>
            
            <SectionVoiceTrigger
              sectionId="projects"
              message="These are some of the projects where I focus on solving real-world problems using technology."
            >
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <ProjectsSection />
              </ScrollReveal>
            </SectionVoiceTrigger>
            
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <BlogSection />
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <AchievementsSection />
            </ScrollReveal>
            
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <ExperienceSection />
            </ScrollReveal>
            
            <SectionVoiceTrigger
              sectionId="contact"
              message="If you'd like to collaborate or connect, you can reach me here."
            >
              <ScrollReveal variant="fadeUp" delay={0.1}>
                <ContactSection />
              </ScrollReveal>
            </SectionVoiceTrigger>
          </main>
          <Footer />
        </div>
        <ScrollToTop />
      </VoiceGuideProvider>
    </ThemeProvider>
  );
};

export default Index;
