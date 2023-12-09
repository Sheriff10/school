import React, { useContext, useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import adminGetHandler from "../../../utils/adminGetHandler";
import Menu from "../components/Menu";

export default function Grade() {
   const setShow = useContext(LoaderContext);
   const navi = useNavigate();

   const [gradeClass, setGradeClass] = useState("1");
   const [grades, setGrades] = useState([]);

   useEffect(() => {
      getGrades();
   }, [gradeClass]);

   const getGrades = async () => {
      try {
         const response = await adminGetHandler(
            `/admin/get-grades?grade=${gradeClass}`,
            setShow
         );
         console.log(response);
         setGrades(response);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Menu>
         <div className="container py-5 my-3">
            <div className="wrap bg-white table-responsive p-3 py-5 rounded-xl">
               <div className="wrap mb-5">
                  <button
                     className="bg-pri text-white p-2 rounded-lg flex gap-2 items-center"
                     onClick={() => navi("/admin/grade/record")}
                  >
                     {" "}
                     Record New Result <FaPlus />
                  </button>
               </div>
               <div className="heading flex justify-between mb-4">
                  <div className="text-wrap">
                     <span className="font-bold text-xl">
                        Grade {gradeClass} Results
                     </span>{" "}
                  </div>
                  <div className="text-wrap flex gap-2 items-center">
                     <span>Grade</span>
                     <select
                        className="form-select w-[200px]"
                        onChange={(e) => setGradeClass(e.target.value)}
                     >
                        <option value="">select grade</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="11">11</option>
                     </select>
                  </div>
               </div>
               <table className="w-full">
                  <thead>
                     <tr className="bg-pri text-white">
                        <th className="py-3 p-2">Name</th>
                        <th className="py-3 p-2">Subject</th>
                        <th className="py-3 p-2">Grade</th>
                        <th className="py-3 p-2">Result</th>
                        <th className="py-3 p-2">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {grades.map((i, index) => (
                        <tr className="text-slate-600">
                           <td className="p-2">{i.student_name}</td>
                           <td className="py-3 p-2">{i.subject}</td>
                           <td className="py-3 p-2">{i.grade}</td>
                           <td className="py-3 p-2">
                              {i.result}
                           </td>
                           <td className="flex justify-around items-center p-2 text-xs">
                              <span className="bg-red-600 text-white p-2 rounded-full">
                                 <FaTrash />
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </Menu>
   );
}
