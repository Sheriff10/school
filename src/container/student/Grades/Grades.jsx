import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import adminGetHandler from "../../../utils/adminGetHandler";
import colorConfig from "../../../utils/colorConfig";
import studentGetHandler from "../../../utils/studentGetHandler";
import Breadcrumb from "../../components/Breadcrumb";
import StudentMenu from "../components/Menu";
import Menu from "../components/Menu";

export default function StudentGrades() {
   const loaderState = useContext(LoaderContext);

   const dum = [1, 2, 3, 4, 5];
   const navi = useNavigate();

   const [limit, setLimit] = useState(5);
   const [status, setStatus] = useState("");
   const [classes, setClasses] = useState([]);
   const [cardClasses, setCardClasses] = useState([]);
   const [cardStatus, setCardStatus] = useState("pending");

   useEffect(() => {
      getCardClasses();
   }, [limit, status, cardStatus]);

   const getCardClasses = async () => {
      try {
         const response = await studentGetHandler(
            `/student/get-grades`,
            loaderState
         );
         setCardClasses(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <StudentMenu>
         <Breadcrumb heading={"Classes"} link={"Admin"} base={"Classes"} />

         <div className="container py-5 my-3">
            <div className="wrap bg-white table-responsive p-3 py-5 rounded-xl">
               <div className="heading flex justify-between mb-4">
                  <div className="text-wrap">
                     <span className="font-bold text-xl">
                        Your Results
                     </span>{" "}
                  </div>
               </div>
               <table className="w-full">
                  <thead>
                     <tr className="bg-pri text-white">
                        <th className=" p-3">Name</th>
                        <th className=" p-3">Subject</th>
                        <th className=" p-3">Grade</th>
                        <th className=" p-3">Result</th>
                        <th className=" p-3">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {cardClasses.map((i, index) => (
                        <tr className="text-slate-600 border-2 border-b-orange-950">
                           <td className="p-3 border-2 border-b-orange-950">{i.student_name}</td>
                           <td className=" p-3">{i.subject}</td>
                           <td className=" p-3">{i.grade}</td>
                           <td className=" p-3">{i.result}</td>
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
      </StudentMenu>
   );
}
