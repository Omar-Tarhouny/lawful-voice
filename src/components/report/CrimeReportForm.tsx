import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Upload, FileText, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReportForm {
  category: string;
  description: string;
  attachments: File[];
}

export const CrimeReportForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ReportForm>({
    category: '',
    description: '',
    attachments: []
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [caseId, setCaseId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'report.category.theft',
    'report.category.assault',
    'report.category.corruption',
    'report.category.cybercrime',
    'report.category.fraud',
    'report.category.harassment',
    'report.category.other'
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate submission
    setTimeout(() => {
      const generatedCaseId = 'CASE-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setCaseId(generatedCaseId);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-surface py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm text-center">
              <CardContent className="p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-8"
                >
                  <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto shadow-glow">
                    <Check className="h-10 w-10 text-white" />
                  </div>
                </motion.div>

                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {t('report.success.title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('report.success.subtitle')}
                </p>

                <div className="bg-accent/10 border-2 border-accent rounded-lg p-6 mb-6">
                  <p className="text-2xl font-mono font-bold text-accent">
                    {caseId}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground mb-8">
                  {t('report.success.note')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="tech" onClick={() => setIsSubmitted(false)}>
                    Submit Another Report
                  </Button>
                  <Button variant="outline">
                    Track This Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('report.title')}
          </h1>
          <p className="text-muted-foreground flex items-center justify-center">
            <Shield className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-success" />
            {t('report.subtitle')}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-primary" />
                Report Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-foreground font-medium">
                    {t('report.category')} *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-background border-border/50 focus:border-primary transition-smooth">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {t(category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground font-medium">
                    {t('report.description')} *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={t('report.description.placeholder')}
                    className="min-h-32 bg-background border-border/50 focus:border-primary transition-smooth resize-none"
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium">
                    {t('report.attachments')}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('report.attachments.hint')}
                  </p>

                  <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center transition-smooth hover:border-primary">
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        Click to upload files or drag and drop
                      </p>
                    </label>
                  </div>

                  {/* Uploaded Files */}
                  {formData.attachments.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {formData.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg"
                        >
                          <span className="text-sm text-foreground truncate">
                            {file.name}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-6"
                >
                  <Button
                    type="submit"
                    variant="urgent"
                    size="lg"
                    disabled={!formData.category || !formData.description || isLoading}
                    className="w-full"
                  >
                    {isLoading ? t('button.loading') : t('report.submit')}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};