import React, { useContext, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import adminGetHandler from "../../../utils/adminGetHandler";
import teacherGetHandler from "../../../utils/teacherGetHandler";
import Breadcrumb from "../../components/Breadcrumb";
import Menu from "../components/Menu";

export default function TeacherViewStudent() {
   const loaderState  = useContext(LoaderContext);

   const url = window.location.href;
   const getUrl = new URL(url);
   const id = getUrl.searchParams.get("id");

   const navi = useNavigate();
   const [personal_info, setPersonal_info] = useState({
      username: "",
      role: "",
      firstname: "",
      lastname: "",
      address: "",
      grade: "",
      dob: "",
   });

   const cardFunc = (title, text) => {
      return { title, text };
   };
   const cardArr = [
      cardFunc("Firstname", personal_info.firstname),
      cardFunc("Lastname", personal_info.lastname),
      cardFunc("Grade", personal_info.grade),
      cardFunc("Username", personal_info.username),
      cardFunc("Date of birth", personal_info.dob),
   ];

   useEffect(() => {
      if (!id) return navi("/teacher/dashboard");
      getStudents();
   }, []);

   const getStudents = async () => {
      try {
         const response = await teacherGetHandler(`/teacher/get-student/${id}`, loaderState);
         setPersonal_info(response.studentData.personal_info);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Menu>
         <Breadcrumb
            heading={"Student Profile"}
            link={"Student"}
            base={"view"}
         />

         {/* Student Heading */}
         <div className="container">
            <div className="flex justify-between items-center bg-white rounded-xl p-2 px-4">
               {/* IMg and name con */}
               <div className="wrap flex items-center gap-3">
                  <div className="img-wrap w-[70px]">
                     <img
                        src="/student.jpeg"
                        alt="Student Name"
                        className="rounded-full border-4 border-slate-400"
                     />
                  </div>
                  <div className="text-wrap">
                     <span className="text-lg font-bold">
                        {personal_info.firstname} {personal_info.lastname}
                     </span>{" "}
                     <br />
                     <span className="text-sm text-slate-600">
                        {personal_info.dob}
                     </span>
                  </div>
               </div>

               <div className="text-wrap">
                  <span className="text-lg font-bold">Grade</span> <br />
                  <span className="text-sm text-slate-600">
                     {personal_info.grade}
                  </span>
               </div>

               <div className="text-wrap">
                  <span className="text-lg font-bold">Address</span> <br />
                  <span className="text-sm text-slate-600">
                     {personal_info.address}
                  </span>
               </div>

               <div className="btn-wrap">
                  <button className=" btn btn-danger">Report</button>
               </div>
            </div>
         </div>

         {/* Personal Details */}
         <div className="container mt-4">
            <div className="row">
               <div className="col-lg-4 col-md-6">
                  <div className="wrap bg-white rounded-xl p-4">
                     <div className="heading mb-4 ">
                        <span className="text-xl font-bold">
                           Personal Details
                        </span>
                     </div>
                     <div className="body uppercase">
                        {cardArr.map((details, index) => (
                           <div
                              className="flex mb-3 gap-3 items-center"
                              key={index}
                           >
                              <div className="icon-wrap bg-pri p-2 rounded-full text-white">
                                 <FaUserAlt />
                              </div>
                              <div className="text-wrap">
                                 <span className="font-bold">
                                    {details.title}
                                 </span>{" "}
                                 <br />
                                 <span className="text-sm text-slate-600">
                                    {details.text}
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="col-lg-8 col-md-6">
                  <div className="wrap bg-white rounded-xl p-4">
                     <div className="heading mb-4 ">
                        <span className="text-xl font-bold">
                           About John Doe
                        </span>
                     </div>
                     <div className="body">
                        <span>
                           Lorem, ipsum dolor sit amet consectetur adipisicing
                           elit. Id distinctio sapiente nemo eum accusantium
                           reiciendis omnis atque voluptatum quis eos! Corporis
                           cum nesciunt libero voluptas accusantium, asperiores
                           fuga nam aliquam.
                        </span>{" "}
                        <br /> <br />
                        <span>
                           Lorem, ipsum dolor sit amet consectetur adipisicing
                           elit. Id distinctio sapiente nemo eum accusantium
                           reiciendis omnis atque voluptatum quis eos! Corporis
                           cum nesciunt libero voluptas accusantium, asperiores
                           fuga nam aliquam.
                        </span>
                     </div>
                     <div className="btn-wrap mt-3">
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Menu>
   );
}
