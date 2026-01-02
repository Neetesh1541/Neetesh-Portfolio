import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Rocket, Users, Code2, Lightbulb, Target, Zap } from 'lucide-react';

const whyHireMe = [
  { icon: Rocket, title: 'Founder Mindset', desc: 'Product ownership & entrepreneurial drive' },
  { icon: Code2, title: 'Full-Stack + AI', desc: 'Strong engineering blend across the stack' },
  { icon: Lightbulb, title: 'Problem Solver', desc: 'Excellent analytical & communication skills' },
  { icon: Users, title: 'Leader', desc: 'Proven leadership & community building' },
  { icon: Target, title: 'Impact Focused', desc: 'Consistent delivery of high-impact solutions' },
  { icon: Zap, title: 'Passionate', desc: 'Deep enthusiasm for technology & innovation' },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div
            className="glass-card-hover rounded-2xl p-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
              My Story
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              I'm a passionate full-stack developer, AI enthusiast, and tech entrepreneur 
              dedicated to building scalable and meaningful digital products. As the{' '}
              <span className="text-primary font-semibold">Founder of HackLoop Community</span>, 
              I lead developers, organize collaborations, and create platforms that empower 
              learners and professionals.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              With strong expertise in AI systems, modern web technologies, and product design, 
              I consistently transform ideas into real-world solutions that deliver impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="glass-card rounded-lg px-4 py-2">
                <span className="text-sm text-muted-foreground">📍 India</span>
              </div>
              <div className="glass-card rounded-lg px-4 py-2">
                <span className="text-sm text-muted-foreground">🎓 AKTU (2023-2027)</span>
              </div>
              <div className="glass-card rounded-lg px-4 py-2">
                <span className="text-sm text-muted-foreground">💼 Open to Opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* Why Hire Me */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
              Why Hire Me?
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {whyHireMe.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="glass-card-hover rounded-xl p-5 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
