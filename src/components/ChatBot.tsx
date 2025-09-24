import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User as UserIcon, Lightbulb, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
      text: "Hi! I'm INFINIPETS AI assistant 🐾 How can I help you find the perfect outfit for your pet today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const commonQuestions = [
    "What sizes do you have for small dogs?",
    "How do I measure my pet correctly?",
    "What's your return and exchange policy?",
    "Do you offer international shipping?",
    "What materials are your products made from?",
    "Can you recommend outfits for winter?",
    "Are your products machine washable?",
    "Do you have matching accessories?"
  ];

  const quickSuggestions = [
    { text: "Size Guide", icon: "📏" },
    { text: "New Arrivals", icon: "✨" },
    { text: "Best Sellers", icon: "🔥" },
    { text: "Winter Collection", icon: "❄️" },
    { text: "Care Instructions", icon: "🧼" }
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

    // Simulate bot response with more realistic delay
    setTimeout(() => {
      const responses = [
        "Thanks for your question! Let me help you with that. Our customer service team will provide detailed assistance shortly. 🎉",
        "Great question! I'd be happy to help you find the perfect fit for your furry friend. Let me get you the information you need! 🐕",
        "I understand you're looking for the best for your pet! Our team of pet fashion experts will assist you right away. 🌟",
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

  const handleChatToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-20 right-4 w-96 h-[520px] shadow-2xl z-40 flex flex-col border-2 transition-all duration-300 animate-in slide-in-from-bottom-5 ${
          isDark 
            ? 'bg-gray-900/95 border-gray-700 backdrop-blur-xl' 
            : 'bg-white/95 border-green-200 backdrop-blur-xl'
        }`}>
          {/* Enhanced Header */}
          <CardHeader className="gradient-primary text-white p-6 rounded-t-lg relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 left-4 w-12 h-12 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute top-6 right-8 w-6 h-6 bg-white/30 rounded-full animate-bounce"></div>
              <div className="absolute bottom-4 left-12 w-8 h-8 bg-white/15 rounded-full animate-ping"></div>
            </div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Bot className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <div>
                  <CardTitle className="text-xl font-coiny flex items-center space-x-2">
                    <span>INFINIPETS AI</span>
                    <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-white/90 font-medium">Online • Ready to assist</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
              isDark ? 'bg-gray-900/50' : 'bg-gray-50/50'
            }`}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${msg.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}
                >
                  {msg.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-4 rounded-2xl text-sm transition-all duration-200 hover:scale-[1.02] shadow-md ${
                      msg.isBot
                        ? isDark
                          ? 'bg-gray-800/90 text-gray-100 border border-gray-700/50 backdrop-blur-sm'
                          : 'bg-white text-gray-900 border border-green-100 shadow-green-50'
                        : 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg'
                    }`}
                  >
                    <div className="mb-2">{msg.text}</div>
                    <div className={`text-xs ${
                      msg.isBot 
                        ? isDark ? 'text-gray-400' : 'text-gray-500'
                        : 'text-white/70'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {!msg.isBot && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <UserIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className={`p-4 rounded-2xl shadow-md ${
                    isDark ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-green-100'
                  }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Quick Suggestions */}
              {messages.length === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Quick suggestions:
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(suggestion.text)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-lg text-left ${
                          isDark 
                            ? 'bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-700/50 hover:border-green-500' 
                            : 'bg-white text-gray-700 border-green-200 hover:bg-green-50 hover:border-green-400'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{suggestion.icon}</span>
                          <span className="text-xs font-medium">{suggestion.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <div className="flex items-center space-x-2">
                      <Sparkles className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
                      <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Popular questions:
                      </p>
                    </div>
                    {commonQuestions.slice(0, 4).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className={`w-full text-left p-3 text-sm rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                          isDark 
                            ? 'bg-gray-800/30 text-gray-300 border-gray-700/50 hover:bg-gray-700/50 hover:border-green-500/50' 
                            : 'bg-white/80 text-gray-700 border-green-100 hover:bg-green-50/80 hover:border-green-300'
                        }`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced Input Area */}
            <div className={`p-4 border-t backdrop-blur-sm ${
              isDark ? 'border-gray-700/50 bg-gray-900/30' : 'border-gray-200/50 bg-white/30'
            }`}>
              <div className="flex space-x-3">
                <div className="flex-1 relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about pet fashion..."
                    className={`pr-12 h-12 rounded-full border-2 transition-all duration-200 focus:scale-[1.02] shadow-sm ${
                      isDark 
                        ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:bg-gray-800' 
                        : 'bg-white/80 border-green-200 focus:border-green-500 focus:bg-white'
                    }`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Sparkles className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  disabled={!message.trim() || isTyping}
                  className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50"
                >
                  <Send className="w-5 h-5 text-white" />
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
          <div className="absolute inset-0 animate-ping bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20"></div>
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-15"></div>
          
          {/* Main Button */}
          <Button
            onClick={handleChatToggle}
            size="lg"
            className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 shadow-2xl hover:shadow-green-500/25 rounded-full w-16 h-16 p-0 border-2 border-white/30 transition-all duration-300 hover:scale-110 group"
          >
            <MessageCircle className="w-7 h-7 text-white drop-shadow-lg transition-transform group-hover:scale-110" />
          </Button>
        </div>
      </div>
    </>
  );
}