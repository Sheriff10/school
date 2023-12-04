import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import studentGetHandler from "../../../utils/studentGetHandler";
import Breadcrumb from "../../components/Breadcrumb";
import StudentMenu from "../components/Menu";

export default function StudentAssignment() {
   const loaderState  = useContext(LoaderContext);

   const dum = [1, 2, 3];
   const navi = useNavigate();
   
   const [assignments, setAssignments] = useState([])
   const [limit, setLimit] = useState('')

   useEffect(() => {
      getAssignment()
   }, [])

   const getAssignment = async () => {
      try {
         const response = await studentGetHandler(`/student/get-assignments?limit=${limit}`, loaderState)
         setAssignments(response.assignment)
         console.log(response)
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <StudentMenu>
         <Breadcrumb
            heading={"Assignments"}
            link={"Students"}
            base={"asignments"}
         />
         <div className="container">
            <div className="col-lg-8 mx-auto">
               <div className="wrap bg-white p-4 rounded-xl">
                  <div className="heading mb-3">
                     <span className="font-bold text-2xl">Assignment</span>
                  </div>
                  {assignments.map((ann, index) => (
                     <div
                        className="wrap flex justify-between mb-3 items-center border-bottom bg-dark text-white  px-3 p-2 rounded-lg"
                        key={index}
                     >
                        <div className="text-wrap capitalize">
                           <span className="text-lg font-bold">
                              {ann.title}
                           </span>{" "}
                           <br />
                           <span className="text-slate-300 text-sm">
                              {ann.description}
                           </span>
                        </div>

                        <div className="btn-wrap">
                           <button
                              className="btn bg-white rounded-lg text-black btn-sm"
                              onClick={() => navi(`/student/assignments/view?id=${ann._id}`)}
                           >
                              View
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </StudentMenu>
   );
}
