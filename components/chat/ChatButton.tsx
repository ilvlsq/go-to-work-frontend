'use client';

import { useState } from 'react';
import { ChatWindow } from './ChatWindow';
import { useUser } from '@/context/UserContext';
import { RiRobot2Line } from 'react-icons/ri';

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
        className="fixed bottom-6 right-6 z-50 flex items-center rounded-lg bg-[#5a889d] px-6 py-3 text-white shadow-lg transition-all duration-300 ease-in-out hover:bg-[#5a889d]/80"
      >
        Чат з ботом <RiRobot2Line className="ml-2 inline-block" />
      </button>
      <ChatWindow
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onProcessingChange={setIsProcessing}
      />
    </>
  );
};
