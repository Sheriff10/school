import React, { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { LoaderContext } from "../../../../context/LoaderContext";
import studentGetHandler from "../../../../utils/studentGetHandler";
import Menu from "../../components/Menu";

export default function StudentViewAssignment() {
   const loaderState  = useContext(LoaderContext);

   const url = window.location.href;
   const getUrl = new URL(url);
   const id = getUrl.searchParams.get("id");

   const [assignment, setAssignment] = useState({
      date: "",
      description: "",
      role: "",
      title: "",
      type: "",
      user_id: "",
      __v: 0,
      _id: "",
   });

   useEffect(() => {
      getAssignment();
   }, []);

   const getAssignment = async () => {
      try {
         const response = await studentGetHandler(
            `/student/get-assignments?id=${id}`, loaderState
         );
         setAssignment(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Menu>
         <div className="container">
            <div className="col-lg-5 mx-auto">
               <div className="wrap p-4 rounded-lg bg-white my-5">
                  <div className="heading flex justify-between mb-3 items-center">
                     <div className="wrap">
                        <span className="text-xl font-bold">
                           {assignment.title}
                        </span>{" "}
                        <br />
                        <span className="text-sm text-gray-400">
                           {assignment.date}
                        </span>
                     </div>

                     <div className="text-wrap text-gray-400 flex gap-2 items-center">
                        <FaEye /> Grade {assignment.grade}
                     </div>
                  </div>
                  <div className="message leading-8">
                     <span>
                     {assignment.description}
                     </span>
                  </div>

                  <div className="link bg-pri text-white p-3 my-3 text-center">
                  <span>{!assignment.link ? "No link" : <a href={assignment.link}>Resource Link</a> }</span>{" "}

                  </div>

                  <div className="text-wrap mt-3 bg-grey p-3">
                     Sent by User:{" "}
                     <span className="text-pri text-sm font-bold">
                     {assignment.user_id}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </Menu>
   );
}
