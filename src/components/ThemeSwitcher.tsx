import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Zap, Sparkles } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useTheme } from './ThemeProvider';
import ParticleBurst from './ParticleBurst';

const themes = [
  { id: 'dark', name: 'Dark', icon: Moon, colors: ['#06b6d4', '#8b5cf6', '#3b82f6'] },
  { id: 'light', name: 'Light', icon: Sun, colors: ['#f59e0b', '#fcd34d', '#fb923c'] },
  { id: 'neon', name: 'Neon', icon: Zap, colors: ['#f0abfc', '#22d3ee', '#a855f7'] },
  { id: 'minimal', name: 'Minimal', icon: Sparkles, colors: ['#d4a574', '#a3a3a3', '#737373'] },
] as const;

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [burstColors, setBurstColors] = useState<string[]>([]);

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  const handleThemeChange = useCallback((newTheme: typeof theme) => {
    if (newTheme === theme) {
      setIsOpen(false);
      return;
    }

    const selectedTheme = themes.find((t) => t.id === newTheme);
    setBurstColors(selectedTheme?.colors ? [...selectedTheme.colors] : []);
    setIsAnimating(true);
    setIsOpen(false);

    // Small delay for visual effect
    setTimeout(() => {
      setTheme(newTheme);
      setTimeout(() => setIsAnimating(false), 600);
    }, 100);
  }, [theme, setTheme]);

  return (
    <div className="relative z-[60]">
      {/* Particle burst effect */}
      <ParticleBurst 
        isActive={isAnimating} 
        originX={95} 
        originY={5}
        particleCount={32}
        colors={burstColors}
      />

      {/* Theme transition overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-primary/5 backdrop-blur-[2px]"
              initial={{ scale: 0, borderRadius: '100%' }}
              animate={{ scale: 3, borderRadius: '0%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ originX: 0.95, originY: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-xl glass-card hover:border-primary/50 transition-colors relative overflow-hidden group"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9, rotate: -15 }}
        aria-label="Toggle theme"
      >
        {/* Button glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundSize: '200% 200%' }}
        />
        <motion.div
          key={theme}
          initial={{ rotate: -180, opacity: 0, scale: 0 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          className="relative z-10"
        >
          <CurrentIcon size={20} className="text-primary" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[58]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            />
            <motion.div
              className="absolute right-0 top-full mt-2 z-[59] glass-card rounded-2xl p-2 min-w-[160px] overflow-hidden border border-primary/20"
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
            >
              {/* Dropdown glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
              
              {themes.map((t, index) => {
                const Icon = t.icon;
                const isActive = theme === t.id;
                return (
                  <motion.button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors relative overflow-hidden ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    whileHover={{ x: 4, backgroundColor: 'hsl(var(--muted) / 0.5)' }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-primary/15 rounded-xl"
                        layoutId="activeTheme"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <Icon size={18} />
                    </motion.div>
                    <span className="relative z-10 font-medium">{t.name}</span>
                    
                    {/* Color preview dots */}
                    <div className="ml-auto flex gap-1 relative z-10">
                      {t.colors.slice(0, 3).map((color, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: color }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 + i * 0.05 + 0.1 }}
                        />
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;