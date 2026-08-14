import { useCallback } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import CodeBackground from '@/components/CodeBackground';
import Scene3DBackground from '@/components/Scene3DBackground';
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
import AIChatbot from '@/components/AIChatbot';
import { VoiceGuideProvider, useVoiceGuideContext } from '@/components/VoiceGuideProvider';

const SECTION_MESSAGES = {
  about: "This is my About section. Here you can learn more about my background as an AI and Data Science engineer.",
  skills: "Here are my technical skills. I specialize in machine learning, deep learning, data science and the engineering around them.",
  projects: "Check out my featured projects. Each one solves a real problem with data and models.",
  blog: "I also write about AI, machine learning and data science, and share my learnings in my blog.",
  achievements: "These are some of my proudest achievements and milestones.",
  experience: "Here's my professional journey and work experience.",
  contact: "Want to build something with data and AI? Feel free to reach out through the contact form.",
};


const IndexContent = () => {
  const { isEnabled, isSpeaking, isGlowing, toggleVoice, playGreeting } = useVoiceGuideContext();

  const handleToggleVoice = useCallback(() => {
    const nowEnabled = toggleVoice();
    
    if (nowEnabled) {
      setTimeout(() => {
        playGreeting();
      }, 300);
    }
  }, [toggleVoice, playGreeting]);

  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen relative">
        <div className="premium-bg" aria-hidden="true" />
        <CodeBackground />
        <Scene3DBackground />
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10">
          <HeroSection />

          <SectionVoiceTrigger sectionId="about" message={SECTION_MESSAGES.about}>
            <ScrollReveal variant="fadeUp">
              <AboutSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="skills" message={SECTION_MESSAGES.skills}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <SkillsSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="projects" message={SECTION_MESSAGES.projects}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <ProjectsSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="blog" message={SECTION_MESSAGES.blog}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <BlogSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="achievements" message={SECTION_MESSAGES.achievements}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <AchievementsSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="experience" message={SECTION_MESSAGES.experience}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <ExperienceSection />
            </ScrollReveal>
          </SectionVoiceTrigger>

          <SectionVoiceTrigger sectionId="contact" message={SECTION_MESSAGES.contact}>
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <ContactSection />
            </ScrollReveal>
          </SectionVoiceTrigger>
        </main>
        <Footer />
      </div>
      <ScrollToTop />
      <AIChatbot />
      <VoiceToggle
        isEnabled={isEnabled}
        isSpeaking={isSpeaking}
        isGlowing={isGlowing}
        onToggle={handleToggleVoice}
      />
    </>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <VoiceGuideProvider>
        <IndexContent />
      </VoiceGuideProvider>
    </ThemeProvider>
  );
};

export default Index;
