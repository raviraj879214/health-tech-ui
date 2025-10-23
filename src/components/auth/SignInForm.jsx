"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import { useRouter } from "next/navigation";

export default function SignInForm({ returl }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [message,setmessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();


  async function getToken() {
    const res = await fetch("/api/auth/get-token");
    
    const data = await res.json();
    console.log(data); // { token: "your-token-value" }
  }




  const handlelogin = async (data) => {
    debugger;
    setLoading(true);
    
    const env = process.env.NEXT_PUBLIC_ENV;        // "staging"
    const apiUrl = process.env.NEXT_PUBLIC_NODEJS_URL;  // "https://staging-api.example.com"

    console.log("Environment:", env);
    console.log("API URL:", apiUrl);



    try {
    
      const res =await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/auth/login`,{
        method : "POST",
       headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          email : data.email,
           password : data.password,
        })
      });
      debugger;
      if(res.status == 401){
        setmessage("Invalid credntials");
      }

      if(res.ok){
        const result = await res.json();
        if(res.status == 201){
           await fetch("/api/auth/set-token", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ token: result.access_token ,  }),});
           await fetch("/api/auth/set-email", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ email : result.user.email ,  }),});
           await fetch("/api/auth/set-firstname", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ firstname: result.user.firstname })});
           await fetch("/api/auth/set-lastname", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ lastname: result.user.lastname })});
           await fetch("/api/auth/set-admin-role", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ adminrole: result.user.role.name })});
           await fetch("/api/auth/set-userid", {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify({ userid: result.user.id })});
           


           await getToken();
           if(returl != ""){router.push(returl);}else{
              router.push('/admin')
           }
  
        }

      }
      else{
        const errorData = await res.json();
        setmessage(errorData.message);
        console.log("Error:", res.status, errorData);
      }
    } 
    catch (error)
    {
      alert(error.message);
    } 
    finally 
    {
      setLoading(false);
    }
  };



  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      {/* Back Link */}
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        {/* <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link> */}
      </div>

      {/* Sign-in Form */}
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign In  
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enter your email and password to sign in! {process.env.NEXT_PUBLIC_ENV}
          </p>
        </div>

        <div className="relative py-3 sm:py-5">
          {/* <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
              Or
            </span>
          </div> */}
        {message && <span className="text-red-500">{message}</span>}

        </div>

       <form onSubmit={handleSubmit(handlelogin)} className="space-y-6">
            {/* Email */}
            <div>
              <Label>Email <span className="text-error-500">*</span></Label>
              <input
                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
                  ${errors.email ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"}`}
                placeholder="info@gmail.com"
                type="email"
                {...register("email", { required: "Please enter email" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label>Password <span className="text-error-500">*</span></Label>
              <div className="relative">
                <input
                  className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
                    ${errors.password ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-blue-300"}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", { required: "Please enter password" })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 hidd">
                {/* <Checkbox checked={isChecked} onChange={setIsChecked} /> */}
                <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                  {/* Keep me logged in */}
                </span>
              </div>
              <Link
                href="/reset-password"
                className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <div>
              <Button disabled={loading} type="submit" className="w-full" size="sm">
                {loading ? "Signing..." : "Sign in"}
              </Button>
            </div>
          </form>




        {/* Sign Up Link */}
        <div className="mt-5">
          <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
