import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Frontend',
    color: 'from-cyan-400 to-blue-500',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    color: 'from-green-400 to-emerald-500',
    skills: ['Python', 'Flask', 'Django', 'Node.js', 'REST APIs', 'Databases'],
  },
  {
    title: 'AI/ML',
    color: 'from-violet-400 to-purple-500',
    skills: ['NLP', 'Computer Vision', 'Deep Learning', 'TensorFlow', 'OpenCV', 'ML Models'],
  },
  {
    title: 'Tools & More',
    color: 'from-orange-400 to-red-500',
    skills: ['Git', 'GitHub', 'Figma', 'Docker', 'Deployment', 'UI/UX Design'],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass-card-hover rounded-2xl p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${category.color} mb-6`}>
                <h3 className="font-display font-bold text-white">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Progress Visualization */}
        <motion.div
          className="mt-16 glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-display font-bold mb-8 text-center gradient-text">
            Proficiency Levels
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'React & Frontend', level: 90 },
              { name: 'Python & Backend', level: 85 },
              { name: 'AI/ML Technologies', level: 80 },
              { name: 'System Design', level: 75 },
            ].map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-foreground font-medium">{skill.name}</span>
                  <span className="text-primary font-semibold">{skill.level}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.7 + index * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
