import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Search, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Track = () => {
  const { t } = useLanguage();
  const [caseId, setCaseId] = useState('');
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!caseId.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock case data
      setCaseData({
        id: caseId,
        category: 'Theft',
        status: 'In Review',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-16',
        description: 'Case is under review by our team'
      });
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return 'bg-blue-500';
      case 'in review': return 'bg-yellow-500';
      case 'forwarded': return 'bg-purple-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': return <FileText className="h-4 w-4" />;
      case 'in review': return <Clock className="h-4 w-4" />;
      case 'forwarded': return <AlertCircle className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-surface">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t('nav.trackReport')}
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your case ID to check the status of your report
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8 bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search Case
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your case ID (e.g., BLG-2024-001234)"
                  value={caseId}
                  onChange={(e) => setCaseId(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={loading || !caseId.trim()}
                  variant="tech"
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Case Result */}
          {caseData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      Case #{caseData.id}
                    </CardTitle>
                    <Badge 
                      className={`${getStatusColor(caseData.status)} text-white`}
                    >
                      <span className="flex items-center gap-1">
                        {getStatusIcon(caseData.status)}
                        {caseData.status}
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Category
                      </label>
                      <p className="text-foreground font-medium">
                        {caseData.category}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Submitted
                      </label>
                      <p className="text-foreground font-medium">
                        {caseData.createdAt}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Latest Update
                    </label>
                    <p className="text-foreground">
                      {caseData.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Last updated: {caseData.updatedAt}
                    </p>
                  </div>

                  {/* Status Timeline */}
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground mb-3">Status Timeline</h4>
                    <div className="space-y-2">
                      {['New', 'In Review', 'Forwarded', 'Resolved'].map((status, index) => {
                        const isActive = status === caseData.status;
                        const isPassed = ['New', 'In Review'].includes(status);
                        
                        return (
                          <div
                            key={status}
                            className={`flex items-center gap-3 p-2 rounded-lg ${
                              isActive ? 'bg-primary/10' : isPassed ? 'bg-success/10' : 'bg-muted/30'
                            }`}
                          >
                            <div className={`
                              w-2 h-2 rounded-full
                              ${isActive ? 'bg-primary' : isPassed ? 'bg-success' : 'bg-muted-foreground/30'}
                            `} />
                            <span className={`text-sm ${
                              isActive ? 'text-primary font-medium' : 
                              isPassed ? 'text-success' : 'text-muted-foreground'
                            }`}>
                              {status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Help Text */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>Don't have your case ID? Check your email or the confirmation page from when you submitted your report.</p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Track;