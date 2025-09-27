"use client"
import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import { useForm } from "react-hook-form";
import ComponentCard from "../../components/common/ComponentCard";

export function ManageEmailTemplates() {
    const [roles, setRoles] = useState([]);
    const [selectedId, setSelectedId] = useState("");
    const [editorContent, setEditorContent] = useState(""); // Local editor state
    const [refresh, setRefresh] = useState(false);
    const [Message,setMessage] = useState("");
    const [restriction, setRestriction] = useState(false);
    const [triggerrestrict,settriggerrestrict] = useState(false);


    const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm({
        defaultValues: { emailbody: "" }
    });



    // Fetch email templates
  const fetchEmailData = async () => {
    try {
        debugger;
        const resdsd = await fetch("/api/auth/get-token");
    const token = await resdsd.json();
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/email-templates`,{
            method : "GET",
            headers : {
                "content-type" : "application/json",
                "Authorization": `Bearer ${token.token}`
            }
        });

        if (res.status === 403) {
            // User is restricted
           setRestriction(true);
        }

        if (res.ok) {
            const result = await res.json();
            const mappedData = result.data.map(d => ({ id: d.id, name: d.subject, body: d.body }));
            setRoles(mappedData); // update state
            return true; // access allowed
        }

        // Other errors
        
    } catch (err) {
        console.log("Failed to fetch email templates:", err);
       
    }
};


    

    useEffect(() => {
        fetchEmailData();
    }, [refresh]); 




 
    const handleChange = (e) => {
        const selected = roles.find(r => r.id === parseInt(e.target.value));
        setSelectedId(e.target.value);
        const content = selected ? selected.body : "";
        setEditorContent(content);
        setValue("emailbody", content);
    }

    // Handle form submit
    const onUpdate = async () => {
        debugger;
        try {

            const resdsd = await fetch("/api/auth/get-token");
            const token = await resdsd.json();
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/email-templates`, {
                method: "PUT",
                 headers : {
                    "content-type" : "application/json",
                        "Authorization": `Bearer ${token.token}`
                },
                body: JSON.stringify({
                    id: selectedId,
                    body: editorContent
                })
            });
            if (res.status === 403) {
                setRestriction(true);
            }

            if (res.ok) {
                const result = await res.json();
                setEditorContent("");
                setValue("emailbody", "");
                setSelectedId("");
                setRefresh(prev => !prev); 
                setMessage(result.message);

                setTimeout(() => {
                     setMessage("");
                }, 3000);

            } else {
                console.error("Failed to update template");
            }
        } catch (err) {
            console.error("Error updating template:", err);
        }
    }

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

                <ComponentCard title="" desc="">

                    <p className="text-green-600 text-sm">{Message}</p>

                    <form onSubmit={handleSubmit(onUpdate)}>
                        <select
                            value={selectedId}
                            onChange={handleChange}
                            className="border px-3 py-2 rounded w-full mb-4"
                        >
                            <option value="">-- Choose a subject --</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                        </select>

                        <Editor
                            value={editorContent}
                            onTextChange={(e) => setEditorContent(e.htmlValue)}
                            style={{ height: "400px" }}
                            className={`border rounded-md ${errors.emailbody ? "border-red-500" : "border-gray-300"}`}
                        />

                        {/* Hidden input for react-hook-form */}
                        <input
                            type="hidden"
                            {...register("emailbody", { required: "Please enter content body" })}
                            value={editorContent}
                        />

                        {errors.emailbody && <p className="text-red-500 mt-2">{errors.emailbody.message}</p>}

                        <div className="flex justify-end mt-4">
                           
                                {selectedId > 0 &&(
                            <button type="submit" 
                            className="bg-brand-500 hover:bg-brand-600 rounded-lg p-3 text-white"
                             disabled={selectedId > 0 ? false : true}
                            >
                                save
                                 </button>
                                )}
                           


                        </div>
                    </form>

                </ComponentCard>
            </div>
        </div>
   </>);
}
