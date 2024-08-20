// Utilities
import { create } from "zustand";
import { v6 as uuidv6 } from 'uuid';

export enum MessageType {
  error =  'error',
  warning = 'warning',
  success = 'success',
}

export type Message = {
  id: string,
  message: string,
  type: MessageType,
}

export type AlertState = {
  messages: Message[],
}

export type AlertAction = {
  reset: () => void,
  deleteMessage: (id: string) => void,
  addMessage: (data: Omit<Message, 'id'>) => void,
}

const useAlertStore = create<AlertState & AlertAction>((set, get) => {
  const deleteMessage = (id: string) => {
    set((state) => {
      const messages = state.messages.filter((message) => message.id !== id);
      return {
        messages,
      }
    })  
  }

  const addMessage = (data: Omit<Message, 'id'>) => {
    const id = uuidv6();

    set((state) => ({
      messages: [
        ...state.messages,
        {
          id,
          ...data,
        }
      ].slice(-5)
    }));

    if (data.type !== MessageType.error) {
      setTimeout(() => {
        deleteMessage(id);
      }, 2000);
    }
  };

  const reset = () => {
    set(() => ({ messages: [] }))
  }

  return {
    messages: [],
    
    reset,
    addMessage,
    deleteMessage,
  }
});

export default useAlertStore;