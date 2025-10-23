"use client"
import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { DropDownSearchesSeo } from "../manageseo/DropDown";
import { useForm } from "react-hook-form";



export function ManageSeoPage() {

    const { register, reset, formState: { errors }, handleSubmit, setValue } = useForm();
    const [tagValue, setTagValue] = useState("");
    const [button,setbutton] = useState(false);
    const [message,setmessage] = useState("");
    const [restriction, setRestriction] = useState(false);

    const OnPageTrigger =async (data)=>{

        setbutton(true);
        if(!data){
            reset();
            setbutton(false);
        }

        const resToken = await fetch("/api/auth/get-token");
        const { token } = await resToken.json();

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/seo/get-seo-page-details/${data}`,{
             method : "GET",
             headers: { Authorization: `Bearer ${token}` },
        });
        if(res.ok){
            const result = await res.json();
            setValue("title",result.data.title);
            setValue("slug",result.data.slug);
            setValue("metaTitle",result.data.meta_title);
            setValue("metaKeywords",result.data.meta_keywords);
            setValue("metaDescription",result.data.meta_desc);
        }

    }





const onUpdate = async (data) => {
  try {
    // Get token
    const resToken = await fetch("/api/auth/get-token");
    if (!resToken.ok) throw new Error("Failed to get token");

    const { token } = await resToken.json();

    // Update SEO page
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/seo/update-seo-page-details`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Important!
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: Number(tagValue.code) ,
          title: data.title,
          slug: data.slug,
          content: "", // optional, can be data.content
          meta_title: data.metaTitle,
          meta_desc: data.metaDescription,
          meta_keywords: data.metaKeywords,
        }),
      }
    );

    const result = await res.json();

    if (!res.ok) {
      setmessage(result.message || "Failed to update SEO page");
      setTimeout(() => setmessage(""), 3000);
      return;
    }

    // Success
    setTagValue("");
    reset();
    setbutton(false);
    setmessage(result.message || "SEO updated successfully");

    setTimeout(() => setmessage(""), 3000);
  } catch (error) {
    console.error(error);
    setmessage(error.message || "Something went wrong");
    setTimeout(() => setmessage(""), 3000);
  }
};



 const handleChildData = (data) => {
     setRestriction(true);
  };



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

        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">
                <ComponentCard title="Manage Seo Pages" desc="">
                       <p className="text-green-500 text-sm"> {message}</p>
                    <form onSubmit={handleSubmit(onUpdate)}> 
                        <div className="col-span-12 md:col-span-4">
                            <input {...register("tagValue", { required: "Please select tag" })} type="hidden" value={tagValue ? tagValue.name : ""} />
                            <DropDownSearchesSeo
                                value={tagValue} 
                                onChange={(val) => {
                                    setTagValue(val);               
                                    setValue("tagValue", val ? val.code : ""); 
                                    OnPageTrigger(val ? val.code : null);      
                                }}
                                onData={handleChildData}
                                />



                                 {errors.tagValue && (
                                        <p className="text-red-500 text-sm">{errors.tagValue.message}</p>
                                    )}
                        </div>


                        <div className="grid grid-cols-6 gap-4 mt-3">

                            {/* Blog Title */}
                            <div className="col-span-6 md:col-span-3">
                                <label className="block mb-1 text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    placeholder="How to Cook Pasta"
                                    className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    {...register("title", { required: "Please enter title" })}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>

                            {/* Blog Slug */}
                            <div className="col-span-6 md:col-span-3">
                                <label className="block mb-1 text-sm font-medium">Slug</label>
                                <input
                                    type="text"
                                    placeholder="how-to-cook-pasta"
                                    className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    {...register("slug", { required: "Please enter slug" })}
                                />
                                {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
                            </div>

                            {/* Meta Title */}
                            <div className="col-span-6 md:col-span-3">
                                <label className="block mb-1 text-sm font-medium">Meta Title</label>
                                <input
                                    type="text"
                                    placeholder="Cooking Pasta Tips"
                                    className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    {...register("metaTitle", { required: "Please enter meta title" })}
                                />
                                  {errors.metaTitle && <p className="text-red-500 text-sm">{errors.metaTitle.message}</p>}
                            </div>

                            {/* Meta Keywords */}
                            <div className="col-span-6 md:col-span-3">
                                <label className="block mb-1 text-sm font-medium">Meta Keywords</label>
                                <input
                                    type="text"
                                    placeholder="blog, cooking, pasta, recipes"
                                    className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    {...register("metaKeywords", { required: "Please enter meta keywords" })}
                                />
                                {errors.metaKeywords && <p className="text-red-500 text-sm">{errors.metaKeywords.message}</p>}
                            </div>

                            {/* Meta Description */}
                            <div className="col-span-6">
                                <label className="block mb-1 text-sm font-medium">Meta Description</label>
                                <textarea
                                    placeholder="Learn how to cook perfect pasta every time"
                                    className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    rows={4}
                                    {...register("metaDescription", { required: "Please enter meta description" })}
                                    
                                />
                                {errors.metaDescription && <p className="text-red-500 text-sm">{errors.metaDescription.message}</p>}
                            </div>

                        </div>


                        {
                            button ? (  <div className="w-full px-2.5 mt-1">
                            <button
                                type="submit"
                                className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors"
                            >
                                Update
                            </button>
                        </div>) : (<></>)
                        }


                    </form>


                </ComponentCard>
            </div>
        </div>

    </>);
}