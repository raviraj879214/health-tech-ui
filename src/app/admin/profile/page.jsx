"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {UserMainArea} from "../../../components/user-profile/UserMain";





export default function Page() {


    return (<>


        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Manage Users" />


            <UserMainArea></UserMainArea>

        </div>


    </>);
}