"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUploader from "../blogsmanagement/fileuploader";
import ComponentCard from "../common/ComponentCard";
import { ListOfBlogs } from "../blogsmanagement/BlogsList";
import {DropDownSearches} from "../blogsmanagement/DropDownSearch";
import {ComboBoxUI} from "../blogsmanagement/newdropdown";


export function CreateBlogs() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [blogid, setBlogid] = useState(0); // 0 = new blog, >0 = editing
    const [selectedurl,setselectedurl] = useState("");
    const [clearFile, setClearFile] = useState(false);
    const [message, setMessage] = useState("");
    const [triggertable,settriggertable] = useState(null);

    const [tagValue, setTagValue] = useState("");


    const { register, reset, formState: { errors }, handleSubmit ,setValue } = useForm();


    const onCreate = async (data) => {
        if (!selectedImage) {
            alert("Please upload an image");
            return;
        }

        try {
            // Get auth token
            const resToken = await fetch("/api/auth/get-token");
            const { token } = await resToken.json();

            // Prepare form data
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("image", selectedImage);
             formData.append("tagid", tagValue.name);

            // Send request
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/blog/create-blog`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (res.ok) {
                const responseData = await res.json();
                setMessage(responseData.message);

                // Clear form and uploader
                setSelectedImage(null);
                setClearFile(true);
                reset();
                settriggertable(responseData.data.created_at);
                // Reset clearFile after a short delay so uploader works again
                setTimeout(() => 
                    setClearFile(false)
                   
                , 50);

                // Clear message after 3s
                setTimeout(() => 
                    setMessage("")
                , 3000);
                setTagValue("");

            } else {
                console.error("Failed to create blog");
            }
        } catch (error) {
            console.error("Error creating blog:", error);
        }
    };
  


    const handleChildEditData=(id,title,content,tags,imageurl)=>{
       
        setBlogid(id);
        setValue("title",title);
        setValue("content",content);
        setselectedurl(imageurl);
        setValue("tagValue",tags);

        setTagValue({ name: tags, code: tags });

        if (id == "") {
             setBlogid(0);
            setSelectedImage(null);
            setClearFile(true);
            setTimeout(() =>setClearFile(false), 50);
            setTagValue("");
        }

    }

    
    const onUpdate =async (data)=>{
       
         try {
            // Get auth token
            const resToken = await fetch("/api/auth/get-token");
            const { token } = await resToken.json();

            // Prepare form data
            const formData = new FormData();
             formData.append("id", blogid);
            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("image", selectedImage);

             formData.append("tagid", tagValue.name);
            // Send request
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/blog/update-blog`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (res.ok) {
                const responseData = await res.json();
                setMessage(responseData.message);

                // Clear form and uploader
                setSelectedImage(null);
                setClearFile(true);
                reset();
                settriggertable(responseData.data.updated_at);

                
                setTimeout(() => 
                    setClearFile(false)
                , 50);

                // Clear message after 3s
                setTimeout(() => 
                    setMessage("")
                , 3000);
                setBlogid(0);
                setTagValue("");

            } else {
                console.error("Failed to create blog");
            }
        } catch (error) {
            console.error("Error creating blog:", error);
        }

    }







    return (
        <>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">
                    <ComponentCard title="Manage Blogs" desc="">
                     
                        <p className="text-green-500 text-sm">{message}</p>
                           <form onSubmit={handleSubmit(blogid > 0 ? onUpdate : onCreate)}>

                            <div className="space-y-5 sm:space-y-6">

                                {/* Blog Title */}
                               <div className="grid grid-cols-12 gap-4">
                    {/* Blog Title - 8 columns */}
                            <div className="col-span-12 md:col-span-8">
                                <label className="block mb-1 text-sm font-medium">Blog Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter blog title"
                                    className="h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    {...register("title", { required: "Please enter title" })}
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>

                          

                           <div className="col-span-12 md:col-span-4">
                                    {/* Hidden input for react-hook-form */}
                                    <input
                                        {...register("tagValue", { required: "Please select tag" })}
                                        type="hidden"
                                        value={tagValue ? tagValue.name : ""}
                                    />

                                    {/* Dropdown component */}
                                    <DropDownSearches
                                        value={tagValue}
                                        onChange={(val) => {
                                            setTagValue(val);         // Update local state
                                            setValue("tagValue", val ? val.name : ""); // Update RHF form state
                                        }}
                                    />

                                    {errors.tagValue && (
                                        <p className="text-red-500 text-sm">{errors.tagValue.message}</p>
                                    )}
                            </div>

                        </div>




                                {/* Content */}
                                <div>
                                    <label className="block mb-1 text-sm font-medium">Content</label>
                                    <textarea
                                        placeholder="Enter blog content"
                                        className="min-h-[120px] w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 border-gray-300 focus:ring-brand-200 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        {...register("content", { required: "Please enter content" })}
                                    />
                                    {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                                </div>

                                {/* File Uploader */}
                                <div>
                                    <FileUploader
                                        defaultImage={blogid !== 0 ? `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/blogs/${selectedurl}` : null}
                                        onFileSelect={(file) => setSelectedImage(file)}
                                        clear={clearFile}
                                    />
                                </div>

                                {/* Submit */}
                                <div className="w-full px-2.5">
                                    <button
                                        type="submit"
                                        className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors"
                                    >
                                        {blogid === 0 ? "Add" : "Update"}
                                    </button>
                                </div>

                            </div>
                        </form>

                    </ ComponentCard>
                </div>
            </div>



            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">
                    <ComponentCard title="Manage Blogs" desc="">
                        <p className="text-green-500 text-sm"> </p>
                        <ListOfBlogs trigger={triggertable} sendData = {handleChildEditData}></ListOfBlogs>

                    </ ComponentCard>
                </div>
            </div>



        </>
    );
}
