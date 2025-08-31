import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-card border-t border-border mt-auto"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </motion.footer>
  );
};