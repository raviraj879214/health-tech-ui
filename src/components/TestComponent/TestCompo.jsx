"use client";
import { useEffect, useState } from "react";

export function TestCo() {
  const [restriction, setRestriction] = useState(false);








  const fetchdata =async ()=>{
    debugger;
    const resdsd = await fetch("/api/auth/get-token");
    const token = await resdsd.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/test/orders`,{
        method : "GET",
        headers:{
          "content-type" : "application/json",
           "Authorization": `Bearer ${token.token}`,
        },
    });

     if (res.status === 403) {
      setRestriction(true);
      return;
    }

    if(res.ok){
        const result = await res.json();
    }
  }


  useEffect(()=>{

    fetchdata();

  },[]);



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





  return (<>
  




  
  </>);
}
