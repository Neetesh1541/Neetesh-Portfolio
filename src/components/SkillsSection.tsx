import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Cpu, Database, Wrench } from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import skillFrontend from '@/assets/skill-frontend.jpg';
import skillBackend from '@/assets/skill-backend.jpg';
import skillAi from '@/assets/skill-ai.jpg';
import skillTools from '@/assets/skill-tools.jpg';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    color: 'from-cyan-400 to-blue-500',
    image: skillFrontend,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: Database,
    color: 'from-green-400 to-emerald-500',
    image: skillBackend,
    skills: ['Python', 'Flask', 'Django', 'Node.js', 'REST APIs', 'Databases'],
  },
  {
    title: 'AI/ML',
    icon: Cpu,
    color: 'from-violet-400 to-purple-500',
    image: skillAi,
    skills: ['NLP', 'Computer Vision', 'Deep Learning', 'TensorFlow', 'OpenCV', 'ML Models'],
  },
  {
    title: 'Tools & More',
    icon: Wrench,
    color: 'from-orange-400 to-red-500',
    image: skillTools,
    skills: ['Git', 'GitHub', 'Figma', 'Docker', 'Deployment', 'UI/UX Design'],
  },
];

const radarData = [
  { skill: 'React', value: 95, fullMark: 100 },
  { skill: 'Python', value: 88, fullMark: 100 },
  { skill: 'AI/ML', value: 82, fullMark: 100 },
  { skill: 'Node.js', value: 78, fullMark: 100 },
  { skill: 'TypeScript', value: 90, fullMark: 100 },
  { skill: 'Database', value: 85, fullMark: 100 },
];

const growthData = [
  { month: 'Jan', skills: 60 },
  { month: 'Feb', skills: 65 },
  { month: 'Mar', skills: 70 },
  { month: 'Apr', skills: 72 },
  { month: 'May', skills: 78 },
  { month: 'Jun', skills: 82 },
  { month: 'Jul', skills: 85 },
  { month: 'Aug', skills: 88 },
  { month: 'Sep', skills: 90 },
  { month: 'Oct', skills: 92 },
  { month: 'Nov', skills: 94 },
  { month: 'Dec', skills: 96 },
];

const proficiencyData = [
  { name: 'React & Frontend', level: 95, color: '#06b6d4' },
  { name: 'Python & Backend', level: 88, color: '#10b981' },
  { name: 'AI/ML Technologies', level: 82, color: '#8b5cf6' },
  { name: 'System Design', level: 78, color: '#f59e0b' },
  { name: 'DevOps & Tools', level: 75, color: '#ef4444' },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeChart, setActiveChart] = useState<'radar' | 'bar' | 'area'>('radar');

  return (
    <section id="skills" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary/5 blur-2xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
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
            <Code2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Technical Expertise</span>
          </motion.div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="glass-card-hover rounded-2xl overflow-hidden group relative"
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Image Header */}
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                
                {/* Icon overlay */}
                <motion.div
                  className="absolute top-4 left-4 w-12 h-12 rounded-xl glass-card flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <category.icon className="w-6 h-6 text-foreground" />
                </motion.div>
              </div>
              
              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-foreground mb-4">{category.title}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-xs bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-primary/20 hover:text-primary transition-all cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Charts Section */}
        <motion.div
          className="glass-card rounded-3xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h3 className="text-2xl font-display font-bold gradient-text mb-2">
                  Skill Visualization
                </h3>
                <p className="text-muted-foreground text-sm">Interactive charts showing my technical proficiency</p>
              </div>
              
              {/* Chart Toggle Buttons */}
              <div className="flex gap-2 mt-4 md:mt-0">
                {[
                  { id: 'radar' as const, label: 'Radar' },
                  { id: 'bar' as const, label: 'Bar' },
                  { id: 'area' as const, label: 'Growth' },
                ].map((chart) => (
                  <motion.button
                    key={chart.id}
                    onClick={() => setActiveChart(chart.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeChart === chart.id
                        ? 'bg-primary text-primary-foreground'
                        : 'glass-card hover:bg-primary/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {chart.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Charts Container */}
            <motion.div
              className="h-80 w-full"
              key={activeChart}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {activeChart === 'radar' && (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} className="mx-auto">
                    <PolarGrid stroke="hsl(var(--muted-foreground) / 0.2)" />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                    />
                    <Radar
                      name="Proficiency"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              )}

              {activeChart === 'bar' && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={proficiencyData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      width={130}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Bar dataKey="level" radius={[0, 8, 8, 0]}>
                      {proficiencyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {activeChart === 'area' && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={growthData}>
                    <defs>
                      <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                    <YAxis domain={[50, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="skills"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      fill="url(#skillGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Progress Bars */}
        <motion.div
          className="mt-12 grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {proficiencyData.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="glass-card rounded-xl p-5 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between mb-3">
                <span className="text-foreground font-medium">{skill.name}</span>
                <motion.span
                  className="font-bold"
                  style={{ color: skill.color }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {skill.level}%
                </motion.span>
              </div>
              <div className="h-3 bg-muted/50 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full relative"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 + index * 0.2 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
