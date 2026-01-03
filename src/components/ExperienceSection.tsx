import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, ArrowRight, Briefcase, GraduationCap, Award, Rocket } from 'lucide-react';

const experiences = [
  {
    year: '2024 - Present',
    title: 'Founder & Lead',
    company: 'HackLoop Community',
    location: 'India',
    description: 'Leading a community of developers, organizing hackathons, workshops, and collaborative projects to empower tech enthusiasts.',
    highlights: ['Community Building', 'Event Management', 'Technical Leadership'],
    icon: Rocket,
    color: 'from-primary to-secondary',
  },
  {
    year: '2024',
    title: 'Microsoft Learn Student Ambassador',
    company: 'Microsoft',
    location: 'Remote',
    description: 'Representing Microsoft in academia, conducting workshops on Azure, AI, and cloud technologies.',
    highlights: ['Cloud Technologies', 'Workshop Facilitation', 'Student Engagement'],
    icon: Award,
    color: 'from-orange-400 to-red-500',
  },
  {
    year: '2024',
    title: 'Core Team Member',
    company: 'Azure Developer Community',
    location: 'India',
    description: 'Contributing to cloud technology awareness and helping developers adopt Azure services.',
    highlights: ['Azure Services', 'Developer Relations', 'Technical Content'],
    icon: Briefcase,
    color: 'from-blue-400 to-cyan-500',
  },
  {
    year: '2023 - 2027',
    title: 'B.Tech Student',
    company: 'Dr. A.P.J. Abdul Kalam Technical University',
    location: 'Uttar Pradesh, India',
    description: 'Pursuing Bachelor of Technology with focus on Computer Science and AI/ML applications.',
    highlights: ['Computer Science', 'AI/ML', 'Full Stack Development'],
    icon: GraduationCap,
    color: 'from-green-400 to-emerald-500',
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{ x: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"
          animate={{ x: [0, 30, 0], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 10, repeat: Infinity }}
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
            <Briefcase className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Career Path</span>
          </motion.div>
          <h2 className="section-title">Experience & Journey</h2>
          <p className="section-subtitle mx-auto">
            My professional timeline and growth story
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated Vertical Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px overflow-hidden"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            <div className="w-full h-full bg-gradient-to-b from-primary via-secondary to-primary/20" />
            {/* Animated pulse traveling down the line */}
            <motion.div
              className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-white/50 to-transparent"
              animate={{ top: ['-20%', '120%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline Node */}
              <motion.div 
                className="absolute left-4 md:left-1/2 w-10 h-10 -translate-x-1/2 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.2, type: 'spring' }}
              >
                <motion.div 
                  className="w-3 h-3 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
              </motion.div>

              {/* Content Card */}
              <div className={`flex-1 ml-14 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                <motion.div
                  className="glass-card-hover rounded-2xl p-6 md:p-8 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  {/* Icon badge */}
                  <motion.div
                    className={`absolute -top-3 -right-3 w-12 h-12 rounded-xl bg-gradient-to-br ${exp.color} flex items-center justify-center shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <exp.icon size={20} className="text-white" />
                  </motion.div>

                  {/* Year Badge */}
                  <motion.div 
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar size={14} />
                    {exp.year}
                  </motion.div>

                  <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="text-primary font-medium">{exp.company}</span>
                    <span className="flex items-center gap-1 text-muted-foreground text-sm">
                      <MapPin size={14} />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <motion.span
                        key={highlight}
                        className="px-3 py-1 rounded-md text-xs bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.2 + i * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {highlight}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}

          {/* End Node */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.2, type: 'spring' }}
          >
            <motion.div 
              className="absolute left-4 md:left-1/2 w-14 h-14 -translate-x-1/2 rounded-full glass-card flex items-center justify-center"
              animate={{ 
                boxShadow: ['0 0 0 0 hsl(var(--primary) / 0.3)', '0 0 0 15px hsl(var(--primary) / 0)', '0 0 0 0 hsl(var(--primary) / 0.3)']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <ArrowRight className="text-primary" size={24} />
              </motion.div>
            </motion.div>
            <motion.div 
              className="ml-20 md:ml-0 md:absolute md:left-1/2 md:translate-x-12 text-muted-foreground text-sm font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              More to come...
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
