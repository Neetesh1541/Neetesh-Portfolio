import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface VoiceToggleProps {
  isEnabled: boolean;
  isSpeaking: boolean;
  isGlowing: boolean;
  onToggle: () => void;
}

const VoiceToggle = ({ isEnabled, isSpeaking, isGlowing, onToggle }: VoiceToggleProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      onClick={onToggle}
      className="fixed bottom-8 left-8 z-50 p-3 rounded-full bg-background/80 backdrop-blur-md border border-border shadow-lg hover:shadow-primary/30 transition-all duration-300 group"
      aria-label={isEnabled ? 'Disable voice guide' : 'Enable voice guide'}
    >
      {/* Glow effect when speaking */}
      <AnimatePresence>
        {isGlowing && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.5, 1],
              }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-primary/40 blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.3, 1],
              }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              className="absolute inset-0 rounded-full bg-primary/20"
            />
          </>
        )}
      </AnimatePresence>

      {/* Sound wave animation when speaking */}
      <AnimatePresence>
        {isSpeaking && (
          <div className="absolute -right-1 -top-1 flex items-center gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ height: 4 }}
                animate={{ height: [4, 12, 4] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
                className="w-1 rounded-full bg-primary"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative z-10"
      >
        {isEnabled ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </motion.div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-md border border-border text-xs font-medium whitespace-nowrap pointer-events-none"
      >
        {isEnabled ? 'Voice Guide ON' : 'Voice Guide OFF'}
      </motion.div>
    </motion.button>
  );
};

export default VoiceToggle;
