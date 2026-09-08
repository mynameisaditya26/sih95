import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';
const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);
export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    if (!user) { if (socket) socket.disconnect(); return; }
    const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, [user]);
  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
