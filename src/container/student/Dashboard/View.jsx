import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import studentGetHandler from "../../../utils/studentGetHandler";
import Menu from "../components/Menu";

export default function StudentViewAnnouncement() {
   const loaderState = useContext(LoaderContext);

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
      loaderState(true);
      try {
         const response = await studentGetHandler(
            `/student/get-announcement?id=${id}`, loaderState
         );
         setAnnouncement(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Menu>
         student
         <div className="container">
            <div className="col-lg-5 mx-auto">
               <div className="wrap p-4 rounded-lg bg-white my-5">
                  <div className="heading mb-3">
                     <span className="text-xl font-bold">
                        {announcement.title}
                     </span>{" "}
                     <br />
                     <span className="text-sm text-gray-400">
                        {announcement.date}
                     </span>
                  </div>
                  <div className="message leading-8">
                     <span>{announcement.description}</span>
                  </div>

                  <div className="text-wrap mt-3 bg-grey p-3">
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
