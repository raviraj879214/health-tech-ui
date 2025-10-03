"use client";
import { useEffect, useState } from "react";
import {formatBrazilDate} from "../../lib/formatDate";



export function AdminActivity({ userId }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
   const [restriction, setRestriction] = useState(false);

  const apiUrl = `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/admin-activity/admin-particular-activities/${userId}`;

  useEffect(() => {
    async function fetchActivities() {
      const resToken = await fetch("/api/auth/get-token");
      const token = await resToken.json();

      try {
        const res = await fetch(apiUrl,{
           method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch activities");
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, [apiUrl]);

  if (loading) return <p>Loading activities...</p>;

  if (!activities.length) return <p>No activities found.</p>;

    if (restriction) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md">
          <svg
            className="w-16 h-16 mx-auto text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
          <h2 className="text-2xl font-semibold mt-4 text-gray-800">
            Access Denied
          </h2>
          <p className="mt-2 text-gray-500">
            You do not have permission to view this content.
          </p>
          
        </div>
      </div>
      </>
    );
  }


  return (
    <div className="mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        Activity Timeline
      </h2>

      <div className="relative border-l-2 border-gray-300 dark:border-gray-600 ml-4">
        {activities.map((activity) => (
          <div key={activity.id} className="mb-10 ml-6 relative">
            <span className="absolute -left-5 top-0 w-4 h-4 bg-blue-600 rounded-full border-2 border-white dark:border-gray-800"></span>
            <time className="text-sm text-gray-500 dark:text-gray-400">
            
              {formatBrazilDate(activity.createdAt)}
            </time>

            <div className="mt-1 p-4 bg-gray-100 dark:bg-white/5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {activity.action}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {activity.description} from IP {activity.ipAddress}
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Browser: {activity.userAgent}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
