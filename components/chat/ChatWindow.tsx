'use client';

import { useEffect, useRef, useState } from 'react';
import { ChatMessage } from '@/types/types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { motion, AnimatePresence } from 'framer-motion';
import { sendChatMessage } from '@/services/api/chat';
import { RiExpandUpDownLine } from 'react-icons/ri';

interface ChatWindowProps {
  isVisible: boolean;
  onClose: () => void;
  onProcessingChange: (isProcessing: boolean) => void;
}

const CHAT_STORAGE_KEY = 'chat_messages';
const MAX_CONTEXT_MESSAGES = 6;
const LONG_MESSAGE_THRESHOLD = 450;

const formatServerResponse = (response: string): string => {
  const userReplaced = response.replace(/Користувач:/g, 'Приклад вашої відповіді:');

  const assistantIndex = userReplaced.indexOf('Асистент:');

  if (assistantIndex !== -1) {
    return userReplaced.slice(0, assistantIndex).trim();
  }

  return userReplaced.trim();
};

export const ChatWindow = ({ isVisible, onClose, onProcessingChange }: ChatWindowProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [includeExample, setIncludeExample] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const checkMessagesLength = (messages: ChatMessage[]) => {
    const hasLongMessage = messages.some(
      (message) => message.content.length > LONG_MESSAGE_THRESHOLD,
    );
    if (hasLongMessage) {
      setIsExpanded(true);
    }
  };

  useEffect(() => {
    try {
      const savedMessages = sessionStorage.getItem(CHAT_STORAGE_KEY);
      console.log('Завантажені повідомлення:', savedMessages);

      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        console.log('Розпарсені повідомлення:', parsedMessages);

        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
          checkMessagesLength(parsedMessages);
        } else {
          console.error('Завантажені дані не є масивом:', parsedMessages);
          sessionStorage.removeItem(CHAT_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Помилка при завантаженні повідомлень:', error);
      sessionStorage.removeItem(CHAT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      if (messages.length > 0) {
        console.log('Збереження повідомлень:', messages);
        sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (error) {
      console.error('Помилка при збереженні повідомлень:', error);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    const container = chatWindowRef.current?.querySelector('.overflow-y-auto');
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
      setShowScrollButton(!isAtBottom);
    }
  };

  useEffect(() => {
    const container = chatWindowRef.current?.querySelector('.overflow-y-auto');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setInput('');
    setIsLoading(true);
    onProcessingChange(true);

    try {
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);

      const contextMessages = updatedMessages.slice(-MAX_CONTEXT_MESSAGES);
      const data = await sendChatMessage({
        messages: contextMessages.map(({ role, content }) => ({ role, content })),
        include_example: includeExample,
      });

      console.log('data', data.message);
      const raw = formatServerResponse(data.message);
      console.log('raw', raw);
      const exampleUrl = data.example_url;

      if (raw.length > LONG_MESSAGE_THRESHOLD) {
        setIsExpanded(true);
      }

      const botMessage: ChatMessage = {
        role: 'assistant',
        content: raw,
        timestamp: Date.now(),
        example_url: exampleUrl,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      onProcessingChange(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const removeStars = (content: string) => {
    return content.replace(/\*/g, '');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={chatWindowRef}
          initial={{ scale: 1, opacity: 0, y: 0 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 0 }}
          className={`fixed bottom-6 right-6 flex flex-col rounded-lg bg-white shadow-xl ${
            isExpanded ? 'h-[600px] w-[800px]' : 'h-[500px] w-[350px]'
          } z-50 transition-all duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between rounded-t-lg border-b bg-[#5a889d] p-3 text-white">
            <h2 className="text-base font-semibold">Чат з ботом</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="rounded p-1 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                aria-label={isExpanded ? 'Зменшити розмір' : 'Збільшити розмір'}
              >
                <RiExpandUpDownLine className="h-5 w-5" />
              </button>
              <button onClick={onClose} className="text-white hover:text-gray-200">
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-3" onScroll={handleScroll}>
            {messages.map((message, index) => {
              const isInContext = index >= messages.length - MAX_CONTEXT_MESSAGES;
              return (
                <div
                  key={message.timestamp}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-2 ${
                      message.role === 'user'
                        ? 'bg-[#5a889d] text-white'
                        : 'bg-gray-100 text-gray-800'
                    } ${!isInContext ? 'opacity-50' : ''}`}
                    title={
                      !isInContext ? 'Це повідомлення не входить в поточний контекст' : undefined
                    }
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ node, children, href, ...props }) => (
                          <a
                            href={href}
                            className="text-blue-600 hover:text-blue-700 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                            {...props}
                          >
                            {children}
                          </a>
                        ),
                        p: ({ node, children, ...props }) => (
                          <p className="mb-2" {...props}>
                            {typeof children === 'string' ? removeStars(children) : children}
                          </p>
                        ),
                        ul: ({ node, children, ...props }) => (
                          <ul className="mb-2 list-disc pl-5" {...props}>
                            {children}
                          </ul>
                        ),
                        ol: ({ node, children, ...props }) => (
                          <ol className="mb-2 list-decimal pl-5" {...props}>
                            {children}
                          </ol>
                        ),
                        li: ({ node, children, ...props }) => (
                          <li className="mb-1" {...props}>
                            {children}
                          </li>
                        ),
                        code: ({ node, className, children, ...props }) => (
                          <code
                            className={`${className} ${'rounded bg-gray-200 px-1 py-0.5'}`}
                            {...props}
                          >
                            {children}
                          </code>
                        ),
                        pre: ({ node, children, ...props }) => (
                          <pre
                            className="my-2 overflow-x-auto rounded-lg bg-gray-100 p-4"
                            {...props}
                          >
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                    {message.example_url && (
                      <div className="mt-2 text-sm text-gray-500">
                        <a
                          href={message.example_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          Приклад резюме
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg bg-gray-100 p-2">
                  <div className="animate-pulse">Друкую відповідь...</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToBottom}
              className={`absolute right-4 rounded-full bg-[#5a889d] p-2 text-white shadow-lg hover:bg-[#5a889d]/80 focus:outline-none focus:ring-2 focus:ring-[#5a889d] focus:ring-offset-2 ${
                isExpanded ? 'bottom-28' : 'bottom-32'
              }`}
              aria-label="Прокрутити вниз"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.button>
          )}

          <div className="border-t p-3">
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Введіть повідомлення..."
                  className="flex-1 resize-none rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5a889d]"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="rounded-lg bg-[#5a889d] px-3 py-2 text-sm text-white hover:bg-[#5a889d]/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Відправити
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="example-toggle"
                  checked={includeExample}
                  onChange={(e) => setIncludeExample(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#5a889d] focus:ring-[#5a889d]"
                />
                <label htmlFor="example-toggle" className="text-sm text-gray-600">
                  Додати посилання на приклад резюме до відповіді
                </label>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
