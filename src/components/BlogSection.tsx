import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import blogAi from '@/assets/blog-ai.jpg';
import blogWebdev from '@/assets/blog-webdev.jpg';
import blogCommunity from '@/assets/blog-community.jpg';

const articles = [
  {
    title: 'Building Intelligent AI Systems: A Practical Guide',
    excerpt: 'Explore the fundamentals of creating AI-powered applications, from NLP to computer vision, with real-world implementation strategies.',
    category: 'AI / Machine Learning',
    date: 'Dec 28, 2025',
    readTime: '8 min read',
    image: blogAi,
    gradient: 'from-cyan-500/20 to-blue-600/20',
  },
  {
    title: 'Modern React Patterns for Scalable Applications',
    excerpt: 'Deep dive into advanced React patterns including compound components, render props, and custom hooks for building maintainable codebases.',
    category: 'Web Development',
    date: 'Dec 20, 2025',
    readTime: '12 min read',
    image: blogWebdev,
    gradient: 'from-violet-500/20 to-purple-600/20',
  },
  {
    title: 'Growing a Tech Community: Lessons from HackLoop',
    excerpt: 'Insights on building and nurturing a thriving developer community, organizing impactful events, and fostering collaboration.',
    category: 'Community Building',
    date: 'Dec 15, 2025',
    readTime: '6 min read',
    image: blogCommunity,
    gradient: 'from-orange-500/20 to-amber-600/20',
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="blog" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="text-primary" size={24} />
            <h2 className="section-title">Blog & Insights</h2>
            <BookOpen className="text-primary" size={24} />
          </div>
          <p className="section-subtitle mx-auto">
            Sharing knowledge on AI, web development, and tech leadership
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              className="glass-card-hover rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${article.gradient} to-transparent opacity-60`} />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full glass-card text-xs font-medium text-primary">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <motion.div
                  className="flex items-center gap-2 text-primary text-sm font-medium"
                  whileHover={{ x: 8 }}
                >
                  Read Article
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="btn-glass inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen size={20} />
            View All Articles
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
