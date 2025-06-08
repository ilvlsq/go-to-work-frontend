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

interface ChatWindowProps {
  isVisible: boolean;
  onClose: () => void;
  onProcessingChange: (isProcessing: boolean) => void;
}

const CHAT_STORAGE_KEY = 'chat_messages';
const MAX_CONTEXT_MESSAGES = 6;
const LONG_MESSAGE_THRESHOLD = 450;

export const ChatWindow = ({ isVisible, onClose, onProcessingChange }: ChatWindowProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
      console.log('Загруженные сообщения:', savedMessages);

      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        console.log('Распарсенные сообщения:', parsedMessages);

        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
          checkMessagesLength(parsedMessages);
        } else {
          console.error('Загруженные данные не являются массивом:', parsedMessages);
          sessionStorage.removeItem(CHAT_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке сообщений:', error);
      sessionStorage.removeItem(CHAT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      if (messages.length > 0) {
        console.log('Сохраняем сообщения:', messages);
        sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (error) {
      console.error('Ошибка при сохранении сообщений:', error);
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        include_example: false,
      });

      const raw = data.message;
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
          <div className="flex items-center justify-between rounded-t-lg border-b bg-green-500 p-3 text-white">
            <h2 className="text-base font-semibold">Чат з ботом</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-3">
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
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    } ${!isInContext ? 'opacity-50' : ''}`}
                    title={
                      !isInContext ? 'Це повідомлення не входить в поточний контекст' : undefined
                    }
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkParse, remarkBreaks]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        code({ node, inline, className, children, ...props }: any) {
                          return (
                            <code
                              className={`${className} ${
                                inline
                                  ? 'rounded bg-gray-200 px-1 py-0.5'
                                  : 'my-2 block rounded-lg bg-gray-100 p-4'
                              }`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        pre({ node, children, ...props }) {
                          return (
                            <pre
                              className="my-2 overflow-x-auto rounded-lg bg-gray-100 p-4"
                              {...props}
                            >
                              {children}
                            </pre>
                          );
                        },
                        table({ node, children, ...props }) {
                          return (
                            <div className="my-4 overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200" {...props}>
                                {children}
                              </table>
                            </div>
                          );
                        },
                        th({ node, children, ...props }) {
                          return (
                            <th
                              className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                              {...props}
                            >
                              {children}
                            </th>
                          );
                        },
                        td({ node, children, ...props }) {
                          return (
                            <td
                              className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                              {...props}
                            >
                              {children}
                            </td>
                          );
                        },
                        strong({ node, children, ...props }) {
                          return (
                            <strong className="font-bold" {...props}>
                              {children}
                            </strong>
                          );
                        },
                        em({ node, children, ...props }) {
                          return (
                            <em className="italic" {...props}>
                              {children}
                            </em>
                          );
                        },
                        p({ node, children, ...props }) {
                          return (
                            <p className="mb-2" {...props}>
                              {children}
                            </p>
                          );
                        },
                        ul({ node, children, ...props }) {
                          return (
                            <ul className="mb-2 list-disc pl-5" {...props}>
                              {children}
                            </ul>
                          );
                        },
                        ol({ node, children, ...props }) {
                          return (
                            <ol className="mb-2 list-decimal pl-5" {...props}>
                              {children}
                            </ol>
                          );
                        },
                        li({ node, children, ...props }) {
                          return (
                            <li className="mb-1" {...props}>
                              {children}
                            </li>
                          );
                        },
                        blockquote({ node, children, ...props }) {
                          return (
                            <blockquote
                              className="my-2 border-l-4 border-gray-300 pl-4 italic"
                              {...props}
                            >
                              {children}
                            </blockquote>
                          );
                        },
                        a({ node, children, href, ...props }) {
                          return (
                            <a
                              href={href}
                              className="text-green-600 hover:text-green-700 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            >
                              {children}
                            </a>
                          );
                        },
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
                          className="text-green-600 hover:text-green-700 hover:underline"
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

          <div className="border-t p-3">
            <div className="flex space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Введіть повідомлення..."
                className="flex-1 resize-none rounded-lg border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="rounded-lg bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Відправити
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
