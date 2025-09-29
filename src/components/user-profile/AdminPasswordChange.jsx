
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export function AdminPassword() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [message,setmessage] = useState("");
  const [passwordbuttton,setpasswordbutton] = useState(false);

  const onPasswordUpdate =async (data) => {
    debugger;
    setpasswordbutton(true);
    console.log("Password update data:", data);
    const resdsd = await fetch("/api/auth/get-token");
        const token = await resdsd.json();
    const res =await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/admin-user/update-password`,{
        method : "PUT",
        headers :
        {
                "content-type" : "application/json",
            "Authorization": `Bearer ${token.token}`
        },
        body : JSON.stringify({
            "oldpassword": data.oldpassword,
            "newpassword": data.newpassword
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
  setpasswordbutton(false);
  };



  const newPassword = watch("newpassword");

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
        Change Password
      </h4>
      <p className="text-green-500 text-sm">{message}</p>
        <form onSubmit={handleSubmit(onPasswordUpdate)}>
  <div className="grid grid-cols-1 gap-4">

    {/* Old Password */}
    <div className="">
      <label className="mb-2 block text-xs text-gray-500 dark:text-gray-400">
        Old Password
      </label>
      <input
        type="password"
        placeholder="Enter old password"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white/90"
        {...register("oldpassword", { required: "Please enter old password" })}
      />
      {errors.oldpassword && (
        <p className="text-red-500 text-sm">{errors.oldpassword.message}</p>
      )}
    </div>

    {/* New Password */}
    <div>
      <label className="mb-2 block text-xs text-gray-500 dark:text-gray-400">
        New Password
      </label>
      <input
        type="password"
        placeholder="Enter new password"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white/90"
        {...register("newpassword", {
          required: "Please enter new password",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
            message:
              "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
          },
        })}
      />
      {errors.newpassword && (
        <p className="text-red-500 text-sm">{errors.newpassword.message}</p>
      )}
    </div>

    {/* Confirm Password */}
    <div>
      <label className="mb-2 block text-xs text-gray-500 dark:text-gray-400">
        Confirm Password
      </label>
      <input
        type="password"
        placeholder="Confirm new password"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white/90"
        {...register("confirmpassword", {
          required: "Please confirm your password",
          validate: (value) =>
            value === watch("newpassword") || "Passwords do not match",
        })}
      />
      {errors.confirmpassword && (
        <p className="text-red-500 text-sm">{errors.confirmpassword.message}</p>
      )}
    </div>

    {/* Submit Button */}
    <div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        disabled = {passwordbuttton}
      >
        
        {!passwordbuttton ? "Update Password" : "...."}
      </button>
    </div>

  </div>
</form>



    </div>
  );
}
