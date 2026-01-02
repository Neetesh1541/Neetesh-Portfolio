import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './ThemeProvider';

const themes = [
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'neon', name: 'Neon', icon: Zap },
  { id: 'minimal', name: 'Minimal', icon: Sparkles },
] as const;

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentTheme = themes.find((t) => t.id === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-lg glass-card hover:border-primary/50 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <CurrentIcon size={20} className="text-primary" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-full mt-2 z-50 glass-card rounded-xl p-2 min-w-[140px]"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {themes.map((t) => {
                const Icon = t.icon;
                return (
                  <motion.button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                      theme === t.id
                        ? 'bg-primary/20 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <Icon size={16} />
                    {t.name}
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
