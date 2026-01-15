import { useCallback } from 'react';
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
import VoiceToggle from '@/components/VoiceToggle';
import SectionVoiceTrigger from '@/components/SectionVoiceTrigger';
import { useVoiceGuide } from '@/hooks/useVoiceGuide';

const SECTION_MESSAGES = {
  about: "This is my About section. Here you can learn more about my background and what drives me as a developer.",
  skills: "Here are my technical skills. I specialize in frontend, backend, and AI technologies.",
  projects: "Check out my featured projects. Each one represents a unique challenge I've tackled.",
  blog: "I also write about technology and share my learnings in my blog.",
  achievements: "These are some of my proudest achievements and milestones.",
  experience: "Here's my professional journey and work experience.",
  contact: "Want to work together? Feel free to reach out through the contact form.",
};

const Index = () => {
  const { isEnabled, isSpeaking, isGlowing, toggleVoice, playGreeting, playSectionGuide } = useVoiceGuide();

  // Handle voice toggle with greeting
  const handleToggleVoice = useCallback(() => {
    const nowEnabled = toggleVoice();
    
    // If user just turned it ON, play greeting
    if (nowEnabled) {
      // Small delay to let the toast appear first
      setTimeout(() => {
        playGreeting();
      }, 300);
    }
  }, [toggleVoice, playGreeting]);

  // Handler for section voice triggers
  const handleSectionTrigger = useCallback((sectionId: string, message: string) => {
    playSectionGuide(sectionId, message);
  }, [playSectionGuide]);

  return (
    <ThemeProvider>
      <LoadingScreen />
      <div className="min-h-screen relative">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10">
          <HeroSection />

          <SectionVoiceTrigger sectionId="about" message={SECTION_MESSAGES.about} onTrigger={handleSectionTrigger}>
            <ScrollReveal variant="fadeUp">
              <AboutSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="skills" message={SECTION_MESSAGES.skills} onTrigger={handleSectionTrigger}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <SkillsSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="projects" message={SECTION_MESSAGES.projects} onTrigger={handleSectionTrigger}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <ProjectsSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="blog" message={SECTION_MESSAGES.blog} onTrigger={handleSectionTrigger}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <BlogSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="achievements" message={SECTION_MESSAGES.achievements} onTrigger={handleSectionTrigger}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <AchievementsSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="experience" message={SECTION_MESSAGES.experience} onTrigger={handleSectionTrigger}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <ExperienceSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="contact" message={SECTION_MESSAGES.contact} onTrigger={handleSectionTrigger}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <ContactSection />
            </ScrollReveal>
          </SectionVoiceTrigger>
        </main>
        <Footer />
      </div>
      <ScrollToTop />
      <VoiceToggle
        isEnabled={isEnabled}
        isSpeaking={isSpeaking}
        isGlowing={isGlowing}
        onToggle={handleToggleVoice}
      />
    </ThemeProvider>
  );
};

export default Index;
