import { motion } from 'framer-motion';
import { ArrowLeft, Download, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Award, BookOpen, Briefcase, Code, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Resume = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">
        <Link to="/">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow text-slate-700 dark:text-slate-200 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={18} />
            Back to Portfolio
          </motion.button>
        </Link>
        <motion.a
          href="/Neetesh_Kumar_Resume.pdf"
          download
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground shadow-md hover:shadow-lg transition-shadow font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download size={18} />
          Download PDF
        </motion.a>
      </div>

      {/* Resume Container */}
      <motion.div
        className="max-w-4xl mx-auto bg-white dark:bg-slate-800 shadow-2xl rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-700 dark:to-slate-600 text-white p-8 md:p-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold tracking-wide mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Georgia', serif", letterSpacing: '0.05em' }}
          >
            NEETESH KUMAR
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-slate-300 mb-6 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Full Stack Developer • AI/ML Enthusiast • Tech Community Leader
          </motion.p>
          
          {/* Contact Info */}
          <motion.div 
            className="flex flex-wrap gap-4 md:gap-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a href="mailto:neeteshk1104@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail size={16} />
              neeteshk1104@gmail.com
            </a>
            <a href="tel:+918218828273" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone size={16} />
              +91 8218828273
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} />
              India
            </span>
            <a href="https://github.com/neetesh1541" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Github size={16} />
              github.com/neetesh1541
            </a>
            <a href="https://linkedin.com/in/neetesh-kumar-846616287" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Linkedin size={16} />
              LinkedIn
            </a>
          </motion.div>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          {/* Professional Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b-2 border-primary pb-1">
                Professional Summary
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
              Highly motivated and results-driven Full Stack Developer with over 2 years of hands-on experience in designing, developing, and deploying scalable web applications and AI-powered solutions. Demonstrated expertise in modern frontend frameworks (React, Next.js, TypeScript) and backend technologies (Python, Node.js, Django, Flask). Passionate about leveraging artificial intelligence and machine learning to solve complex real-world problems. Proven leadership abilities as the Founder of HackLoop Community, successfully growing and managing a vibrant tech community of 2,500+ developers. Recognized as a Microsoft Learn Student Ambassador (MLSA) with a strong commitment to knowledge sharing, mentorship, and continuous learning. Seeking opportunities to contribute to innovative projects that push the boundaries of technology.
            </p>
          </motion.section>

          {/* Technical Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Code className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b-2 border-primary pb-1">
                Technical Skills
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-2">Frontend Development</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, TypeScript, Tailwind CSS, Bootstrap, Framer Motion, Responsive Design, Progressive Web Apps</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-2">Backend Development</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Python, Node.js, Express.js, Django, Flask, RESTful APIs, GraphQL, Authentication & Authorization, Database Design</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-2">AI & Machine Learning</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Natural Language Processing (NLP), Computer Vision, Deep Learning, TensorFlow, PyTorch, OpenCV, Scikit-learn, Hugging Face, LLM Integration</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-2">Tools & Technologies</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Git, GitHub, Docker, VS Code, Figma, Postman, MongoDB, PostgreSQL, MySQL, Firebase, Supabase, Vercel, AWS, Linux</p>
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b-2 border-primary pb-1">
                Education
              </h2>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Bachelor of Technology in Computer Science & Engineering</h3>
                  <p className="text-primary font-semibold">Dr. A.P.J. Abdul Kalam Technical University</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                    Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Artificial Intelligence, Machine Learning, Software Engineering, Web Technologies
                  </p>
                </div>
                <span className="text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">2023 - 2027</span>
              </div>
            </div>
          </motion.section>

          {/* Featured Projects */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b-2 border-primary pb-1">
                Featured Projects
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "AI Prompt Generator",
                  tech: "React, TypeScript, AI/ML, Tailwind CSS",
                  desc: "Developed an intelligent prompt optimization tool that leverages AI to generate highly effective prompts for various use cases. Implemented advanced NLP techniques to analyze and enhance user inputs, resulting in 40% improvement in output quality."
                },
                {
                  name: "Chess Game with AI Opponent",
                  tech: "React, TypeScript, Game Logic, Canvas API",
                  desc: "Built a fully functional chess game featuring an AI opponent with multiple difficulty levels. Implemented minimax algorithm with alpha-beta pruning for efficient move calculation. Designed intuitive UI with smooth animations and real-time move validation."
                },
                {
                  name: "Mummy Meals - Food Ordering Platform",
                  tech: "React, Node.js, MongoDB, Stripe Integration",
                  desc: "Created a comprehensive food ordering platform connecting home cooks with customers. Integrated secure payment processing, real-time order tracking, and rating system. Achieved 5th position in Startup Hackathon among 100+ participating teams."
                },
                {
                  name: "Interview Prep Helper",
                  tech: "React, AI Integration, OpenAI API",
                  desc: "Developed an AI-powered interview preparation platform providing personalized practice questions, instant feedback, and performance analytics. Helped 200+ users prepare for technical interviews at top tech companies."
                },
                {
                  name: "HackLoop Community Platform",
                  tech: "React, Next.js, Supabase, Authentication",
                  desc: "Built the official website for HackLoop developer community featuring event management, member profiles, resource sharing, and discussion forums. Successfully supports 2,500+ active community members."
                }
              ].map((project, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border-l-4 border-primary">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-1">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100">{project.name}</h3>
                    <span className="text-xs text-primary font-medium">{project.tech}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">{project.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Leadership & Community */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b-2 border-primary pb-1">
                Leadership & Community
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  role: "Founder & Lead",
                  org: "HackLoop Community",
                  desc: "Founded and grew a developer community to 2,500+ members. Organized 50+ tech events, workshops, and hackathons. Mentored 500+ aspiring developers."
                },
                {
                  role: "Microsoft Learn Student Ambassador",
                  org: "Microsoft",
                  desc: "Selected as MLSA for exceptional contributions to the developer community. Conduct workshops on Microsoft technologies and promote learning initiatives."
                },
                {
                  role: "Core Team Member",
                  org: "Azure Developer Community",
                  desc: "Actively contribute to cloud computing initiatives. Lead Azure-focused workshops and help developers adopt cloud technologies."
                },
                {
                  role: "Active Member",
                  org: "GDG Gurgaon & GDG Noida",
                  desc: "Participate in Google Developer Group events. Contribute to Android, Web, and Cloud technology discussions and workshops."
                }
              ].map((item, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">{item.role}</h3>
                  <p className="text-primary font-semibold text-sm">{item.org}</p>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Achievements */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-primary" size={24} />
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider border-b-2 border-primary pb-1">
                Achievements & Recognition
              </h2>
            </div>
            <ul className="space-y-3">
              {[
                "🏆 5th Position at Startup Hackathon for Mummy Meals project (100+ teams participated)",
                "🚀 Built and scaled HackLoop Community from 0 to 2,500+ active developers",
                "📚 Organized 50+ successful tech events, workshops, and hackathons",
                "👨‍🏫 Mentored 500+ students in web development, AI/ML, and career guidance",
                "🎤 Delivered technical talks at multiple developer conferences and meetups",
                "📝 Published technical articles reaching 10,000+ developers"
              ].map((achievement, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
                  {achievement}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Footer */}
          <motion.div
            className="text-center pt-8 border-t border-slate-200 dark:border-slate-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              References available upon request • Open to relocation • Available for immediate joining
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
