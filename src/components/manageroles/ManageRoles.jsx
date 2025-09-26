"use client"
import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useForm } from "react-hook-form";
import BasicTableOne from "../tables/BasicTableOne";
import {RolesList} from "../../components/manageroles/RoleLists";

export function ManageRole() {
  const { register, handleSubmit, formState: { errors }, getValues , reset , setValue } = useForm();
  const [message,setmessage] = useState("");
  const [rolebutton,setrolebutton] = useState("");
  const [roleid , setroleid] = useState(0);


  const onsubmit =async (data) => {
      setrolebutton(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/roles`,{
        method : "POST",
        headers:{
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          name : data.rolename
        })
      });

      if(res.ok){
        const result = await res.json();
        setmessage(result.message);
        reset();
        setTimeout(() => {
          setmessage("");
        }, 3000);
      }
      setrolebutton(false);

  };


  const handleChildData= async (id,name)=>{
      setValue("rolename",name);
      setroleid(id);
  }


  const onUpdate=async (data)=>{
    setrolebutton(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/roles/${roleid}`,{
        method : "PUT",
        headers:{
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          name : data.rolename
        })
      });

      if(res.ok){
        const result = await res.json();
        setmessage(result.message);
        reset();
        setroleid(0);
        setTimeout(() => {
          setmessage("");
        }, 3000);
      }
    setrolebutton(false);

  }

  const handleChildDelete=(data)=>{
    if(data == true){
       setrolebutton(true);

       setTimeout(() => {
          setrolebutton(false);
       }, 1000);

    }
  }






  return (<>
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 sm:col-span-6 space-y-5 sm:space-y-6">

    

        <ComponentCard title="" desc="">
           <p className="text-green-500 text-sm"> {message}</p>
              
        
          <form onSubmit={handleSubmit(roleid > 0 ? onUpdate : onsubmit)}>


            <div className="space-y-5 sm:space-y-6">
              {/* Role Input */}
            <div>
                <Label>Role</Label>
                <input
                    type="text"
                    className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                    ${errors.rolename ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                    defaultValue={getValues("rolename")}
                    {...register("rolename", {
                        required: "Please enter role name",
                        pattern: {
                        value: /^[A-Za-z\s]+$/, // only letters and spaces
                        message: "Role name should contain only letters"
                        }
                    })}
                    placeholder="Enter role"
                />
                {errors.rolename && (
                    <p className="text-red-500 text-sm">{errors.rolename.message}</p>
                )}
            </div>


              <div className="w-full px-2.5">
                <button
                  type="submit"
                  className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors">
                   {roleid > 0 ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </form>

          
        </ComponentCard>
      </div>
    </div>


     <ComponentCard title="Manage Roles List" desc="">

         <RolesList trigger={rolebutton} sendData = {handleChildData} sendDelete= {handleChildDelete}></RolesList>

     </ComponentCard>
    
  </>);
}
