import { MessageSquare } from 'lucide-react';
import type { Message } from '../../backend';

interface MessagesPanelProps {
  messages: Message[];
}

export default function MessagesPanel({ messages }: MessagesPanelProps) {
  if (!messages || messages.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-8 h-8 text-pink-500" />
        </div>
        <p className="text-gray-600">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border border-pink-200"
        >
          <p className="text-gray-800 mb-2">{message.content}</p>
          <p className="text-xs text-gray-500">
            {new Date(Number(message.date) / 1000000).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
