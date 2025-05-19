import { useState, useEffect, useRef } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';

export default function ChatbotUI() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I’m your University Copilot. Ask me anything 📚' },
  ]);

  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  // 👉 Send message to Ollama
  const sendToOllama = async (prompt) => {
    try {
      const response = await fetch('http://127.0.0.1:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'deepseek-r1:1.5b', // use your model name here
          prompt: prompt,
          stream: false, // use true later if you want to stream response
        }),
      });

      const data = await response.json();
      return data.response || 'Sorry, I couldn’t understand that.';
    } catch (error) {
      console.error('Error talking to Ollama:', error);
      return '⚠️ Something went wrong. Please try again.';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsBotTyping(true);

    const botReplyText = await sendToOllama(input);

    const botMessage = { sender: 'bot', text: botReplyText };
    setMessages((prev) => [...prev, botMessage]);
    setIsBotTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-slate1 dark:bg-slate12 text-slate12 dark:text-slate1">
      {/* Header */}
      <header className="p-4 border-b border-slate6 dark:border-slate10 text-xl font-bold">
        🎓 University Copilot
      </header>

      {/* Chat Window */}
      <ScrollArea className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'bot' && (
              <Avatar>
                <AvatarImage src="/bot-avatar.png" />
                <AvatarFallback>🤖</AvatarFallback>
              </Avatar>
            )}

            <div
              className={`p-3 rounded-xl max-w-md text-sm ${
                msg.sender === 'user'
                  ? 'bg-tomato4 dark:bg-tomato10 text-white'
                  : 'bg-slate3 dark:bg-slate11 text-slate12 dark:text-slate1'
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <Avatar>
                <AvatarImage src="/user-avatar.png" />
                <AvatarFallback>🧑</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isBotTyping && (
          <div className="flex items-center gap-3 justify-start animate-pulse">
            <Avatar>
              <AvatarFallback>🤖</AvatarFallback>
            </Avatar>
            <div className="bg-slate4 dark:bg-slate9 text-slate11 dark:text-slate1 p-3 rounded-xl max-w-md text-sm">
              Typing...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-slate6 dark:border-slate10 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 p-2 rounded-lg bg-slate2 dark:bg-slate10 text-slate12 dark:text-slate1 placeholder-slate8 dark:placeholder-slate6 outline-none"
        />
        <button
          onClick={handleSend}
          disabled={isBotTyping}
          className="bg-green9 dark:bg-green10 text-white px-4 py-2 rounded-lg hover:brightness-110 transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
