import { ChatPayload } from '@/types/types';

const API_BASE_URL = 'http://35.180.166.154:8000';

export async function sendChatMessage(payload: ChatPayload) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to get response from chat service');
  }

  return response.json();
}
