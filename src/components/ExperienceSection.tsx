import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

const experiences = [
  {
    year: '2024 - Present',
    title: 'Founder & Lead',
    company: 'HackLoop Community',
    location: 'India',
    description: 'Leading a community of developers, organizing hackathons, workshops, and collaborative projects to empower tech enthusiasts.',
    highlights: ['Community Building', 'Event Management', 'Technical Leadership'],
  },
  {
    year: '2024',
    title: 'Microsoft Learn Student Ambassador',
    company: 'Microsoft',
    location: 'Remote',
    description: 'Representing Microsoft in academia, conducting workshops on Azure, AI, and cloud technologies.',
    highlights: ['Cloud Technologies', 'Workshop Facilitation', 'Student Engagement'],
  },
  {
    year: '2024',
    title: 'Core Team Member',
    company: 'Azure Developer Community',
    location: 'India',
    description: 'Contributing to cloud technology awareness and helping developers adopt Azure services.',
    highlights: ['Azure Services', 'Developer Relations', 'Technical Content'],
  },
  {
    year: '2023 - 2027',
    title: 'B.Tech Student',
    company: 'Dr. A.P.J. Abdul Kalam Technical University',
    location: 'Uttar Pradesh, India',
    description: 'Pursuing Bachelor of Technology with focus on Computer Science and AI/ML applications.',
    highlights: ['Computer Science', 'AI/ML', 'Full Stack Development'],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience & Journey</h2>
          <p className="section-subtitle mx-auto">
            My professional timeline and growth story
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/20" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 -translate-x-1/2 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>

              {/* Content Card */}
              <div className={`flex-1 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  className="glass-card-hover rounded-2xl p-6 md:p-8"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Year Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <Calendar size={14} />
                    {exp.year}
                  </div>

                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
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
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 rounded-md text-xs bg-muted text-muted-foreground"
                      >
                        {highlight}
                      </span>
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
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <div className="absolute left-4 md:left-1/2 w-12 h-12 -translate-x-1/2 rounded-full glass-card flex items-center justify-center">
              <ArrowRight className="text-primary" size={20} />
            </div>
            <div className="ml-16 md:ml-0 md:absolute md:left-1/2 md:translate-x-8 text-muted-foreground text-sm">
              More to come...
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
