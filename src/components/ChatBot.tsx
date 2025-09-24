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
      text: "Xin chào! Tôi là trợ lý AI của INFINIPETS 🐾 Tôi có thể giúp bạn tìm trang phục hoàn hảo cho thú cưng của bạn!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    { text: "Hướng dẫn size", icon: "📏" },
    { text: "Sản phẩm mới", icon: "✨" },
    { text: "Bán chạy nhất", icon: "🔥" },
    { text: "Liên hệ hỗ trợ", icon: "💬" }
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
        "Cảm ơn bạn đã đặt câu hỏi! Tôi sẽ giúp bạn giải đáp ngay. 🎉",
        "Tôi rất vui được hỗ trợ bạn tìm sản phẩm phù hợp nhất! 🐕",
        "Chuyên gia của chúng tôi sẽ hỗ trợ bạn trong giây lát! 🌟",
        "Tôi sẽ kết nối bạn với chuyên gia ngay! 💫"
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
          
          {/* Header with Green Theme */}
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base font-semibold">INFINIPETS</CardTitle>
                  <p className="text-xs text-white/80">Trợ lý AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 rounded-full w-8 h-8"
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
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <div className={`text-xs mt-1 ${
                      msg.isBot 
                        ? isDark ? 'text-gray-500' : 'text-gray-500'
                        : 'text-white/60'
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
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Quick Suggestions */}
              {messages.length === 1 && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="grid grid-cols-2 gap-2">
                    {quickSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(suggestion.text)}
                        className={`p-3 rounded-xl transition-all duration-200 hover:scale-105 text-left ${
                          isDark 
                            ? 'bg-gray-800/60 text-gray-300 hover:bg-gray-700' 
                            : 'bg-white text-gray-700 hover:bg-green-50 border border-gray-200 hover:border-green-300'
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
                    placeholder="Nhập tin nhắn..."
                    className={`h-11 rounded-full border-0 pl-4 pr-10 text-sm ${
                      isDark 
                        ? 'bg-gray-800 text-white placeholder-gray-500' 
                        : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-green-500/20`}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Sparkles className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                </div>
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  disabled={!message.trim() || isTyping}
                  className="h-11 w-11 rounded-full bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Green Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl rounded-full w-14 h-14 p-0 transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    </>
  );
}