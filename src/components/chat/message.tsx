type MessageProps = {
  content: string;
  timestamp: string;
  isOwn: boolean;
  sender?: string;
};

export default function Message({ content, timestamp, isOwn, sender }: MessageProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isOwn
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
        }`}
      >
        {!isOwn && sender && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{sender}</p>
        )}
        <p className="text-sm">{content}</p>
        <p className="text-xs text-right mt-1 opacity-70">{timestamp}</p>
      </div>
    </div>
  );
}
