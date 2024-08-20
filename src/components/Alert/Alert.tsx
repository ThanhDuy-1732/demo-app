'use client';

// Utilities
import React, { useCallback } from "react";

// Stores
import useAlertStore, { Message as MessageDataProp } from "./services/alert.store";

// Components
import { Alert } from "antd";

type MessageProp = MessageDataProp & {
  handleMessageCloseClick: (id: string) => void;
};

const Message: React.FC<React.PropsWithChildren<MessageProp>> = ({ id, message, type, handleMessageCloseClick }) => {
  return (
    <Alert className="w-fit" message={message} type={type} showIcon closable afterClose={() => handleMessageCloseClick(id)} />
  )
}

const CustomAlert: React.FC = () => {
  const messages = useAlertStore((state) => state.messages);
  const removeMessage = useAlertStore((state) => state.deleteMessage);

  const handleMessageCloseClick = useCallback((id: string) => {
    removeMessage(id);
  }, [removeMessage]);

  return (
    <div className="absolute top-4 right-0 flex flex-col gap-2 z-20">
      {
        (messages || []).map((message) => {
          return (
            <Message key={message.id} {...message} handleMessageCloseClick={handleMessageCloseClick} />
          )
        })
      }
    </div>
  )
}

export default CustomAlert;