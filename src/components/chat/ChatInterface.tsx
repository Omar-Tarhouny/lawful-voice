import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, Download, Trash2, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatInterface: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('chat.welcome'),
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thank you for your question: "${inputText}". As an AI legal assistant, I can help you with general legal guidance. This is a simulated response. In a real implementation, this would connect to an AI model trained on legal documents and case law.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      text: t('chat.welcome'),
      isUser: false,
      timestamp: new Date()
    }]);
  };

  const exportToPDF = () => {
    // This would implement PDF export functionality
    console.log('Exporting chat to PDF...');
  };

  return (
    <div className="min-h-screen bg-gradient-surface py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('chat.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('chat.subtitle')}
          </p>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-card border-border/50 bg-card/80 backdrop-blur-sm">
            {/* Chat Header */}
            <CardHeader className="border-b border-border/50">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 rtl:ml-2 rtl:mr-0 text-accent" />
                  {t('chat.title')}
                </CardTitle>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={exportToPDF}
                    className="transition-smooth hover:shadow-tech"
                  >
                    <Download className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                    {t('chat.export')}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearChat}
                    className="transition-smooth hover:shadow-urgent"
                  >
                    <Trash2 className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
                    {t('chat.clear')}
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`
                        flex items-start space-x-3 rtl:space-x-reverse max-w-xs md:max-w-md
                        ${message.isUser ? 'flex-row-reverse rtl:flex-row' : ''}
                      `}>
                        {/* Avatar */}
                        <div className={`
                          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                          ${message.isUser 
                            ? 'bg-gradient-tech shadow-tech' 
                            : 'bg-gradient-primary shadow-tech'
                          }
                        `}>
                          {message.isUser ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>

                        {/* Message Bubble */}
                        <div className={`
                          px-4 py-3 rounded-2xl transition-smooth
                          ${message.isUser
                            ? 'bg-primary text-primary-foreground shadow-tech'
                            : 'bg-secondary text-secondary-foreground shadow-card'
                          }
                          ${message.isUser ? 'rounded-br-sm' : 'rounded-bl-sm'}
                        `}>
                          <p className="text-sm leading-relaxed">
                            {message.text}
                          </p>
                          <span className="text-xs opacity-70 mt-1 block">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-3 rtl:space-x-reverse">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary shadow-tech flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-sm shadow-card">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-border/50 p-6">
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('chat.placeholder')}
                    className="flex-1 bg-background border-border/50 focus:border-primary transition-smooth"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isTyping}
                    variant="tech"
                    size="icon"
                    className="shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};