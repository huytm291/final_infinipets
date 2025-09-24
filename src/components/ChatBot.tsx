import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User as UserIcon, Lightbulb } from 'lucide-react';
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
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm INFINIPETS AI assistant 🐾 How can I help you find the perfect outfit for your pet today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const commonQuestions = [
    "What sizes do you have available?",
    "How do I measure my pet correctly?",
    "What's your return and exchange policy?",
    "Do you offer international shipping?",
    "What materials are your products made from?",
    "Can you recommend outfits for small dogs?",
    "How do I care for pet clothing?",
    "Do you have seasonal collections?"
  ];

  const searchSuggestions = [
    "Dog sweaters", "Cat accessories", "Winter coats", "Summer outfits",
    "Pet shoes", "Raincoats", "Holiday costumes", "Formal wear"
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
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate bot response with more realistic delay
    setTimeout(() => {
      const botResponses = [
        "Thanks for your question! Let me help you with that. Our customer service team will provide detailed information shortly. 🎉",
        "Great question! I'd be happy to help you find the perfect fit for your pet. Let me connect you with our sizing experts! 📏",
        "That's a wonderful choice! Our premium collection has exactly what you're looking for. I'll get you connected with our specialists! ✨",
        "Perfect timing! We have some amazing new arrivals that would be perfect for your pet. Let me show you our latest collection! 🌟"
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: randomResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setMessage(question);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowSuggestions(messages.length === 1);
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <Card className={`fixed bottom-20 right-4 w-96 h-[500px] shadow-2xl z-40 flex flex-col border-2 transition-all duration-300 animate-in slide-in-from-bottom-5 ${
          isDark ? 'border-gray-700 bg-gray-900' : 'border-green-200 bg-white'
        }`}>
          <CardHeader className="gradient-primary text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-coiny">INFINIPETS AI</CardTitle>
                  <p className="text-xs text-white/80">Online • Ready to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${msg.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.isBot 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                        : isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      {msg.isBot ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <UserIcon className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                      )}
                    </div>
                    
                    {/* Message Bubble */}
                    <div
                      className={`p-3 rounded-2xl text-sm shadow-sm ${
                        msg.isBot
                          ? isDark 
                            ? 'bg-gray-800 text-gray-100 border border-gray-700' 
                            : 'bg-white text-gray-900 border border-gray-200'
                          : 'gradient-primary text-white'
                      }`}
                    >
                      {msg.text}
                      <div className={`text-xs mt-1 opacity-70 ${
                        msg.isBot 
                          ? isDark ? 'text-gray-400' : 'text-gray-500'
                          : 'text-white/70'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className={`p-3 rounded-2xl ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Question Suggestions */}
              {showSuggestions && messages.length === 1 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3">
                  <div className="flex items-center space-x-2">
                    <Lightbulb className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
                    <p className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Popular questions:
                    </p>
                  </div>
                  <div className="grid gap-2">
                    {commonQuestions.slice(0, 4).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className={`text-left p-3 text-xs rounded-lg border transition-all duration-200 hover:scale-105 ${
                          isDark 
                            ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-300 hover:text-white' 
                            : 'bg-white hover:bg-green-50 border-green-200 text-gray-700 hover:text-green-700'
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

            {/* Input Area */}
            <div className={`p-4 border-t ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about pet fashion..."
                    className={`pr-12 border-2 transition-all duration-200 focus:scale-[1.02] ${
                      isDark 
                        ? 'border-gray-600 bg-gray-800 text-white placeholder:text-gray-400 focus:border-green-500' 
                        : 'border-green-200 focus:border-green-500'
                    }`}
                  />
                  <Sparkles className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                  size="icon"
                  className="gradient-primary hover:opacity-90 transition-all duration-200 hover:scale-110 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Search Suggestions */}
              {message === '' && (
                <div className="mt-3">
                  <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Try searching for:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className={`cursor-pointer text-xs transition-all duration-200 hover:scale-105 ${
                          isDark 
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                            : 'border-green-200 text-green-700 hover:bg-green-100'
                        }`}
                        onClick={() => setMessage(suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative">
          {/* Animated Waves - Enhanced */}
          <div className="absolute inset-0 animate-ping bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20"></div>
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-15"></div>
          
          {/* Notification Badge */}
          {!isOpen && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-bounce border-2 border-white">
              <Sparkles className="w-3 h-3" />
            </Badge>
          )}
          
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