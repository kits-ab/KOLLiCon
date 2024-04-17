import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSentCheck } from '@/utils/Redux/Notification/sentCheckSlice';

const backendIP = import.meta.env.VITE_API_URL;

interface MessageData {
  title: string;
  text: string;
  userEmails: string[];
}

export const useHandleSubmit = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const handleSubmit = async (
    title: string,
    text: string,
    userEmails: string[],
    onSuccess: () => void,
  ): Promise<void> => {
    setLoading(true);
    const messageData: MessageData = { title, text, userEmails };
    try {
      if (userEmails.length !== 0) {
        await axios.post(`${backendIP}/api/messages/send`, messageData);
        setSuccess('Meddelande skickat!');
        dispatch(setSentCheck(true));
        clearError();
        onSuccess();
      } else {
        setError('Inga användare att skicka till!');
        clearError();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Misslyckades att skicka meddelande!');
      clearError();
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 5000);
  };

  return { handleSubmit, loading, success, error };
};
