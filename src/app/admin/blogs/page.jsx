import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ManageBlog} from "../../../components/blogsmanagement/ManageBlogs";


export default function Page(){


    return(<>
    
        

        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Manage Blogs" />



            <ManageBlog />

               
        </div>

    </>)
}