'use client';

import React from 'react';

interface MessageProps {
  content: string;
  timestamp: string;
  isOwn: boolean;
  sender?: string;
}

export default function Message({ content, timestamp, isOwn, sender }: MessageProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[75%] ${isOwn ? 'order-2' : 'order-1'}`}>
        {!isOwn && sender && (
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 mb-1 block">{sender}</span>
        )}
        <div
          className={`rounded-2xl py-2 px-4 ${
            isOwn
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
          } shadow-sm`}
        >
          <p>{content}</p>
        </div>
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${isOwn ? 'text-right mr-2' : 'ml-2'}`}>
          {timestamp}
        </div>
      </div>
    </div>
  );
}
