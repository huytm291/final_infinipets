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
      text: "Xin chào! Tôi là trợ lý AI của INFINIPETS 🐾 Tôi có thể giúp bạn tìm trang phục hoàn hảo cho thú cưng của bạn!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const commonQuestions = [
    "Bạn có size nào cho chó nhỏ?",
    "Làm thế nào để đo size cho thú cưng?",
    "Chính sách đổi trả như thế nào?",
    "Có ship quốc tế không?",
    "Sản phẩm làm từ chất liệu gì?",
    "Có trang phục mùa đông không?",
    "Có thể giặt máy được không?",
    "Có phụ kiện đi kèm không?"
  ];

  const quickSuggestions = [
    { text: "Hướng dẫn size", icon: "📏", color: "from-blue-500 to-blue-600" },
    { text: "Sản phẩm mới", icon: "✨", color: "from-purple-500 to-purple-600" },
    { text: "Bán chạy nhất", icon: "🔥", color: "from-red-500 to-red-600" },
    { text: "Bộ sưu tập đông", icon: "❄️", color: "from-cyan-500 to-cyan-600" },
    { text: "Hướng dẫn chăm sóc", icon: "🧼", color: "from-green-500 to-green-600" },
    { text: "Liên hệ hỗ trợ", icon: "💬", color: "from-orange-500 to-orange-600" }
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

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Cảm ơn bạn đã đặt câu hỏi! Tôi sẽ giúp bạn giải đáp ngay. Đội ngũ chăm sóc khách hàng sẽ hỗ trợ chi tiết trong giây lát! 🎉",
        "Câu hỏi tuyệt vời! Tôi rất vui được giúp bạn tìm sản phẩm phù hợp nhất cho bé cưng. Hãy để tôi tìm thông tin cho bạn! 🐕",
        "Tôi hiểu bạn muốn tìm sản phẩm tốt nhất cho thú cưng! Chuyên gia thời trang thú cưng của chúng tôi sẽ hỗ trợ bạn ngay! 🌟",
        "Thời điểm hoàn hảo! Chúng tôi có nhiều lựa chọn tuyệt vời cho thú cưng của bạn. Tôi sẽ kết nối bạn với chuyên gia ngay! 💫"
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
        <Card className={`fixed bottom-20 right-4 w-[400px] h-[600px] shadow-2xl z-40 flex flex-col border-0 transition-all duration-300 animate-in slide-in-from-bottom-5 ${
          isDark 
            ? 'bg-gray-900/98 backdrop-blur-xl' 
            : 'bg-white/98 backdrop-blur-xl'
        } rounded-2xl overflow-hidden`}>
          
          {/* Modern Header */}
          <CardHeader className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-teal-600/20"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg font-bold flex items-center space-x-2">
                    <span>INFINIPETS AI</span>
                    <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <p className="text-xs text-white/90">Đang online • Sẵn sàng hỗ trợ</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 rounded-full w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${
              isDark ? 'bg-gray-900/30' : 'bg-gray-50/30'
            }`}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-3 ${msg.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}
                >
                  {msg.isBot && (
                    <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm transition-all duration-200 shadow-sm ${
                      msg.isBot
                        ? isDark
                          ? 'bg-gray-800/90 text-gray-100 border border-gray-700/50'
                          : 'bg-white text-gray-900 border border-gray-200'
                        : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                    }`}
                  >
                    <div className="mb-1">{msg.text}</div>
                    <div className={`text-xs ${
                      msg.isBot 
                        ? isDark ? 'text-gray-400' : 'text-gray-500'
                        : 'text-white/70'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {!msg.isBot && (
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <UserIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className={`p-3 rounded-2xl shadow-sm ${
                    isDark ? 'bg-gray-800/90 border border-gray-700/50' : 'bg-white border border-gray-200'
                  }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Quick Suggestions - Only show when no conversation */}
              {messages.length === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3">
                  {/* Quick Action Buttons */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Gợi ý nhanh:
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {quickSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuestionClick(suggestion.text)}
                          className={`p-3 rounded-xl bg-gradient-to-r ${suggestion.color} text-white transition-all duration-200 hover:scale-105 hover:shadow-lg text-left group`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-base group-hover:scale-110 transition-transform">{suggestion.icon}</span>
                            <span className="text-xs font-medium">{suggestion.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Popular Questions */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-blue-500" />
                      <p className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Câu hỏi phổ biến:
                      </p>
                    </div>
                    {commonQuestions.slice(0, 4).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className={`w-full text-left p-3 text-sm rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                          isDark 
                            ? 'bg-gray-800/50 text-gray-300 border-gray-700/50 hover:bg-gray-700/50 hover:border-emerald-500' 
                            : 'bg-white/80 text-gray-700 border-gray-200 hover:bg-emerald-50 hover:border-emerald-400'
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
            <div className={`p-4 border-t-2 ${
              isDark ? 'border-gray-700/50 bg-gray-900/50' : 'border-gray-200 bg-white/50'
            }`}>
              <div className="space-y-3">
                {/* Input Field */}
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Nhập câu hỏi của bạn tại đây..."
                      className={`h-12 rounded-full border-2 pl-4 pr-12 text-sm transition-all duration-200 focus:scale-[1.02] shadow-sm ${
                        isDark 
                          ? 'bg-gray-800/70 border-gray-600 text-white placeholder-gray-400 focus:border-emerald-500 focus:bg-gray-800' 
                          : 'bg-white border-gray-300 focus:border-emerald-500 focus:bg-white placeholder-gray-500'
                      }`}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Sparkles className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    disabled={!message.trim() || isTyping}
                    className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </Button>
                </div>
                
                {/* Helpful Text */}
                <p className={`text-xs text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Nhấn Enter để gửi • Shift + Enter để xuống dòng
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Notification Badge */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center z-10 animate-pulse">
              <span className="text-xs text-white font-bold">!</span>
            </div>
          )}
          
          {/* Animated Waves */}
          <div className="absolute inset-0 animate-ping bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-20"></div>
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-15"></div>
          
          {/* Main Button */}
          <Button
            onClick={handleChatToggle}
            size="lg"
            className="relative bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 shadow-2xl hover:shadow-emerald-500/25 rounded-full w-16 h-16 p-0 border-2 border-white/30 transition-all duration-300 hover:scale-110 group"
          >
            <MessageCircle className="w-7 h-7 text-white drop-shadow-lg transition-transform group-hover:scale-110" />
          </Button>
        </div>
      </div>
    </>
  );
}