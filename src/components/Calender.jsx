import React from "react";
import { FaPlus } from "react-icons/fa";

export default function CalenderComp() {
   return (
      <div className="container py-5 my-3">
         <div className="wrap bg-white table-responsive p-3 py-5 rounded-xl">
            <div className="heading flex justify-between mb-4">
               <div className="text-wrap">
                  <span className="font-bold text-xl">School Calender</span>
               </div>
               <div className="btn-wrap">
                  <span className="flex bg-pri text-white p-2 rounded-md">
                     <FaPlus />
                  </span>
               </div>
            </div>
            <table className="w-full">
               <thead>
                  <tr className="bg-pri text-white">
                     <th className="py-3 p-2">ID</th>
                     <th className="py-3 p-2">title</th>
                     <th className="py-3 p-2">type</th>
                     <th className="py-3 p-2">Start Date</th>
                     <th className="py-3 p-2">End Date</th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="text-slate-600">
                     <td className="p-2">Cal-932</td>
                     <td>Mid Term Break</td>
                     <td>Session Holiday</td>
                     <td>24 Sept. 2032</td>
                     <td>26 Sept. 2032</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   );
}
