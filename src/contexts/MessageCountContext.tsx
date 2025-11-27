// MessageCountContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MessageCountContextType {
  totalMessages: number;
  setTotalMessages: (value: number) => void;
}

// 1) Create the context
const MessageCountContext = createContext<MessageCountContextType>({
  totalMessages: 0,
  setTotalMessages: () => {},
});

// 2) Provider component that wraps the app
export const MessageCountProvider = ({ children }: { children: ReactNode }) => {
  const [totalMessages, setTotalMessages] = useState(0);

  return (
    <MessageCountContext.Provider value={{ totalMessages, setTotalMessages }}>
      {children}
    </MessageCountContext.Provider>
  );
};

// 3) Custom hook to use it easily
export const useMessageCount = () => useContext(MessageCountContext);
