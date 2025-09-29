"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ManageEmailTemplates } from "../../../components/manageemailtemplates/ManageEmails";




export default function Page(){


    return(<>
    
     <div className="space-y-6">
            <PageBreadcrumb pageTitle="Manage Email Templates" />


            <ManageEmailTemplates></ManageEmailTemplates>

        </div>
    
        
    </>);
}