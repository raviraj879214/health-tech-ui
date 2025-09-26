"use client"
import ComponentCard from "../common/ComponentCard";
import {RoleDropdown} from "../../components/assignmodules/RolesDropdown";
import {RoleModuleLists} from "../../components/assignmodules/RoleModuleList";
import { useState } from "react";



export function AssignModule() {

    const [selectedrole,setselectedrole] = useState(0);

    const selectedrolesid=(data)=>
    {
        setselectedrole(data);
    }
    return (<>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">
                <ComponentCard title="" desc="">
                     <RoleDropdown sendRoleID={selectedrolesid}></RoleDropdown> 
                     <RoleModuleLists roleid={selectedrole}></RoleModuleLists>
                </ComponentCard>
            </div>
        </div>
    </>);
}