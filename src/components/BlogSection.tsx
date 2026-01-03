import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import blogAi from '@/assets/blog-ai.jpg';
import blogWebdev from '@/assets/blog-webdev.jpg';
import blogCommunity from '@/assets/blog-community.jpg';
import ArticleView from './ArticleView';

const articles = [
  {
    title: 'Building Intelligent AI Systems: A Practical Guide',
    excerpt: 'Explore the fundamentals of creating AI-powered applications, from NLP to computer vision, with real-world implementation strategies.',
    category: 'AI / Machine Learning',
    date: 'Dec 28, 2025',
    readTime: '8 min read',
    image: blogAi,
    gradient: 'from-cyan-500/20 to-blue-600/20',
    content: `
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Introduction to AI-Powered Applications</h2>
      <p class="mb-4">Artificial Intelligence has transformed from a futuristic concept to an essential component of modern software development. In this comprehensive guide, we'll explore how to build intelligent systems that can understand, learn, and make decisions.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Understanding Natural Language Processing</h2>
      <p class="mb-4">NLP enables machines to understand human language. Key components include tokenization, named entity recognition, sentiment analysis, and language generation. Modern frameworks like Hugging Face Transformers make implementing these features accessible to developers.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">Key NLP Techniques</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Tokenization:</strong> Breaking text into meaningful units for processing</li>
        <li><strong>Embeddings:</strong> Converting words into numerical vectors that capture semantic meaning</li>
        <li><strong>Attention Mechanisms:</strong> Allowing models to focus on relevant parts of input</li>
        <li><strong>Fine-tuning:</strong> Adapting pre-trained models to specific domains</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Computer Vision Applications</h2>
      <p class="mb-4">Computer vision allows machines to interpret visual information. Using libraries like OpenCV and TensorFlow, you can build applications for object detection, facial recognition, and image segmentation.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">Implementation Strategy</h3>
      <p class="mb-4">Start with pre-trained models like YOLO for object detection or ResNet for image classification. These models provide a solid foundation that can be fine-tuned for your specific use case, saving significant development time.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Best Practices for Production AI</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Always validate model outputs before production deployment</li>
        <li>Implement monitoring for model drift and performance degradation</li>
        <li>Use feature stores for consistent data preprocessing</li>
        <li>Consider ethical implications and bias in your training data</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">Building intelligent AI systems requires a blend of theoretical knowledge and practical implementation skills. By following the strategies outlined in this guide, you can create applications that leverage the power of AI while maintaining reliability and user trust.</p>
    `,
  },
  {
    title: 'Modern React Patterns for Scalable Applications',
    excerpt: 'Deep dive into advanced React patterns including compound components, render props, and custom hooks for building maintainable codebases.',
    category: 'Web Development',
    date: 'Dec 20, 2025',
    readTime: '12 min read',
    image: blogWebdev,
    gradient: 'from-violet-500/20 to-purple-600/20',
    content: `
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Why React Patterns Matter</h2>
      <p class="mb-4">As applications grow in complexity, the need for organized, reusable code becomes paramount. React patterns provide battle-tested solutions to common problems, enabling developers to build scalable applications that are easy to maintain and extend.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Compound Components Pattern</h2>
      <p class="mb-4">This pattern allows components to work together while maintaining a clean API. Think of it like HTML's select and option elements – they're designed to be used together.</p>
      
      <pre class="bg-card p-4 rounded-lg mb-4 overflow-x-auto"><code class="text-sm text-primary">const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    &lt;TabsContext.Provider value={{ activeTab, setActiveTab }}&gt;
      {children}
    &lt;/TabsContext.Provider&gt;
  );
};</code></pre>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Custom Hooks for Logic Reuse</h2>
      <p class="mb-4">Custom hooks extract component logic into reusable functions. They follow the same rules as built-in hooks but can encapsulate complex state management, side effects, and business logic.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">Example: useLocalStorage Hook</h3>
      <pre class="bg-card p-4 rounded-lg mb-4 overflow-x-auto"><code class="text-sm text-primary">function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue];
}</code></pre>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Render Props Pattern</h2>
      <p class="mb-4">Render props is a technique for sharing code between components using a prop whose value is a function. This pattern provides maximum flexibility for customizing component behavior.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Performance Optimization Patterns</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>React.memo:</strong> Prevent unnecessary re-renders for pure components</li>
        <li><strong>useMemo:</strong> Memoize expensive computations</li>
        <li><strong>useCallback:</strong> Stabilize function references across renders</li>
        <li><strong>Code Splitting:</strong> Load components on demand with React.lazy</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">Mastering React patterns is essential for building professional-grade applications. These patterns not only solve common problems but also make your code more testable, maintainable, and enjoyable to work with.</p>
    `,
  },
  {
    title: 'Growing a Tech Community: Lessons from HackLoop',
    excerpt: 'Insights on building and nurturing a thriving developer community, organizing impactful events, and fostering collaboration.',
    category: 'Community Building',
    date: 'Dec 15, 2025',
    readTime: '6 min read',
    image: blogCommunity,
    gradient: 'from-orange-500/20 to-amber-600/20',
    content: `
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">The Genesis of HackLoop</h2>
      <p class="mb-4">HackLoop started with a simple vision: create a space where developers could learn, grow, and build together. What began as a small group of enthusiastic coders has grown into a thriving community of 2500+ members.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Core Principles of Community Building</h2>
      <p class="mb-4">Building a successful tech community requires more than just gathering people. It's about creating genuine connections, providing value, and fostering an environment where everyone feels welcome to contribute.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">1. Value First, Always</h3>
      <p class="mb-4">Every interaction should provide value to community members. Whether it's through educational content, networking opportunities, or collaborative projects, the focus should always be on what members gain from being part of the community.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">2. Inclusive Environment</h3>
      <p class="mb-4">A thriving community welcomes developers of all skill levels. From beginners taking their first steps in coding to experienced professionals sharing their knowledge – everyone has a place and something to contribute.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">3. Consistent Engagement</h3>
      <p class="mb-4">Regular events, workshops, and discussions keep the community active and engaged. We've organized 50+ events, each designed to address real needs and interests of our members.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Organizing Impactful Events</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Hackathons:</strong> Intensive coding sessions that bring members together to solve real problems</li>
        <li><strong>Workshops:</strong> Hands-on learning experiences covering trending technologies</li>
        <li><strong>Mentorship Sessions:</strong> Connecting experienced developers with those seeking guidance</li>
        <li><strong>Project Showcases:</strong> Celebrating member achievements and inspiring others</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Lessons Learned</h2>
      <p class="mb-4">Building HackLoop taught me that community is about people, not platforms. The technology we use matters less than the connections we forge. Authenticity, consistency, and genuine care for members are the foundations of any successful community.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Looking Forward</h2>
      <p class="mb-4">As HackLoop continues to grow, our mission remains the same: empower developers to learn, collaborate, and build amazing things together. The journey of 2500+ members is just the beginning.</p>
    `,
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  return (
    <>
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
                onClick={() => setSelectedArticle(article)}
                whileHover={{ y: -8 }}
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

      {/* Full Article View */}
      <AnimatePresence>
        {selectedArticle && (
          <ArticleView
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogSection;
