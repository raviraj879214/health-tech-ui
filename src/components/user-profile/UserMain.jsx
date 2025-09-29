"use client"
import { useEffect, useState } from "react";
import UserAddressCard from "./UserAddressCard";
import UserInfoCard from "./UserInfoCard";
import UserMetaCard from "./UserMetaCard";
import {AdminPassword} from "../user-profile/AdminPasswordChange";



export function UserMainArea(){

    const [userdetails , setuserdetails] = useState([]);
    const [triggerbutton,settriggerbutton] = useState(false);
    const [modal,stemodal] = useState(false);


    const fetchadminuser =async ()=>{
         const resdsd = await fetch("/api/auth/get-token");
            const token = await resdsd.json();
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/admin-user`,{
            method : "GET",
            headers:{
                "content-type" : "application/json",
                 "Authorization": `Bearer ${token.token}`
            }
        });

        if(res.ok){
            const result =await res.json();
            setuserdetails(result.data);
        }
    }

    useEffect(()=>{

        fetchadminuser();

    },[triggerbutton]);


    const childFormUpdate =async (data)=>{
        debugger;
        console.log("data",data);
        debugger;
        const resdsd = await fetch("/api/auth/get-token");
        const token = await resdsd.json();
        const res =await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/admin-user`,{
            method : "PUT",
            headers :
            {
                 "content-type" : "application/json",
                "Authorization": `Bearer ${token.token}`
            },
            body : JSON.stringify({
                "firstname" : data.firstname,
                "lastname" : data.lastname,
                "address" : data.address,
                "country" : data.country,
                "phone" : data.phone,
                "postalcode" : data.postalcode,
                "state" : data.state,
                "Bio" : data.Bio
            })
        });
        if(res.ok)
        {
            settriggerbutton(true);

            setTimeout(() => {

                 settriggerbutton(false);

            }, 3000);
        }
    }


    return(<>
            <UserMetaCard user={userdetails}   />
            <UserInfoCard  user={userdetails} sendUpdatedata={childFormUpdate} />
            <UserAddressCard  user={userdetails} sendUpdatedata={childFormUpdate} />

            <AdminPassword></AdminPassword>



    </>);
}