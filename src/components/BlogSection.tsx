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
    readTime: '15 min read',
    image: blogAi,
    gradient: 'from-cyan-500/20 to-blue-600/20',
    content: `
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Introduction to AI-Powered Applications</h2>
      <p class="mb-4">Artificial Intelligence has transformed from a futuristic concept to an essential component of modern software development. In this comprehensive guide, we'll explore how to build intelligent systems that can understand, learn, and make decisions. The democratization of AI through open-source frameworks and cloud APIs has made it possible for developers of all skill levels to integrate machine learning into their applications.</p>
      
      <p class="mb-4">The journey into AI development begins with understanding the core paradigms: supervised learning, unsupervised learning, and reinforcement learning. Each approach serves different purposes and excels in specific scenarios. Whether you're building a recommendation system, a chatbot, or an image classifier, choosing the right paradigm is crucial for success.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Understanding Natural Language Processing</h2>
      <p class="mb-4">NLP enables machines to understand human language. Key components include tokenization, named entity recognition, sentiment analysis, and language generation. Modern frameworks like Hugging Face Transformers make implementing these features accessible to developers. The revolution brought by transformer architectures, particularly models like GPT and BERT, has pushed the boundaries of what's possible in text understanding and generation.</p>
      
      <p class="mb-4">When building NLP applications, it's essential to consider the nuances of language. Context matters immensely – the word "bank" means something entirely different when discussing finance versus geography. Modern language models handle this through attention mechanisms that weigh the importance of different parts of the input when making predictions.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">Key NLP Techniques</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Tokenization:</strong> Breaking text into meaningful units for processing. Subword tokenization methods like BPE (Byte Pair Encoding) handle rare words effectively.</li>
        <li><strong>Embeddings:</strong> Converting words into numerical vectors that capture semantic meaning. Word2Vec, GloVe, and contextual embeddings from transformers each have their strengths.</li>
        <li><strong>Attention Mechanisms:</strong> Allowing models to focus on relevant parts of input, enabling better understanding of long-range dependencies in text.</li>
        <li><strong>Fine-tuning:</strong> Adapting pre-trained models to specific domains through transfer learning, dramatically reducing the data and compute needed.</li>
        <li><strong>Prompt Engineering:</strong> Crafting effective prompts for large language models to achieve desired outputs without additional training.</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Computer Vision Applications</h2>
      <p class="mb-4">Computer vision allows machines to interpret visual information. Using libraries like OpenCV and TensorFlow, you can build applications for object detection, facial recognition, and image segmentation. The field has evolved rapidly, with convolutional neural networks (CNNs) giving way to vision transformers (ViTs) that apply attention mechanisms to image patches.</p>
      
      <p class="mb-4">Real-world applications range from medical imaging analysis to autonomous vehicles. In manufacturing, computer vision systems detect defects with superhuman accuracy. In retail, they enable cashier-less stores and inventory management. The key is understanding which architecture suits your specific use case.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">Implementation Strategy</h3>
      <p class="mb-4">Start with pre-trained models like YOLO for object detection or ResNet for image classification. These models provide a solid foundation that can be fine-tuned for your specific use case, saving significant development time. Consider the trade-offs between model accuracy and inference speed – a model that's 99% accurate but takes 10 seconds per image might not be suitable for real-time applications.</p>
      
      <p class="mb-4">Data augmentation is your friend. By applying transformations like rotation, scaling, and color adjustments to your training images, you can significantly improve model robustness. Libraries like Albumentations make this straightforward to implement.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Building Production-Ready AI Systems</h2>
      <p class="mb-4">Moving from a working prototype to a production system requires careful consideration of scalability, monitoring, and maintenance. Containerization with Docker ensures consistent environments, while Kubernetes enables scaling to meet demand. MLOps practices – the intersection of machine learning and DevOps – provide frameworks for continuous integration and deployment of ML models.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Best Practices for Production AI</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Always validate model outputs before production deployment through rigorous testing and shadow deployments</li>
        <li>Implement monitoring for model drift and performance degradation – models can degrade as real-world data distributions change</li>
        <li>Use feature stores for consistent data preprocessing across training and inference</li>
        <li>Consider ethical implications and bias in your training data – AI systems can amplify existing biases if not carefully managed</li>
        <li>Document your models thoroughly, including training data sources, hyperparameters, and known limitations</li>
        <li>Implement rollback mechanisms to quickly revert to previous model versions if issues arise</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">The Future of AI Development</h2>
      <p class="mb-4">The field is moving towards more efficient models that require less data and compute. Techniques like knowledge distillation allow smaller models to learn from larger ones, enabling deployment on edge devices. Federated learning enables training on decentralized data while preserving privacy. As these techniques mature, we'll see AI capabilities expanding into new domains and applications.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">Building intelligent AI systems requires a blend of theoretical knowledge and practical implementation skills. By following the strategies outlined in this guide, you can create applications that leverage the power of AI while maintaining reliability and user trust. The key is to start small, iterate quickly, and always keep the end user in mind. The most successful AI applications are those that solve real problems in ways that feel natural and intuitive to users.</p>
    `,
  },
  {
    title: 'Modern React Patterns for Scalable Applications',
    excerpt: 'Deep dive into advanced React patterns including compound components, render props, and custom hooks for building maintainable codebases.',
    category: 'Web Development',
    date: 'Dec 20, 2025',
    readTime: '18 min read',
    image: blogWebdev,
    gradient: 'from-violet-500/20 to-purple-600/20',
    content: `
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Why React Patterns Matter</h2>
      <p class="mb-4">As applications grow in complexity, the need for organized, reusable code becomes paramount. React patterns provide battle-tested solutions to common problems, enabling developers to build scalable applications that are easy to maintain and extend. These patterns aren't just about writing less code – they're about writing code that communicates intent clearly and adapts gracefully to changing requirements.</p>
      
      <p class="mb-4">The evolution of React from class components to hooks has opened new possibilities for code organization. Understanding when and how to apply different patterns is what separates good React developers from great ones. Let's explore the patterns that have proven most valuable in production applications.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Compound Components Pattern</h2>
      <p class="mb-4">This pattern allows components to work together while maintaining a clean API. Think of it like HTML's select and option elements – they're designed to be used together. The parent component manages state and passes it down through context, while child components consume that context to render appropriately.</p>
      
      <pre class="bg-card p-4 rounded-lg mb-4 overflow-x-auto"><code class="text-sm text-primary">const TabsContext = createContext(null);

const Tabs = ({ children, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    &lt;TabsContext.Provider value={{ activeTab, setActiveTab }}&gt;
      &lt;div className="tabs-container"&gt;{children}&lt;/div&gt;
    &lt;/TabsContext.Provider&gt;
  );
};

Tabs.Tab = ({ index, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    &lt;button 
      className={activeTab === index ? 'active' : ''}
      onClick={() => setActiveTab(index)}
    &gt;
      {children}
    &lt;/button&gt;
  );
};

Tabs.Panel = ({ index, children }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === index ? &lt;div&gt;{children}&lt;/div&gt; : null;
};</code></pre>

      <p class="mb-4">This approach provides flexibility while maintaining a cohesive API. Users of your component can arrange tabs and panels however they need, and the compound relationship ensures everything works together seamlessly.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Custom Hooks for Logic Reuse</h2>
      <p class="mb-4">Custom hooks extract component logic into reusable functions. They follow the same rules as built-in hooks but can encapsulate complex state management, side effects, and business logic. The power of custom hooks lies in their composability – you can build complex behaviors by combining simpler hooks.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">Example: useLocalStorage Hook</h3>
      <pre class="bg-card p-4 rounded-lg mb-4 overflow-x-auto"><code class="text-sm text-primary">function useLocalStorage(key, initialValue) {
  // Lazy initialization for performance
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
}</code></pre>

      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">Example: useDebounce Hook</h3>
      <pre class="bg-card p-4 rounded-lg mb-4 overflow-x-auto"><code class="text-sm text-primary">function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}</code></pre>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Render Props Pattern</h2>
      <p class="mb-4">Render props is a technique for sharing code between components using a prop whose value is a function. This pattern provides maximum flexibility for customizing component behavior. While hooks have replaced many use cases for render props, the pattern remains valuable for scenarios requiring dynamic child rendering.</p>
      
      <pre class="bg-card p-4 rounded-lg mb-4 overflow-x-auto"><code class="text-sm text-primary">const MouseTracker = ({ render }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return render(position);
};

// Usage
&lt;MouseTracker 
  render={({ x, y }) => &lt;div&gt;Mouse at: {x}, {y}&lt;/div&gt;} 
/&gt;</code></pre>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">State Management Patterns</h2>
      <p class="mb-4">Choosing the right state management approach is crucial. Local component state with useState works for most cases. For complex state logic, useReducer provides more structure. When state needs to be shared across many components, Context API or external libraries like Zustand or Jotai offer different trade-offs.</p>
      
      <p class="mb-4">The key insight is that not all state is equal. UI state (is this dropdown open?), form state (what did the user type?), server state (what data did we fetch?), and URL state (what page are we on?) each have different characteristics and often benefit from different management approaches.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Performance Optimization Patterns</h2>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>React.memo:</strong> Prevent unnecessary re-renders for pure components. Use wisely – the comparison itself has a cost.</li>
        <li><strong>useMemo:</strong> Memoize expensive computations. Ideal for derived data that's costly to compute.</li>
        <li><strong>useCallback:</strong> Stabilize function references across renders, preventing child re-renders.</li>
        <li><strong>Code Splitting:</strong> Load components on demand with React.lazy and Suspense for faster initial loads.</li>
        <li><strong>Virtualization:</strong> For long lists, render only visible items using libraries like react-window.</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Error Handling Patterns</h2>
      <p class="mb-4">Robust applications need comprehensive error handling. Error boundaries catch rendering errors in component trees. For async operations, proper try-catch blocks and error states ensure graceful degradation. The pattern of representing async state as { data, error, isLoading } has become standard practice.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Testing Patterns</h2>
      <p class="mb-4">Write tests that give you confidence without coupling too tightly to implementation. Test behavior, not implementation details. Custom hooks can be tested using @testing-library/react-hooks. Integration tests often provide more value than unit tests for UI components.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Conclusion</h2>
      <p class="mb-4">Mastering React patterns is essential for building professional-grade applications. These patterns not only solve common problems but also make your code more testable, maintainable, and enjoyable to work with. Start by identifying repetitive code or complex logic in your applications, then apply these patterns incrementally. Remember that patterns are tools, not rules – use them when they add clarity and value.</p>
    `,
  },
  {
    title: 'Growing a Tech Community: Lessons from HackLoop',
    excerpt: 'Insights on building and nurturing a thriving developer community, organizing impactful events, and fostering collaboration.',
    category: 'Community Building',
    date: 'Dec 15, 2025',
    readTime: '12 min read',
    image: blogCommunity,
    gradient: 'from-orange-500/20 to-amber-600/20',
    content: `
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">The Genesis of HackLoop</h2>
      <p class="mb-4">HackLoop started with a simple vision: create a space where developers could learn, grow, and build together. What began as a small group of enthusiastic coders has grown into a thriving community of 2500+ members. The journey wasn't always smooth, but every challenge taught valuable lessons about what makes a community thrive.</p>
      
      <p class="mb-4">The initial spark came from recognizing a gap in our local tech ecosystem. Many developers, especially those early in their careers, felt isolated. They had questions but didn't know who to ask. They had ideas but lacked collaborators. They wanted to learn but couldn't find structured resources. HackLoop was built to address these needs.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Core Principles of Community Building</h2>
      <p class="mb-4">Building a successful tech community requires more than just gathering people. It's about creating genuine connections, providing value, and fostering an environment where everyone feels welcome to contribute. After two years of building HackLoop, several principles have proven essential.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">1. Value First, Always</h3>
      <p class="mb-4">Every interaction should provide value to community members. Whether it's through educational content, networking opportunities, or collaborative projects, the focus should always be on what members gain from being part of the community. This means constantly listening to feedback and adapting to evolving needs.</p>
      
      <p class="mb-4">We measure value not by metrics like follower counts, but by the tangible impact on members' careers. When someone lands their first developer job after learning through our workshops, or when a side project built at our hackathon turns into a startup – that's the value that matters.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">2. Inclusive Environment</h3>
      <p class="mb-4">A thriving community welcomes developers of all skill levels. From beginners taking their first steps in coding to experienced professionals sharing their knowledge – everyone has a place and something to contribute. Inclusivity isn't just about demographics; it's about creating space for diverse perspectives and learning styles.</p>
      
      <p class="mb-4">We've implemented buddy systems pairing newcomers with experienced members, beginner-friendly events with no prior knowledge assumed, and clear codes of conduct that are actively enforced. The result is a space where asking "basic" questions is encouraged, not ridiculed.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">3. Consistent Engagement</h3>
      <p class="mb-4">Regular events, workshops, and discussions keep the community active and engaged. We've organized 50+ events, each designed to address real needs and interests of our members. Consistency builds trust – members know they can rely on regular touchpoints and ongoing support.</p>
      
      <p class="mb-4">Our weekly "Code & Coffee" sessions have become a community ritual. Even when attendance varies, the consistency of the offering creates a rhythm that members can depend on. This predictability is surprisingly important for community health.</p>
      
      <h3 class="text-xl font-semibold text-foreground mt-6 mb-3">4. Empowering Leaders</h3>
      <p class="mb-4">A community shouldn't depend on a single person. Identifying and nurturing emerging leaders distributes ownership and ensures sustainability. Some of our most impactful initiatives have come from members who stepped up to fill needs they personally felt.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Organizing Impactful Events</h2>
      <p class="mb-4">Events are the heartbeat of any developer community. They create focal points for engagement and provide structured opportunities for learning and connection. Here's what we've learned about making events that matter:</p>
      
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Hackathons:</strong> Intensive coding sessions that bring members together to solve real problems. The magic happens when people with different skills collaborate under time pressure. Our 48-hour hackathons have produced working products that participants continued developing long after.</li>
        <li><strong>Workshops:</strong> Hands-on learning experiences covering trending technologies. The best workshops aren't lectures – they're guided explorations where everyone builds something by the end.</li>
        <li><strong>Mentorship Sessions:</strong> Connecting experienced developers with those seeking guidance. One hour with the right mentor can save weeks of struggle and frustration.</li>
        <li><strong>Project Showcases:</strong> Celebrating member achievements and inspiring others. Seeing peers build impressive projects is more motivating than any influencer's tutorial.</li>
        <li><strong>Tech Talks:</strong> Deep dives into specific technologies or career topics, often featuring community members as speakers.</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Handling Challenges</h2>
      <p class="mb-4">Community building isn't all wins. We've faced periods of low engagement, difficult members, and the challenge of scaling while maintaining intimacy. Transparency about these challenges – including publicly acknowledging mistakes – has actually strengthened trust.</p>
      
      <p class="mb-4">The pandemic forced us to go fully virtual, which initially felt like a setback. But it opened doors to members from across the country who couldn't attend physical events. We learned to create meaningful connections through screens, a skill that has remained valuable even as in-person events returned.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Lessons Learned</h2>
      <p class="mb-4">Building HackLoop taught me that community is about people, not platforms. The technology we use matters less than the connections we forge. Authenticity, consistency, and genuine care for members are the foundations of any successful community. Here are the key lessons:</p>
      
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Start small and grow organically. Forced growth leads to hollow communities.</li>
        <li>Listen more than you speak. The community knows what it needs.</li>
        <li>Celebrate members, not the community brand.</li>
        <li>Create rituals and traditions that become part of the community identity.</li>
        <li>Document everything – institutional knowledge is fragile.</li>
        <li>Partner with companies and institutions, but never compromise member interests.</li>
      </ul>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Looking Forward</h2>
      <p class="mb-4">As HackLoop continues to grow, our mission remains the same: empower developers to learn, collaborate, and build amazing things together. The journey of 2500+ members is just the beginning. We're exploring new formats, expanding our reach, and always looking for ways to provide more value.</p>
      
      <p class="mb-4">If you're thinking of building a community, my advice is simple: start. Don't wait for the perfect plan or platform. Find two or three people who share your vision and begin. The community will tell you what it needs as it grows. Your job is to listen, facilitate, and keep showing up.</p>
      
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Join the Movement</h2>
      <p class="mb-4">Whether you're a seasoned developer or just starting your coding journey, there's a place for you in HackLoop. We believe that the best way to grow is together, and we're always excited to welcome new members into our community. Join us, and let's build the future of tech together.</p>
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
