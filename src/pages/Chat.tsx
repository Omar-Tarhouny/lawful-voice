import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChatInterface } from '@/components/chat/ChatInterface';

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <ChatInterface />
      </div>
      <Footer />
    </div>
  );
};

export default Chat;