'use client';

import { useState } from 'react';
import { ChatWindow } from './ChatWindow';
import { useUser } from '@/context/UserContext';

export const ChatButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();

  if (false) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 right-6 z-50 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-green-600"
      >
        Чат з ботом
      </button>
      <ChatWindow
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onProcessingChange={setIsProcessing}
      />
    </>
  );
};
