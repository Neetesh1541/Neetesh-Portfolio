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

const Index = () => {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <div className="min-h-screen relative">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10">
          <HeroSection />

          <ScrollReveal variant="fadeUp">
            <AboutSection />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <SkillsSection />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <ProjectsSection />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <BlogSection />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <AchievementsSection />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <ExperienceSection />
          </ScrollReveal>

          <ScrollReveal variant="fadeUp" delay={0.1}>
            <ContactSection />
          </ScrollReveal>
        </main>
        <Footer />
      </div>
      <ScrollToTop />
    </ThemeProvider>
  );
};

export default Index;
