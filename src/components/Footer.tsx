import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <motion.a
              href="#"
              className="text-2xl font-display font-bold gradient-text inline-block mb-2"
              whileHover={{ scale: 1.05 }}
            >
              NK
            </motion.a>
            <p className="text-muted-foreground text-sm">
              © {currentYear} Neetesh Kumar. All rights reserved.
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
            <span>in India</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: 'https://github.com/Neetesh1541', label: 'GitHub' },
              { icon: Linkedin, href: 'https://in.linkedin.com/in/neetesh-kumar-846616287', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:neeteshk1104@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
