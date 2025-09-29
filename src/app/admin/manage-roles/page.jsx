"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ManageRole } from "../../../components/manageroles/ManageRoles";




export default function Page(){


    return(<>
    
    <div className="space-y-6">
                <PageBreadcrumb pageTitle="Manage Roles" />

                 <ManageRole></ManageRole>

            </div>
       
    </>);
}