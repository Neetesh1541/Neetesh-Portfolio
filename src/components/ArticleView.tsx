import { motion } from 'framer-motion';
import { X, Calendar, Clock, ArrowLeft, User, Share2 } from 'lucide-react';
import { useEffect } from 'react';

interface Article {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  gradient: string;
  content: string;
}

interface ArticleViewProps {
  article: Article;
  onClose: () => void;
}

const ArticleView = ({ article, onClose }: ArticleViewProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <motion.header
        className="sticky top-0 z-10 glass-card border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.button
            onClick={onClose}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft size={20} />
            Back to Articles
          </motion.button>
          <div className="flex items-center gap-3">
            <motion.button
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={20} className="text-muted-foreground" />
            </motion.button>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} className="text-muted-foreground" />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Image */}
        <motion.div
          className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${article.gradient} to-transparent opacity-60`} />
          <div className="absolute bottom-6 left-6">
            <span className="px-4 py-2 rounded-full glass-card text-sm font-medium text-primary">
              {article.category}
            </span>
          </div>
        </motion.div>

        {/* Meta Info */}
        <motion.div
          className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="flex items-center gap-2">
            <User size={16} />
            Neetesh Kumar
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={16} />
            {article.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} />
            {article.readTime}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-8 leading-tight"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {article.title}
        </motion.h1>

        {/* Article Body */}
        <motion.div
          className="prose prose-lg dark:prose-invert max-w-none"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div 
            className="text-muted-foreground leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>

        {/* Author Card */}
        <motion.div
          className="mt-12 p-6 rounded-2xl glass-card"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start gap-4">
            <motion.div 
              className="relative w-16 h-16 rounded-full overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary animate-gradient" style={{ backgroundSize: '200% 200%' }} />
              <div className="absolute inset-[2px] rounded-full bg-background flex items-center justify-center">
                <span className="text-xl font-bold gradient-text">NK</span>
              </div>
            </motion.div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">Neetesh Kumar</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Full Stack Developer | AI/ML Enthusiast | Founder of HackLoop Community
              </p>
              <p className="text-muted-foreground text-sm">
                Passionate about building intelligent products and sharing knowledge with the developer community.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to Profile Button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={onClose}
            className="btn-primary-glow inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={18} />
            Back to Profile
          </motion.button>
        </motion.div>
      </article>
    </motion.div>
  );
};

export default ArticleView;
