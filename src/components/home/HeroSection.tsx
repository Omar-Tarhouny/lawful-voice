import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageSquare, Shield, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const { t, direction } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageSquare,
      title: t('home.legalAid.title'),
      description: t('home.legalAid.description'),
      button: t('home.legalAid.button'),
      variant: 'tech' as const,
      href: '/chat'
    },
    {
      icon: Shield,
      title: t('home.reporting.title'),
      description: t('home.reporting.description'),
      button: t('home.reporting.button'),
      variant: 'urgent' as const,
      href: '/report'
    },
    {
      icon: Search,
      title: t('home.tracking.title'),
      description: t('home.tracking.description'),
      button: t('home.tracking.button'),
      variant: 'outline' as const,
      href: '/track'
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-surface py-20">
      <div className="container mx-auto px-4">
        {/* Hero Text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-tech bg-clip-text text-transparent">
              {t('home.title')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-tech transition-smooth">
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`
                      inline-flex p-4 rounded-2xl mb-4
                      ${feature.variant === 'tech' ? 'bg-gradient-tech shadow-tech' : ''}
                      ${feature.variant === 'urgent' ? 'bg-gradient-urgent shadow-urgent' : ''}
                      ${feature.variant === 'outline' ? 'bg-accent/10 border-2 border-accent' : ''}
                    `}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Action Button */}
                  <Button 
                    variant={feature.variant}
                    size="lg"
                    className="w-full group"
                    onClick={() => navigate(feature.href)}
                  >
                    {feature.button}
                    <ArrowRight className={`
                      h-4 w-4 ml-2 rtl:ml-0 rtl:mr-2 transition-smooth
                      group-hover:translate-x-1 rtl:group-hover:-translate-x-1
                      ${direction === 'rtl' ? 'rtl-flip' : ''}
                    `} />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center bg-card/30 backdrop-blur-sm rounded-full px-6 py-3 border border-border/50">
            <Shield className="h-5 w-5 text-success mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="text-sm text-muted-foreground">
              🔒 End-to-end encrypted • Anonymous reporting • GDPR compliant
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};