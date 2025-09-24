import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm INFINIPETS AI assistant 🐾 How can I help you find the perfect outfit for your pet today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const commonQuestions = [
    "What sizes do you have?",
    "How do I measure my pet?",
    "What's your return policy?",
    "Do you ship internationally?",
    "What materials do you use?"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! Our team will help you shortly. In the meantime, check out our bestsellers or browse by category! 🎉",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuestionClick = (question: string) => {
    setMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80 h-96 shadow-2xl z-50 flex flex-col border-green-200">
          <CardHeader className="gradient-primary text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-coiny">INFINIPETS Support</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      msg.isBot
                        ? 'bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-gray-100 border border-green-200'
                        : 'gradient-primary text-white'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Common Questions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 text-center">Common questions:</p>
                  {commonQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className="w-full text-left p-2 text-xs bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded border border-green-200 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border-green-200 focus:border-green-500"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="gradient-primary hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative">
          {/* Animated Waves */}
          <div className="absolute inset-0 chatbot-wave bg-green-400 rounded-full opacity-20"></div>
          <div className="absolute inset-0 chatbot-wave bg-green-500 rounded-full opacity-15" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Main Button */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="lg"
            className="chatbot-pulse gradient-primary hover:opacity-90 shadow-lg rounded-full w-14 h-14 p-0 border-2 border-white/20"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    </>
  );
}