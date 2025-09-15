import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const ChatWidget = ({ t, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load chat history from sessionStorage
    const savedMessages = sessionStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add welcome message
      setMessages([{
        id: 1,
        text: t.chat.welcomeMessage,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [t.chat.welcomeMessage]);

  useEffect(() => {
    // Save messages to sessionStorage
    if (messages.length > 0) {
      sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const quickQuestions = [
    t.chat.quickQuestions.registration,
    t.chat.quickQuestions.services,
    t.chat.quickQuestions.emergency,
    t.chat.quickQuestions.documents
  ];

  const sendMessage = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Simulate API call to chatbot
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          question: text.trim(),
          language: language 
        }),
      });

      const data = await response.json();
      
      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: data.answer || t.chat.defaultResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // Simulate thinking time

    } catch (error) {
      setTimeout(() => {
        const errorMessage = {
          id: Date.now() + 1,
          text: t.chat.errorMessage,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span>{t.chat.title}</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex flex-col h-[400px] p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      {message.sender === 'user' && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      )}
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t bg-gray-50 dark:bg-gray-900">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.chat.quickHelp}</p>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(question)}
                      className="w-full text-left text-sm p-2 rounded bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chat.inputPlaceholder}
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;