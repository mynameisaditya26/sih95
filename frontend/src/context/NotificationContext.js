import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import { useSocket } from './SocketContext';
import { useAuth } from './AuthContext';
const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { socket } = useSocket();
  const { user } = useAuth();
  const fetchNotifications = async () => { try { const res = await api.get('/notifications'); setNotifications(res.data); } catch(e) {} };
  const fetchUnreadCount = async () => { try { const res = await api.get('/notifications/unread-count'); setUnreadCount(res.data.count); } catch(e) {} };
  const markAsRead = async (id) => { try { await api.put(`/notifications/${id}/read`); fetchNotifications(); fetchUnreadCount(); } catch(e) {} };
  const markAllAsRead = async () => { try { await api.put('/notifications/read-all'); fetchNotifications(); fetchUnreadCount(); } catch(e) {} };
  useEffect(() => { if (user) { fetchNotifications(); fetchUnreadCount(); } }, [user]);
  useEffect(() => {
    if (!socket) return;
    const events = ['inspection_assigned','gps_verified','evidence_uploaded','inspection_submitted','violation_detected','critical_alert'];
    events.forEach(ev => socket.on(ev, () => { fetchNotifications(); fetchUnreadCount(); }));
    return () => events.forEach(ev => socket.off(ev));
  }, [socket]);
  return <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>{children}</NotificationContext.Provider>;
};
