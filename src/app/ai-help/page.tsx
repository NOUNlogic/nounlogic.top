'use client';

import { useState, useRef, useEffect } from 'react';
import AnimatedElement from '@/components/ui/animated-element';
import ModernCard from '@/components/ui/modern-card';
import ModernButton from '@/components/ui/modern-button';

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const SAMPLE_RESPONSES = [
  "Based on your course material, the key concepts of object-oriented programming include encapsulation, inheritance, polymorphism, and abstraction.",
  "The difference between synchronous and asynchronous I/O is that synchronous operations block execution until the operation completes, while asynchronous operations allow the program to continue executing while the operation runs in the background.",
  "Here's how to solve that equation: First, isolate the variable by moving all other terms to the opposite side. Then, divide both sides by the coefficient to find the value of x.",
  "According to the National Open University of Nigeria's grading system, you need a minimum CGPA of 3.50 to graduate with First Class Honours.",
  "The assignment for BIO304 is due next Friday. Make sure to include both the practical report and the theoretical analysis in your submission.",
];

export default function AIHelpPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your NOUN AI assistant. How can I help with your studies today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample topics for quick prompts
  const sampleTopics = [
    "Explain object-oriented programming",
    "How do I calculate my CGPA?",
    "When is my BIO304 assignment due?",
    "Solve this equation: 3x + 7 = 22",
    "Explain synchronous vs asynchronous I/O",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      const randomResponse = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedElement animation="fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">AI Study Assistant</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Get instant help with your coursework, study materials, and academic questions
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with tips */}
          <AnimatedElement animation="slide-up" delay={300} className="lg:col-span-1">
            <ModernCard className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4">How to get the best results</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="text-blue-600 dark:text-blue-400 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Be specific with your questions for more accurate answers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-blue-600 dark:text-blue-400 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Include course codes for course-specific guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-blue-600 dark:text-blue-400 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Ask for step-by-step explanations for complex topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="text-blue-600 dark:text-blue-400 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Request practice questions to test your understanding</span>
                </li>
              </ul>
            </ModernCard>
          </AnimatedElement>

          {/* Main chat area */}
          <div className="lg:col-span-3 flex flex-col">
            <AnimatedElement animation="fade-in" delay={200}>
              <ModernCard className="flex flex-col h-[calc(100vh-16rem)] md:h-[70vh]">
                {/* Messages container */}
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.map((message, index) => (
                    <div 
                      key={message.id}
                      className={`slide-up mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`max-w-[80%] rounded-2xl p-4 shadow-md 
                        ${message.isUser 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
                      >
                        <p className="text-sm md:text-base">{message.content}</p>
                        <p className="text-right text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
                        <div className="flex space-x-2 items-center">
                          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick prompts */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 overflow-x-auto">
                  <div className="flex space-x-2">
                    {sampleTopics.map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickPrompt(topic)}
                        className="whitespace-nowrap px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input area */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 glass-morphism">
                  <div className="flex items-start space-x-2">
                    <textarea
                      className="flex-1 p-3 h-12 max-h-32 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ask me anything about your studies..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                    ></textarea>
                    <ModernButton 
                      onClick={handleSendMessage}
                      disabled={isLoading || inputText.trim() === ''}
                      className="self-end"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </ModernButton>
                  </div>
                </div>
              </ModernCard>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </div>
  );
}
