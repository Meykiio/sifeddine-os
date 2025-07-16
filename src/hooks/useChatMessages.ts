import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  session_id: string;
  created_at: string;
  updated_at: string;
}

export const useChatMessages = (sessionId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load existing messages for the session
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('session_id', sessionId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
      } catch (err) {
        console.error('Error loading messages:', err);
        setError(err instanceof Error ? err.message : 'Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      loadMessages();
    }
  }, [sessionId]);

  // Set up real-time subscription
  useEffect(() => {
    if (!sessionId) return;

    const subscription = supabase
      .channel(`chat_messages_${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const newMessage = payload.new as ChatMessage;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [sessionId]);

  const addMessage = async (content: string, role: 'user' | 'assistant'): Promise<ChatMessage | null> => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          content,
          role,
          session_id: sessionId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error adding message:', err);
      setError(err instanceof Error ? err.message : 'Failed to add message');
      return null;
    }
  };

  const clearMessages = async () => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('session_id', sessionId);

      if (error) throw error;
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