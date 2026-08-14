import { motion, useReducedMotion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, BrainCircuit, LineChart, Database, Cpu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import profilePhoto from '@/assets/profile-photo-new.png';
import { useVoiceGuideContext } from '@/components/VoiceGuideProvider';
import MouthOverlay from '@/components/MouthOverlay';
import {
  DEFAULT_MOUTH,
  detectMouth,
  loadDetected,
  saveDetected,
  type MouthBox,
} from '@/lib/mouth-calibration';

const HeroSection = () => {
  const { isSpeaking } = useVoiceGuideContext();
  const reduceMotion = useReducedMotion();
  const imgRef = useRef<HTMLImageElement>(null);
  const [detectedBox, setDetectedBox] = useState<MouthBox | null>(() =>
    loadDetected(profilePhoto)
  );

  // Resolution priority: face-landmark detection → default.
  const box: MouthBox = detectedBox ?? DEFAULT_MOUTH;

  // Run MediaPipe detection once per profile photo, cache the result.
  useEffect(() => {
    if (detectedBox || !imgRef.current) return;
    let cancelled = false;
    const run = async () => {
      const el = imgRef.current;
      if (!el) return;
      const result = await detectMouth(el);
      if (cancelled || !result) return;
      saveDetected(profilePhoto, result);
      setDetectedBox(result);
    };
    if (imgRef.current.complete) {
      run();
    } else {
      imgRef.current.addEventListener('load', run, { once: true });
    }
    return () => {
      cancelled = true;
    };
  }, [detectedBox]);

  return (

    <section className="min-h-[100svh] flex items-center justify-center relative overflow-hidden pt-24 pb-16 px-4 sm:px-6">
      {/* Minimal background shapes - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <motion.div
          className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-primary/40"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-[15%] w-2 h-2 rounded-full bg-secondary/40"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Text Content */}
          <motion.div
            id="hero-copy"
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              <motion.span
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-primary"
              >
                <BrainCircuit size={16} />
              </motion.span>
              <span className="text-primary text-sm font-medium relative z-10 tracking-wide">
                AI / ML &amp; Data Science Engineer
              </span>
            </motion.div>


            <motion.h1 
              className="text-[2.25rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Hi, I'm{' '}
              <motion.span 
                className="gradient-text inline-block"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Neetesh Kumar
              </motion.span>
            </motion.h1>

            <motion.div 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 min-h-[5rem] md:min-h-[4rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <TypeAnimation
                sequence={[
                  'Turning Data Into Intelligent Decisions',
                  3000,
                  'AI / ML Engineer',
                  2000,
                  'Data Scientist',
                  2000,
                  'Deep Learning & NLP',
                  2000,
                  'MLOps & Data Engineering',
                  2000,
                  'Founder of HackLoop Community',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="glow-text"
              />
            </motion.div>

            <motion.p 
              className="text-muted-foreground text-base sm:text-lg mb-6 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              I build and ship machine learning systems end to end — from data pipelines and
              feature engineering to model training, evaluation and production deployment.
            </motion.p>

            {/* Specialization chips */}
            <motion.div
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {[
                { icon: BrainCircuit, label: 'Deep Learning' },
                { icon: LineChart, label: 'Predictive Analytics' },
                { icon: Database, label: 'Data Engineering' },
                { icon: Cpu, label: 'LLMs & RAG' },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs sm:text-sm text-muted-foreground"
                >
                  <Icon size={14} className="text-primary" />
                  {label}
                </span>
              ))}
            </motion.div>


            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <motion.a
                href="#projects"
                className="btn-primary-glow group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={18} />
                  View My Work
                </span>
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-glass group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Mail size={18} className="group-hover:rotate-12 transition-transform" />
                  Get In Touch
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {[
                { icon: Github, href: 'https://github.com/neetesh1541', label: 'GitHub', color: 'hover:text-white' },
                { icon: Linkedin, href: 'https://in.linkedin.com/in/neetesh-kumar-846616287', label: 'LinkedIn', color: 'hover:text-blue-400' },
                { icon: Mail, href: 'mailto:neeteshk1104@gmail.com', label: 'Email', color: 'hover:text-primary' },
              ].map(({ icon: Icon, href, label, color }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full glass-card hover:border-primary/50 transition-all ${color} group`}
                  whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  aria-label={label}
                >
                  <Icon size={20} className="text-muted-foreground group-hover:text-inherit transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Layered aurora glow behind the photo (no hard circle frame) */}
              <motion.div 
                className="absolute inset-0 blur-3xl -z-10"
                style={{
                  background:
                    'radial-gradient(circle at 50% 58%, hsl(var(--secondary) / 0.5), hsl(var(--primary) / 0.28) 42%, transparent 72%)',
                }}
                animate={{ 
                  opacity: [0.5, 0.85, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Neural orbit rings — subtle, AI/ML flavoured */}
              {!reduceMotion && (
                <>
                  <motion.div
                    className="absolute left-1/2 top-1/2 -z-10 w-[19rem] h-[19rem] sm:w-[23rem] sm:h-[23rem] lg:w-[32rem] lg:h-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/25"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-1/2 -z-10 w-[15rem] h-[15rem] sm:w-[18rem] sm:h-[18rem] lg:w-[25rem] lg:h-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                  >
                    <span className="absolute -top-1 left-1/2 w-2 h-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
                    <span className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 -translate-x-1/2 rounded-full bg-secondary shadow-[0_0_12px_hsl(var(--secondary))]" />
                  </motion.div>
                </>
              )}

              {/* Image with subtle speaking motion (disabled when reduced-motion) */}
              <motion.div
                className="relative"
                animate={
                  reduceMotion
                    ? { y: 0 }
                    : isSpeaking
                    ? { y: [0, -1.5, 0.5, -1, 0] }
                    : { y: [0, -10, 0] }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : isSpeaking
                    ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                    : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
                }
              >
                <motion.img
                  ref={imgRef}
                  src={profilePhoto}
                  alt="Neetesh Kumar — AI/ML and Data Science engineer"
                  crossOrigin="anonymous"
                  className="relative w-[19rem] h-[19rem] sm:w-[24rem] sm:h-[24rem] md:w-[28rem] md:h-[28rem] lg:w-[34rem] lg:h-[34rem] object-contain drop-shadow-[0_30px_60px_hsl(var(--secondary)/0.35)]"
                />

                {/* Amplitude-driven lip-sync overlay */}
                <MouthOverlay
                  box={box}
                  active={isSpeaking}
                  debug={false}
                />
              </motion.div>

              {/* Floating metric card */}
              <motion.div
                className="absolute top-6 -left-2 sm:left-0 glass-card rounded-xl px-3 py-2 z-10 hidden sm:block"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="flex items-center gap-2">
                  <BrainCircuit size={16} className="text-primary" />
                  <div className="leading-tight">
                    <p className="text-xs font-semibold">Model Accuracy</p>
                    <p className="text-[11px] text-muted-foreground font-mono">96.4% · F1 0.94</p>
                  </div>
                </div>
              </motion.div>





              {/* Stats badge - hidden on small mobile */}
              <motion.div
                className="absolute -bottom-2 right-0 glass-card rounded-xl px-4 py-2 z-10 hidden sm:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-primary' : 'bg-green-500'} animate-pulse`} />
                  <span className="text-xs text-muted-foreground">
                    {isSpeaking ? 'Speaking...' : 'Available for hire'}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - hidden on mobile */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm">Scroll Down</span>
            <motion.div
              className="relative"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
              <motion.div
                className="absolute inset-0 blur-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown size={20} className="text-primary" />
              </motion.div>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
