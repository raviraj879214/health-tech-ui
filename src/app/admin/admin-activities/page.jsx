import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import {ManageActivity} from "../../../components/manageactivity/ManageActivies";


export default function  Page(){



    return(<>


     <div className="space-y-6">
                <PageBreadcrumb pageTitle="Admin Activities" />


               <ManageActivity></ManageActivity>
      </div>
     </>);
}