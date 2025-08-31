import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Globe, Menu } from 'lucide-react';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.png';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-card"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <motion.div 
            className="flex items-center space-x-3 rtl:space-x-reverse"
            whileHover={{ scale: 1.02 }}
          >
            <img 
              src={theme === 'dark' ? logoDark : logoLight} 
              alt="Balaghi Platform" 
              className="h-10 w-10"
            />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-foreground">
                {t('home.title')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('home.subtitle')}
              </p>
            </div>
          </motion.div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            <Button 
              variant={isActive('/') ? 'tech' : 'ghost'} 
              size="sm"
              onClick={() => navigate('/')}
            >
              {t('nav.home')}
            </Button>
            <Button 
              variant={isActive('/chat') ? 'tech' : 'ghost'} 
              size="sm"
              onClick={() => navigate('/chat')}
            >
              {t('nav.legalAid')}
            </Button>
            <Button 
              variant={isActive('/report') ? 'urgent' : 'ghost'} 
              size="sm"
              onClick={() => navigate('/report')}
            >
              {t('nav.reportCrime')}
            </Button>
            <Button 
              variant={isActive('/track') ? 'tech' : 'ghost'} 
              size="sm"
              onClick={() => navigate('/track')}
            >
              {t('nav.trackReport')}
            </Button>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="transition-smooth hover:shadow-tech"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="transition-smooth hover:shadow-tech"
            >
              <Globe className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
              {language === 'en' ? 'عربي' : 'EN'}
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuClick}
              className="lg:hidden transition-smooth hover:shadow-tech"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};