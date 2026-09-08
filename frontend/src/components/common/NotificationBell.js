import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../../context/NotificationContext';
import './NotificationBell.css';
const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  useEffect(() => { const handleClickOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); }; document.addEventListener('mousedown', handleClickOutside); return () => document.removeEventListener('mousedown', handleClickOutside); }, []);
  return <div className="notification-bell" ref={ref}>
    <button className="bell-button" onClick={() => setIsOpen(!isOpen)}>
      <span>🔔</span>
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </button>
    {isOpen && <div className="dropdown">
      <div className="dropdown-header"><span>Notifications</span>{unreadCount > 0 && <button className="mark-all" onClick={markAllAsRead}>Mark all read</button>}</div>
      <div className="dropdown-list">
        {notifications.length === 0 && <div className="empty">No notifications</div>}
        {notifications.map(n => <div key={n._id} className={`notification-item ${n.read ? 'read' : 'unread'}`} onClick={() => markAsRead(n._id)}>
          <div className="notif-title">{n.title}</div>
          <div className="notif-message">{n.message}</div>
          <div className="notif-time">{new Date(n.createdAt).toLocaleString()}</div>
        </div>)}
      </div>
    </div>}
  </div>;
};
export default NotificationBell;
