import React, { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../../context/LoaderContext";
import adminGetHandler from "../../../../utils/adminGetHandler";
import adminPostHandler from "../../../../utils/adminPostHandler";
import colorConfig from "../../../../utils/colorConfig";
import Menu from "../../components/Menu";

export default function AdminViewClasses() {
   const loaderState = useContext(LoaderContext);

   const url = window.location.href;
   const getUrl = new URL(url);
   const id = getUrl.searchParams.get("id");
   const [classDetail, setClassDetail] = useState({
      classId: "",
      class_begin: { date: "", time: "" },
      class_ends: { date: "", time: "" },
      class_name: "",
      class_roster: [],
      class_status: "",
      grade: "",
      teacher_id: "",
      __v: 0,
      _id: "",
   });

   const navi = useNavigate();

   useEffect(() => {
      if (!id) return navi("/admin/dashboard");
      getClass();
   }, []);

   const getClass = async () => {
      try {
         const response = await adminGetHandler(
            `/admin/get-classes?id=${id}`,
            loaderState
         );
         setClassDetail(response.classId);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   const updateClass = async (status) => {
      try {
         const response = await adminPostHandler(
            `/admin/update-class/${id}/${status}`, {},
            loaderState
         );
         getClass()
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Menu>
         <span>Admin</span>
         <div className="container">
            <div className="col-lg-5 mx-auto">
               <div className="wrap p-4 rounded-lg bg-white my-5">
                  <div className="heading bg-grey p-3 flex justify-between mb-3 items-center">
                     <div className="wrap">
                        <span className="text-xl font-bold capitalize">
                           {classDetail.class_name}
                        </span>{" "}
                        <br />
                        <span className="text-sm text-gray-400">
                           {`${classDetail.class_begin.date}`}
                        </span>
                     </div>

                     <div className="text-wrap text-gray-400 flex gap-2 items-center">
                        {`${classDetail.class_begin.time}`} -{" "}
                        {`${classDetail.class_ends.time}`}
                     </div>
                  </div>
                  <div className="message leading-8 p-3">
                     <div className="text-wrap flex justify-between items-center">
                        <span className="font-bold text-lg py-3">Teacher:</span>
                        <span> Mr. Adeniyi Samuel</span>
                     </div>

                     <div className="text-wrap flex justify-between items-center">
                        <span className="font-bold text-lg py-3">Grade:</span>
                        <span> {classDetail.grade}</span>
                     </div>

                     <div className="text-wrap flex justify-between items-center">
                        <span className="font-bold text-lg py-3">Status:</span>
                        {colorConfig(classDetail.class_status)}
                     </div>
                  </div>

                  {/* <div className="link bg-pri text-white p-3 my-3 text-center">
                     <span>No Assignment Link</span>
                  </div> */}

                  <div className="text-wrap mt-3 bg-grey p-3 flex gap-3">
                     <div className="col">
                        <button className="btn bg-pri text-white rounded-pill w-full" onClick={() => updateClass('completed')}>
                           Completed
                        </button>
                     </div>
                     <div className="col">
                        <button className="btn border-pri text-pri rounded-pill w-full" onClick={() => updateClass('ongoing')}>
                           Ongoing
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Menu>
   );
}
