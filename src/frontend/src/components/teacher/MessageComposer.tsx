import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSendMessage } from '../../hooks/useSendMessage';
import { Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function MessageComposer() {
  const [content, setContent] = useState('');
  const sendMessage = useSendMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await sendMessage.mutateAsync(content);
      toast.success('Message sent to all students!');
      setContent('');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="content">Message Content</Label>
        <Textarea
          id="content"
          placeholder="Type your message or homework assignment here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="mt-1"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        disabled={sendMessage.isPending || !content.trim()}
      >
        {sendMessage.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
