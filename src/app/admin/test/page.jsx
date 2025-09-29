"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {TestCo} from "../../../components/TestComponent/TestCompo";



export default function Page() {







    return (<>
    
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Manage Test" />


            <TestCo></TestCo>
        </div>
    </>);
}