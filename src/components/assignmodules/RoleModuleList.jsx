import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";

export function RoleModuleLists({ roleid }) {


  const [modules, setModules] = useState([]);



   const fetchAssignModules = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/role-modules/${roleid}`);
        if (res.ok) {
          const data = await res.json();
          setModules(data); // API returns array of modules
        } else {
          console.error("Failed to fetch modules");
        }
      } catch (err) {
        console.error("Error fetching modules:", err);
      }
    };


  useEffect(() => {
    if (!roleid) return setModules([]);

   

    fetchAssignModules();
  }, [roleid]);





  const handleToggle = async (moduleId, currentStatus) => {
    try {
        debugger;
      const newStatus = currentStatus === 1 ? 0 : 1;
      

      const res =await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/role-modules/update-role-module`,{
        method : "PUT",
        headers:{
          "content-type" : "application/json"
        },
        body:JSON.stringify({
            roleId : roleid,
            moduleId : moduleId,
            status : newStatus
        })
      });

      if(res.ok){

        fetchAssignModules();


      }
    } catch (err) {
      console.error("Toggle update failed", err);
    }
  };




  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Module Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Description
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  enable/disable
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {modules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="px-5 py-4 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                    No modules assigned
                  </TableCell>
                </TableRow>
              ) : (
                modules.map((module) => (
                  <TableRow key={module.id}>
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      {module.name}
                    </TableCell>
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                      {module.description}
                    </TableCell>
                        <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={module.status === 1}
                                    onChange={() => handleToggle(module.id, module.status)}
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 
                                                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                                                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                                                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                                                dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"
                                ></div>

                            </label>
                        </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
