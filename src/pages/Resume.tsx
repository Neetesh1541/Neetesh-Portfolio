import { motion } from 'framer-motion';
import { ArrowLeft, Download, Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Award, BookOpen, Briefcase, Code, Users, Star, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Resume = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-slate-950 dark:via-purple-950/30 dark:to-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-violet-500/5 to-transparent rounded-full" />
      </div>

      {/* Action Buttons */}
      <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center relative z-10">
        <Link to="/">
          <motion.button
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/20 transition-all text-slate-700 dark:text-slate-200 font-semibold border border-purple-100 dark:border-purple-900/30"
            whileHover={{ scale: 1.02, x: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft size={18} />
            Back to Portfolio
          </motion.button>
        </Link>
        <motion.a
          href="/Neetesh_Kumar_Resume.pdf"
          download="Neetesh_Kumar_Resume.pdf"
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toast.success('Resume download started!')}
        >
          <Download size={18} />
          Download PDF
          <Sparkles size={14} className="ml-1" />
        </motion.a>
      </div>

      {/* Resume Container */}
      <motion.div
        className="max-w-4xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-2xl shadow-purple-500/10 rounded-2xl overflow-hidden border border-purple-100/50 dark:border-purple-900/30 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 dark:from-violet-800 dark:via-purple-800 dark:to-fuchsia-800 text-white p-8 md:p-12 relative overflow-hidden">
          {/* Header decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold tracking-wider mb-3 relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif", letterSpacing: '0.08em' }}
          >
            NEETESH KUMAR
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-purple-100 mb-8 font-medium tracking-wide relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
          >
            Full Stack Developer • AI/ML Enthusiast • Tech Community Leader
          </motion.p>
          
          {/* Contact Info */}
          <motion.div 
            className="flex flex-wrap gap-4 md:gap-6 text-sm relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <a href="mailto:neeteshk1104@gmail.com" className="flex items-center gap-2 hover:text-yellow-300 transition-colors bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Mail size={14} />
              neeteshk1104@gmail.com
            </a>
            <a href="tel:+918218828273" className="flex items-center gap-2 hover:text-yellow-300 transition-colors bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Phone size={14} />
              +91 8218828273
            </a>
            <span className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <MapPin size={14} />
              India
            </span>
            <a href="https://github.com/neetesh1541" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-300 transition-colors bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Github size={14} />
              GitHub
            </a>
            <a href="https://linkedin.com/in/neetesh-kumar-846616287" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-yellow-300 transition-colors bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Linkedin size={14} />
              LinkedIn
            </a>
          </motion.div>
        </div>

        <div className="p-8 md:p-12 space-y-10" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
          {/* Professional Summary */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-purple-500/20">
                <Star className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Professional Summary
              </h2>
            </div>
            <div className="pl-4 border-l-2 border-purple-200 dark:border-purple-800">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify text-[15px]">
                Highly motivated and results-driven Full Stack Developer with over 2 years of hands-on experience in designing, developing, and deploying scalable web applications and AI-powered solutions. Demonstrated expertise in modern frontend frameworks (React, Next.js, TypeScript) and backend technologies (Python, Node.js, Django, Flask). Passionate about leveraging artificial intelligence and machine learning to solve complex real-world problems. Proven leadership abilities as the Founder of HackLoop Community, successfully growing and managing a vibrant tech community of 2,500+ developers. Recognized as a Microsoft Learn Student Ambassador (MLSA) with a strong commitment to knowledge sharing, mentorship, and continuous learning.
              </p>
            </div>
          </motion.section>

          {/* Technical Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg shadow-blue-500/20">
                <Code className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Technical Skills
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-5 rounded-xl border border-purple-100 dark:border-purple-800/30 hover:shadow-lg hover:shadow-purple-500/10 transition-shadow">
                <h3 className="font-bold text-violet-700 dark:text-violet-300 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-violet-500" />
                  Frontend Development
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, TypeScript, Tailwind CSS, Bootstrap, Framer Motion</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/30 hover:shadow-lg hover:shadow-emerald-500/10 transition-shadow">
                <h3 className="font-bold text-emerald-700 dark:text-emerald-300 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Backend Development
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">Python, Node.js, Express.js, Django, Flask, RESTful APIs, GraphQL, Authentication, Database Design</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-5 rounded-xl border border-amber-100 dark:border-amber-800/30 hover:shadow-lg hover:shadow-amber-500/10 transition-shadow">
                <h3 className="font-bold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  AI & Machine Learning
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">NLP, Computer Vision, Deep Learning, TensorFlow, PyTorch, OpenCV, Scikit-learn, LLM Integration</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 p-5 rounded-xl border border-rose-100 dark:border-rose-800/30 hover:shadow-lg hover:shadow-rose-500/10 transition-shadow">
                <h3 className="font-bold text-rose-700 dark:text-rose-300 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Tools & Technologies
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">Git, Docker, Figma, MongoDB, PostgreSQL, Firebase, Supabase, Vercel, AWS, Linux</p>
              </div>
            </div>
          </motion.section>

          {/* Education */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg shadow-indigo-500/20">
                <BookOpen className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Education
              </h2>
            </div>
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 relative">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Bachelor of Technology in Computer Science & Engineering</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold">Dr. A.P.J. Abdul Kalam Technical University</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                    <span className="font-medium">Relevant Coursework:</span> Data Structures & Algorithms, OOP, Database Management, Computer Networks, AI/ML, Software Engineering
                  </p>
                </div>
                <span className="text-white bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap shadow-lg shadow-purple-500/20">2023 - 2027</span>
              </div>
            </div>
          </motion.section>

          {/* Featured Projects */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-600 shadow-lg shadow-fuchsia-500/20">
                <Briefcase className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Featured Projects
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  name: "AI Prompt Generator",
                  tech: "React, TypeScript, AI/ML",
                  desc: "Intelligent prompt optimization tool leveraging AI to generate highly effective prompts. Implemented advanced NLP techniques resulting in 40% improvement in output quality.",
                  color: "from-violet-500 to-purple-600"
                },
                {
                  name: "Chess Game with AI Opponent",
                  tech: "React, TypeScript, Canvas API",
                  desc: "Fully functional chess game with AI opponent featuring multiple difficulty levels. Implemented minimax algorithm with alpha-beta pruning.",
                  color: "from-blue-500 to-cyan-600"
                },
                {
                  name: "Mummy Meals - Food Platform",
                  tech: "React, Node.js, MongoDB, Stripe",
                  desc: "Comprehensive food ordering platform with secure payment processing and real-time order tracking. 5th position in Startup Hackathon (100+ teams).",
                  color: "from-emerald-500 to-teal-600"
                },
                {
                  name: "Interview Prep Helper",
                  tech: "React, AI Integration, OpenAI",
                  desc: "AI-powered interview preparation platform with personalized practice questions and instant feedback. Helped 200+ users prepare for tech interviews.",
                  color: "from-amber-500 to-orange-600"
                },
                {
                  name: "HackLoop Community Platform",
                  tech: "React, Next.js, Supabase",
                  desc: "Official website for HackLoop developer community with event management, member profiles, and forums. Supports 2,500+ active members.",
                  color: "from-rose-500 to-pink-600"
                }
              ].map((project, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white dark:bg-slate-800/50 p-5 rounded-xl shadow-md hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700/50 group"
                  whileHover={{ x: 8 }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${project.color} shadow-lg`} />
                      {project.name}
                    </h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${project.color} text-white shadow-md`}>{project.tech}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-3 leading-relaxed pl-5">{project.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Leadership & Community */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
                <Users className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Leadership & Community
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  role: "Founder & Lead",
                  org: "HackLoop Community",
                  desc: "Founded and grew a developer community to 2,500+ members. Organized 50+ tech events and mentored 500+ developers.",
                  icon: "🚀",
                  color: "from-violet-500 to-purple-600"
                },
                {
                  role: "Microsoft Learn Student Ambassador",
                  org: "Microsoft",
                  desc: "Selected as MLSA for exceptional contributions. Conduct workshops on Microsoft technologies and promote learning.",
                  icon: "🎓",
                  color: "from-blue-500 to-cyan-600"
                },
                {
                  role: "Core Team Member",
                  org: "Azure Developer Community",
                  desc: "Lead Azure-focused workshops and help developers adopt cloud technologies effectively.",
                  icon: "☁️",
                  color: "from-sky-500 to-blue-600"
                },
                {
                  role: "Active Member",
                  org: "GDG Gurgaon & GDG Noida",
                  desc: "Contribute to Android, Web, and Cloud technology discussions at Google Developer Group events.",
                  icon: "🌐",
                  color: "from-emerald-500 to-teal-600"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-md hover:shadow-xl transition-all group"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100">{item.role}</h3>
                      <p className={`text-transparent bg-clip-text bg-gradient-to-r ${item.color} font-semibold text-sm`}>{item.org}</p>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Achievements */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg shadow-yellow-500/20">
                <Award className="text-white" size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Achievements & Recognition
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { text: "5th Position at Startup Hackathon (100+ teams)", icon: "🏆", color: "from-yellow-400 to-amber-500" },
                { text: "Built HackLoop Community to 2,500+ developers", icon: "🚀", color: "from-violet-400 to-purple-500" },
                { text: "Organized 50+ tech events & hackathons", icon: "📚", color: "from-blue-400 to-cyan-500" },
                { text: "Mentored 500+ students in web dev & AI/ML", icon: "👨‍🏫", color: "from-emerald-400 to-teal-500" },
                { text: "Technical speaker at developer conferences", icon: "🎤", color: "from-rose-400 to-pink-500" },
                { text: "Published articles reaching 10,000+ devs", icon: "📝", color: "from-orange-400 to-red-500" }
              ].map((achievement, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center gap-3 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className={`text-2xl p-2 rounded-lg bg-gradient-to-br ${achievement.color} bg-opacity-20`}>{achievement.icon}</span>
                  <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">{achievement.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Footer */}
          <motion.div
            className="text-center pt-8 mt-4 border-t border-purple-100 dark:border-purple-900/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-200 dark:border-emerald-800/30">
                ✅ Available for immediate joining
              </span>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 dark:text-blue-400 font-medium border border-blue-200 dark:border-blue-800/30">
                🌍 Open to relocation
              </span>
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400 font-medium border border-purple-200 dark:border-purple-800/30">
                📋 References available
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Resume;
