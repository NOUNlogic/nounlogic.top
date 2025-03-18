'use client';

import { useEffect, useRef } from 'react';

type MessageProps = {
  content: string;
  timestamp: string;
  isOwn: boolean;
  sender?: string;
};

export default function Message({ content, timestamp, isOwn, sender }: MessageProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={messageRef}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          max-w-[70%] rounded-2xl p-4 shadow-lg
          transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5
          ${isOwn
            ? 'bg-primary text-white'
            : 'glass-morphism dark:bg-gray-800/90'
          }
        `}
      >
        {!isOwn && sender && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium">{sender}</p>
        )}
        <p className="text-sm">{content}</p>
        <p className="text-xs text-right mt-1 opacity-70">{timestamp}</p>
      </div>
    </div>
  );
}

// Add to globals.css
// @keyframes appear {
//   from { opacity: 0; transform: translateY(10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-message {
//   animation: appear 0.3s ease-out forwards;
// }
