

// hooks/useNotifications.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    socket = io('http://localhost:8000'); // your NestJS server

    socket.on('receive_notification', (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendNotification = (data: any) => {
    socket.emit('send_notification', data);
    socket.emit('send_notification', data);
  };




  return { notifications, sendNotification };
};
