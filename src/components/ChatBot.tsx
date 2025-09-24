import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
  isDark?: boolean;
}

export default function ChatBot({ isDark = false }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm INFINIPETS AI assistant 🐾 I can help you find the perfect outfit for your pet today!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    { text: "Size Guide", icon: "📏" },
    { text: "New Arrivals", icon: "✨" },
    { text: "Best Sellers", icon: "🔥" },
    { text: "Contact Support", icon: "💬" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Thank you for your question! I'll help you with that right away. Our customer service team will provide detailed assistance shortly! 🎉",
        "Great question! I'm happy to help you find the perfect fit for your furry friend. Let me get you the information you need! 🐕",
        "I understand you're looking for the best for your pet! Our team of pet fashion experts will assist you right away! 🌟",
        "Perfect timing! We have amazing options that would be ideal for your pet. Let me connect you with our specialists! 💫"
      ];
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-20 right-6 w-[380px] h-[500px] shadow-xl z-40 flex flex-col border-0 transition-all duration-300 animate-in slide-in-from-bottom-5 ${
          isDark 
            ? 'bg-gray-900/95 backdrop-blur-xl' 
            : 'bg-white/95 backdrop-blur-xl'
        } rounded-3xl overflow-hidden`}>
          
          {/* Premium Header with Enhanced Gradient */}
          <CardHeader className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white p-4 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-green-400/20 via-emerald-400/20 to-teal-400/20 animate-pulse"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16 animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 translate-y-12 animate-bounce" style={{ animationDuration: '3s' }}></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg">
                  <Bot className="w-4 h-4 text-white drop-shadow-sm" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent drop-shadow-sm">INFINIPETS</CardTitle>
                  <p className="text-xs text-white/90 font-medium">AI Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-full w-8 h-8 transition-all duration-200 hover:scale-110"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${
              isDark ? 'bg-gray-900/20' : 'bg-gray-50/20'
            }`}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-1`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.isBot
                        ? isDark
                          ? 'bg-gray-800 text-gray-100'
                          : 'bg-gray-100 text-gray-900'
                        : 'bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 text-white shadow-lg'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className={`text-xs mt-1 ${
                      msg.isBot 
                        ? isDark ? 'text-gray-500' : 'text-gray-500'
                        : 'text-white/70'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-1">
                  <div className={`p-3 rounded-2xl ${
                    isDark ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Quick Suggestions with Green Accent */}
              {messages.length === 1 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="grid grid-cols-2 gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(suggestion.text)}
                        className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 text-left border-2 ${
                          isDark 
                            ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-700 border-gray-700 hover:border-emerald-500' 
                            : 'bg-white text-gray-700 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-50 border-gray-200 hover:border-emerald-400 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{suggestion.icon}</span>
                          <span className="text-xs font-medium">{suggestion.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area with Green Theme */}
            <div className={`p-4 border-t ${
              isDark ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-white/50'
            }`}>
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className={`h-11 rounded-full border-2 pl-4 pr-10 text-sm transition-all duration-200 ${
                      isDark 
                        ? 'bg-gray-800 text-white placeholder-gray-500 border-gray-700 focus:border-emerald-500' 
                        : 'bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-300 focus:border-emerald-500'
                    } focus:ring-2 focus:ring-emerald-500/20`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Sparkles className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  disabled={!message.trim() || isTyping}
                  className="h-11 w-11 rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 shadow-lg hover:shadow-emerald-500/25"
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Premium Chat Button with Enhanced Effects */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Multiple ripple waves */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-ping opacity-15" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full animate-ping opacity-10" style={{ animationDelay: '1s' }}></div>
          
          {/* Rotating glow ring */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-transparent via-transparent to-green-500 rounded-full animate-spin opacity-30" style={{ animationDuration: '3s' }}></div>
          
          {/* Main Button with Premium Gradient */}
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="lg"
            className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 shadow-2xl hover:shadow-emerald-500/30 rounded-full w-14 h-14 p-0 transition-all duration-300 hover:scale-110 border-2 border-white/20 backdrop-blur-sm"
          >
            <MessageCircle className="w-6 h-6 text-white drop-shadow-lg transition-transform group-hover:scale-110" />
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
          </Button>
        </div>
      </div>
    </>
  );
}