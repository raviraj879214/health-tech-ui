// hooks/useNotifications.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [lastNotification, setLastNotification] = useState<any | null>(null);
  const [cookieuserid,setcookieuserid] = useState(0);

  useEffect(() => {


    const fetchNotifications = async () => {
      const resToken = await fetch("/api/auth/get-token");
      const token = await resToken.json();

     

    

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/notifications/user/0`,{
            method : "GET",
             headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        });

        if (res.ok) 
        {
          const notifications = await res.json();

            setNotifications(notifications);
      
        } 
        else
        {
          console.log("Fetch failed with status:", res.status);
        }
      }
      catch (error)
      {

        console.log("Error fetching notifications:", error);
      }

    };

   
    fetchNotifications();

    socket = io(`${process.env.NEXT_PUBLIC_NODEJS_URL}`);

    const fetchUserIdFromCookies = async () => {
      const res = await fetch("/api/auth/get-userid");
      const data = await res.json();
      return data.userid;
    };

    socket.on('receive_notification', (data) => {


      fetchUserIdFromCookies().then((userid) => {
        console.log("User ID:", userid);
          console.log("data.userId:", data.userId);

        if(data.userId == userid){
          setNotifications((prev) => [...prev, data]);
          setLastNotification(data.message);
        }

      });

      
      
      

    });

    return () => {
      socket.disconnect();
    };


  }, []);

  const sendNotification = (data: any) => {
    socket.emit('send_notification', data);
  };

  return { notifications, lastNotification, sendNotification };
};
