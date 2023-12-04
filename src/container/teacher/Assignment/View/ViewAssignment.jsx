import React, { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { LoaderContext } from "../../../../context/LoaderContext";
import teacherGetHandler from "../../../../utils/teacherGetHandler";
import Menu from "../../components/Menu";

export default function ViewAssignment() {
   const loaderState  = useContext(LoaderContext);

   const url = window.location.href;
   const getUrl = new URL(url);
   const id = getUrl.searchParams.get("id");

   const [announcement, setAnnouncement] = useState({
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
      getAnnouncement();
   }, []);

   const getAnnouncement = async () => {
      try {
         const response = await teacherGetHandler(
            `/teacher/get-assignment?id=${id}`, loaderState
         );
         setAnnouncement(response);
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
                           {announcement.title}
                        </span>{" "}
                        <br />
                        <span className="text-sm text-gray-400">
                           {announcement.date}
                        </span>
                     </div>

                     <div className="text-wrap text-gray-400 flex gap-2 items-center">
                        <FaEye /> {announcement.grade}
                     </div>
                  </div>
                  <div className="message leading-8 text-wrap break-words">
                     <span>{announcement.description}</span>
                  </div>

                  <div className="link bg-pri text-white p-3 my-3 text-center">
                     <span>{announcement.link === "" ? "Nolink" : <a href={announcement.link}>Resource Link</a> }</span>{" "}
                  </div>

                  <div className="text-wrap mt-3 bg-grey p-3 break-words">
                     Sent by User:{" "}
                     <span className="text-pri text-sm font-bold">
                        {announcement.user_id}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </Menu>
   );
}
