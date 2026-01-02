import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import projectPromptGenerator from '@/assets/project-prompt-generator.jpg';
import projectChess from '@/assets/project-chess.jpg';
import projectMummyMeals from '@/assets/project-mummy-meals.jpg';
import projectInterview from '@/assets/project-interview.jpg';
import projectHackloop from '@/assets/project-hackloop.jpg';

const projects = [
  {
    title: 'Prompt Generator',
    description: 'AI-powered tool that generates optimized prompts for various AI models, helping users get better results from their AI interactions.',
    techStack: ['React', 'TypeScript', 'AI/ML', 'Tailwind CSS'],
    liveUrl: 'https://prompt-perfect-pro.vercel.app/',
    image: projectPromptGenerator,
  },
  {
    title: 'Chess Game',
    description: 'Interactive chess game with AI opponent, move validation, and a sleek modern interface for an engaging gaming experience.',
    techStack: ['React', 'TypeScript', 'Game Logic', 'CSS'],
    liveUrl: 'https://chess-game-iota-eight.vercel.app/',
    image: projectChess,
  },
  {
    title: 'Mummy Meals',
    description: 'Food ordering platform connecting home chefs with customers, featuring 5th position in Startup Hackathon.',
    techStack: ['React', 'Node.js', 'Database', 'Payment Integration'],
    liveUrl: 'https://mummy-meals-connect.vercel.app/',
    image: projectMummyMeals,
  },
  {
    title: 'Interview Prep Helper',
    description: 'Comprehensive interview preparation platform with curated questions, tips, and practice resources for tech interviews.',
    techStack: ['React', 'AI Integration', 'Tailwind', 'Content Management'],
    liveUrl: 'https://neeteshinterview.vercel.app/',
    image: projectInterview,
  },
  {
    title: 'HackLoop Website',
    description: 'Official website for HackLoop Community - a platform for developers to learn, collaborate, and build amazing projects together.',
    techStack: ['React', 'Next.js', 'Community Features', 'Events'],
    liveUrl: 'https://www.hackloop.xyz',
    image: projectHackloop,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-primary" size={24} />
            <h2 className="section-title">Featured Projects</h2>
            <Sparkles className="text-primary" size={24} />
          </div>
          <p className="section-subtitle mx-auto">
            A showcase of my recent work and passion projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glass-card-hover rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
            {/* Project Header with Image */}
              <div className="h-48 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                {/* Animated lines */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-0 left-0 w-full h-px bg-white/50 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="absolute bottom-0 right-0 w-full h-px bg-white/50 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href="https://github.com/neetesh1541"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} className="text-muted-foreground hover:text-primary" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://github.com/neetesh1541"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
