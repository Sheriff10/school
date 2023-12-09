import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { LoaderContext } from "../context/LoaderContext";
import studentGetHandler from "../utils/studentGetHandler";

export default function CalenderComp() {
   const [calender, setCalender] = useState([]);
   const setShow = useContext(LoaderContext);

   useEffect(() => {
      getCalendar();
   }, []);

   const getCalendar = async () => {
      try {
         const response = await studentGetHandler("/get/calender?limit=10", setShow);
         setCalender(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
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
            <div className="table-responsive">
               <table className="w-full">
                  <thead>
                     <tr className="bg-pri text-white">
                        <th className="p-3">Title</th>
                        <th className="p-3">Description</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Date</th>
                     </tr>
                  </thead>
                  <tbody>
                     {calender.map((i, index) => (
                        <tr className="text-slate-600" key={index}>
                           <td className="p-3 w-[200px] lg:400px">{i.title}</td>
                           <td className="p-3 w-[200px] lg:400px">
                              {i.description}
                           </td>
                           <td className="p-3">{i.type}</td>
                           <td className="p-3">{i.date}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
