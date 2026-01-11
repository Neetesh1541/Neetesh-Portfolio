import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Trophy, Users, Award, Star, Rocket, Globe, TrendingUp } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: '5th Position',
    subtitle: 'Startup Hackathon',
    description: 'Mummy Meals project recognized for innovation',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
  },
  {
    icon: Rocket,
    title: 'Founder',
    subtitle: 'HackLoop Community',
    description: 'Building a thriving developer community',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Users,
    title: 'Core Team',
    subtitle: 'Azure Developer Community',
    description: 'Contributing to cloud technology awareness',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    icon: Globe,
    title: 'Member',
    subtitle: 'GDG Gurgaon & GDG Noida',
    description: 'Active in Google Developer Groups',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
  {
    icon: Award,
    title: 'MLSA',
    subtitle: 'Microsoft Learn Student Ambassador',
    description: 'Representing Microsoft in academia',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
  },
];

const stats = [
  { value: 5, suffix: '+', label: 'Projects Shipped', icon: Rocket },
  { value: 2500, suffix: '+', label: 'Community Members', icon: Users },
  { value: 15, suffix: '+', label: 'Events Organized', icon: Trophy },
  { value: 2, suffix: '+', label: 'Years Experience', icon: TrendingUp },
];

const AnimatedCounter = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  
  return <span>{displayValue.toLocaleString()}{suffix}</span>;
};

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-primary">Milestones</span>
          </motion.div>
          <h2 className="section-title">Achievements & Community</h2>
          <p className="section-subtitle mx-auto">
            Recognition and contributions to the tech ecosystem
          </p>
        </motion.div>

        {/* Stats Grid with Animated Counters */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center relative overflow-hidden group"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.1 }}
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3 opacity-50" />
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
              
              {/* Animated border */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : {}}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="glass-card-hover rounded-2xl p-6 group relative overflow-hidden"
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Background gradient on hover */}
              <motion.div
                className={`absolute inset-0 ${achievement.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              
              <div className="relative z-10 flex items-start gap-4">
                <motion.div 
                  className="p-4 rounded-xl glass-card"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <achievement.icon size={28} className={achievement.color} />
                </motion.div>
                <div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-2">
                    {achievement.subtitle}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {achievement.description}
                  </p>
                </div>
              </div>
              
              {/* Decorative corner */}
              <motion.div
                className={`absolute top-0 right-0 w-16 h-16 ${achievement.bgColor} rounded-bl-3xl opacity-50`}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Community Highlight */}
        <motion.div
          className="mt-16 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Animated Background Glow */}
          <motion.div 
            className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30"
              style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
          
          <div className="relative z-10 text-center">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="text-yellow-400" size={20} />
              <span className="text-sm font-medium">Featured Community</span>
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <motion.span 
                className="gradient-text"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                HackLoop Community
              </motion.span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              A vibrant community of developers, learners, and tech enthusiasts collaborating 
              to build innovative projects, share knowledge, and grow together in the tech ecosystem.
            </p>
            <motion.a
              href="https://www.hackloop.me"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-glow inline-flex items-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Rocket size={18} />
              <span className="relative z-10">Join HackLoop</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
