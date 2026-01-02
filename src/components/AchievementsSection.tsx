import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Users, Award, Star, Rocket, Globe } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: '5th Position',
    subtitle: 'Startup Hackathon',
    description: 'Mummy Meals project recognized for innovation',
    color: 'text-yellow-400',
  },
  {
    icon: Rocket,
    title: 'Founder',
    subtitle: 'HackLoop Community',
    description: 'Building a thriving developer community',
    color: 'text-primary',
  },
  {
    icon: Users,
    title: 'Core Team',
    subtitle: 'Azure Developer Community',
    description: 'Contributing to cloud technology awareness',
    color: 'text-blue-400',
  },
  {
    icon: Globe,
    title: 'Member',
    subtitle: 'GDG Gurgaon & GDG Noida',
    description: 'Active in Google Developer Groups',
    color: 'text-green-400',
  },
  {
    icon: Award,
    title: 'MLSA',
    subtitle: 'Microsoft Learn Student Ambassador',
    description: 'Representing Microsoft in academia',
    color: 'text-orange-400',
  },
];

const stats = [
  { value: '5+', label: 'Projects Shipped' },
  { value: '2500+', label: 'Community Members' },
  { value: '15+', label: 'Events Organized' },
  { value: '2+', label: 'Years Experience' },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="achievements" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Achievements & Community</h2>
          <p className="section-subtitle mx-auto">
            Recognition and contributions to the tech ecosystem
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card rounded-2xl p-6 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="glass-card-hover rounded-2xl p-6 group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl glass-card group-hover:scale-110 transition-transform">
                  <achievement.icon size={28} className={achievement.color} />
                </div>
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
            </motion.div>
          ))}
        </div>

        {/* Community Highlight */}
        <motion.div
          className="mt-16 glass-card rounded-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Star className="text-yellow-400" size={20} />
              <span className="text-sm font-medium">Featured Community</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
              <span className="gradient-text">HackLoop Community</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              A vibrant community of developers, learners, and tech enthusiasts collaborating 
              to build innovative projects, share knowledge, and grow together in the tech ecosystem.
            </p>
            <motion.a
              href="https://www.hackloop.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-glow inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Rocket size={18} />
              Join HackLoop
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
