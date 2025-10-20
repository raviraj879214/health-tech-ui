

import { useNotifications } from '../../hooks/useNotifications';


export default function NotificationsComponent() {
  const { notifications, sendNotification } = useNotifications();

  
  return (
    <div>
      <button onClick={() => sendNotification({ message: 'Hello World!' })}>
        Send Notification
      </button>

      <ul>
        {notifications.map((n, i) => (
          <li key={i}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
}
