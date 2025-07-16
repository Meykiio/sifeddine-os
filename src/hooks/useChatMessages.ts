import { useState, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export const useChatMessages = (sessionId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = async (content: string, role: 'user' | 'assistant'): Promise<ChatMessage | null> => {
    try {
      const newMessage = {
        id: Date.now().toString(),
        content,
        role,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      console.error('Error adding message:', err);
      setError('Failed to add message');
      return null;
    }
  };

  const clearMessages = async () => {
    try {
      setMessages([]);
    } catch (err) {
      console.error('Error clearing messages:', err);
      setError(err instanceof Error ? err.message : 'Failed to clear messages');
    }
  };

  return {
    messages,
    loading,
    error,
    addMessage,
    clearMessages,
  };
};