"use client";

import { useState, useEffect, useRef } from 'react';
import ModernCard from '@/components/ui/modern-card';
import Message from '@/components/chat/message';
import AnimatedElement from '@/components/ui/animated-element';

type Contact = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
};

type MessageType = {
  id: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  sender?: string;
};

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'groups'>('chats');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This would be replaced with actual API calls in a real app
    const mockContacts: Contact[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: '/avatars/sarah.jpg',
        lastMessage: 'Did you get the assignment details?',
        time: '10:42 AM',
        unread: 2,
      },
      {
        id: '2',
        name: 'Daniel Okoye',
        avatar: '/avatars/daniel.jpg',
        lastMessage: 'I\'ll be at the study group tomorrow',
        time: 'Yesterday',
        unread: 0,
      },
      {
        id: '3',
        name: 'Amina Ibrahim',
        avatar: '/avatars/amina.jpg',
        lastMessage: 'Thanks for helping with the project!',
        time: 'Yesterday',
        unread: 0,
      },
      {
        id: '4',
        name: 'Computer Science Group',
        avatar: '/avatars/cs-group.jpg',
        lastMessage: 'Prof: Class will start at 2pm tomorrow',
        time: 'Monday',
        unread: 5,
      },
    ];
    
    setContacts(mockContacts);
  }, []);

  useEffect(() => {
    // Load messages when a chat is selected
    if (activeChat) {
      const mockMessages: MessageType[] = [
        {
          id: '1',
          content: 'Hey there! Have you started on the assignment yet?',
          timestamp: '10:30 AM',
          isOwn: false,
          sender: 'Sarah Johnson',
        },
        {
          id: '2',
          content: 'Not yet, I was planning to start tonight. Do you have the requirements?',
          timestamp: '10:35 AM',
          isOwn: true,
        },
        {
          id: '3',
          content: 'Yes, let me send you the PDF from the professor.',
          timestamp: '10:36 AM',
          isOwn: false,
          sender: 'Sarah Johnson',
        },
        {
          id: '4',
          content: 'That would be great! Thanks a lot.',
          timestamp: '10:38 AM',
          isOwn: true,
        },
        {
          id: '5',
          content: 'No problem! I\'ll also send you my notes from the last lecture.',
          timestamp: '10:40 AM',
          isOwn: false,
          sender: 'Sarah Johnson',
        },
      ];
      setMessages(mockMessages);
    }
  }, [activeChat]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    
    const newMessage: MessageType = {
      id: `new-${Date.now()}`,
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    
    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Enhanced sidebar with glass morphism */}
      <div className="w-full sm:w-80 glass-morphism overflow-hidden flex flex-col">
        {/* Search bar with floating animation */}
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 pl-12 rounded-xl bg-white/50 dark:bg-gray-800/50 
                backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50
                focus:ring-2 ring-primary/20 transition-all duration-300
                group-hover:shadow-lg"
            />
            <svg
              className="absolute left-4 top-4 h-5 w-5 text-gray-400 transition-transform duration-300
                group-hover:scale-110 group-hover:text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Enhanced tabs */}
        <div className="flex p-2 gap-2">
          {['chats', 'contacts', 'groups'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300
                ${activeTab === tab 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Animated contact list */}
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact, index) => (
            <div
              key={contact.id}
              className={`slide-up flex items-center p-4 cursor-pointer
                transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50
                ${activeChat === contact.id ? 'bg-white/80 dark:bg-gray-800/80' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setActiveChat(contact.id)}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {contact.unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center scale-in">
                    {contact.unread}
                  </span>
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {contact.name}
                  </h3>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced chat area */}
      <div className="hidden sm:flex flex-col flex-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        {activeChat ? (
          <div className="flex-1 flex flex-col fade-scale">
            {/* Chat header with animations */}
            <div className="glass-morphism p-4 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="/avatars/sarah.jpg"
                  alt="Sarah Johnson"
                  className="w-10 h-10 rounded-full shadow-md"
                />
                <div className="ml-4">
                  <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                    Sarah Johnson
                  </h2>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages with enhanced animations */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className="slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Message {...message} />
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Enhanced message input */}
            <div className="glass-morphism p-4">
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 p-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button 
                  onClick={handleSendMessage}
                  className="p-3 bg-primary hover:bg-primary-dark text-white rounded-xl
                    transition-all duration-300 hover:shadow-lg hover:shadow-primary/20
                    active:scale-95"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center float p-8">
              <div className="text-6xl mb-6">👋</div>
              <h2 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-300">Select a conversation</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Choose from your existing conversations or start a new chat with a fellow student.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
