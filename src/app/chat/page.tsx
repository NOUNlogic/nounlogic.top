"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
    <AnimatedElement animation="fade-in" className="h-[calc(100vh-4rem)]">
      <div className="flex h-full bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <ModernCard 
          className="w-full sm:w-80 flex flex-col rounded-none sm:rounded-r-none h-full"
          shadow="none"
          bordered={false}
        >
          {/* Search bar */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full p-2 pl-10 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <svg
                className="absolute left-3 top-3 h-4 w-4 text-gray-500"
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

          {/* Tabs with animated underline */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 relative">
            <button
              className={`flex-1 py-3 px-4 text-center transition-colors duration-300 ${
                activeTab === 'chats'
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('chats')}
            >
              Chats
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center transition-colors duration-300 ${
                activeTab === 'contacts'
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('contacts')}
            >
              Contacts
            </button>
            <button
              className={`flex-1 py-3 px-4 text-center transition-colors duration-300 ${
                activeTab === 'groups'
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab('groups')}
            >
              Groups
            </button>
            
            {/* Animated underline */}
            <div className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300"
              style={{
                left: activeTab === 'chats' ? '0%' : activeTab === 'contacts' ? '33.333%' : '66.666%',
                width: '33.333%'
              }}
            ></div>
          </div>

          {/* Contact list with hover effects */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className={`
                  flex items-center p-4 border-b border-gray-200 dark:border-gray-700 
                  transition-colors duration-300 cursor-pointer
                  ${activeChat === contact.id 
                    ? 'bg-blue-50 dark:bg-blue-900/20' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'}
                `}
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
        </ModernCard>

        {/* Chat area with animations */}
        <div className="hidden sm:flex flex-col flex-1 bg-gray-50 dark:bg-gray-900">
          {activeChat ? (
            <>
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
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

              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
                {messages.map((message, index) => (
                  <Message
                    key={message.id}
                    content={message.content}
                    timestamp={message.timestamp}
                    isOwn={message.isOwn}
                    sender={message.sender}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
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
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    onClick={handleSendMessage}
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
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="text-6xl mb-6">👋</div>
              <h2 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-300">Select a conversation</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Choose from your existing conversations or start a new chat with a fellow student.
              </p>
            </div>
          )}
        </div>
      </div>
    </AnimatedElement>
  );
}
