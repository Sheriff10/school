import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { FaCalendar, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import teacherGetHandler from "../../../utils/teacherGetHandler";
import StatsCard from "../../admin/Dashboard/components/StatsCard";
import Breadcrumb from "../../components/Breadcrumb";
import TeacherMenu from "../components/Menu";
import Menu from "../components/Menu";

export default function TeacherDashboard() {
   const loaderState  = useContext(LoaderContext);

   const dum = [1, 2, 3];
   const navi = useNavigate();

   const [stats, setStats] = useState({
      classes: 0,
      students: 0,
      teachers: 0,
   });

   const [ongoingClasses, setOngoingClasses] = useState([]);

   useEffect(() => {
      getStats();
      getClasses();
   }, []);

   const getStats = async () => {
      try {
         const response = await teacherGetHandler("/teacher/stats", loaderState);
         setStats(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   const cardFunc = (title, value, imgUrl) => {
      return { title, value, imgUrl };
   };

   const cardArr = [
      cardFunc(
         "Students",
         stats.students,
         "https://preschool.dreamstechnologies.com/template/assets/img/icons/dash-icon-01.svg"
      ),
      cardFunc(
         "Teachers",
         stats.teachers,
         "https://preschool.dreamstechnologies.com/template/assets/img/icons/teacher-icon-01.svg"
      ),
      cardFunc(
         "Classes",
         stats.classes,
         "https://preschool.dreamstechnologies.com/template/assets/img/icons/teacher-icon-02.svg"
      ),
   ];

   const getClasses = async () => {
      try {
         const response = await teacherGetHandler(
            "/teacher/ongoing-class?limit=5"
         );
         setOngoingClasses(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <TeacherMenu>
         <Breadcrumb
            heading={"Welcome Mrs. Oyeniji"}
            link={"admin"}
            base="dashboard"
         />

         {/* Stats Card */}
         <div className="container py-4">
            <div className="row py-4">
               {cardArr.map((card, index) => (
                  <div className="col-lg-4" key={index}>
                     <StatsCard
                        title={card.title}
                        subTitle={""}
                        value={card.value}
                        imgUrl={card.imgUrl}
                     />
                  </div>
               ))}
            </div>
         </div>

         {/* Upcoming Lessons And Teaching Histories */}
         <div className="container dash-tb">
            <div className="row">
               <div className="col-lg-8 mb-3">
                  <div className="row">
                     <div className="col-lg-8 mb-3">
                        <div className=" bg-white p-4 rounded-xl ">
                           <div className="heading text-xl font-bold mb-4 flex justify-between items-center">
                              <span>Upcoming Classes</span>{" "}
                              <span className="text-pri text-xs">view all</span>
                           </div>

                           {dum.map((i, index) => (
                              <div
                                 className="wrap border-l-4 border-pri px-2 mb-3 bg-grey py-1 rounded"
                                 key={index}
                              >
                                 <span className="font-bold text-lg">
                                    Physics
                                 </span>
                                 <div className="flex text-gray-600">
                                    <div className="border-r pr-2 border-pri">
                                       <span className="flex gap-1 items-center">
                                          <FaCalendar /> Sep 5, 2022
                                       </span>
                                    </div>
                                    <div className="border-l pl-2 border-pri">
                                       <span className="flex gap-2 items-center">
                                          <FaClock /> 10:00 - 12:00 am
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="col-lg-4">
                        <div className="bg-white p-4 rounded-xl ">
                           <div className="heading text-xl font-medium mb-4">
                              <span>Total Scheduled Class</span> <br />
                              <span className="text-sm">23 Nov. 2020</span>
                           </div>
                           <div className="text-wrap text-center">
                              <span className="text-5xl font-bold">20</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4 mb-3">
                  <Calendar className="rounded-lg border-0 w-full" />
               </div>
            </div>
         </div>

         {/* Table Section: Class history */}
         <div className="container">
            <div className="col-lg-6 mb-3">
               <div className="wrap bg-white p-4 rounded-xl ">
                  <div className="heading text-xl font-bold mb-4">
                     <span>Class History</span>
                  </div>
                  <div className="responsive-table">
                     <table className="w-full text-center">
                        <thead>
                           <tr>
                              <th>S/N</th>
                              <th>Subject</th>
                           </tr>
                        </thead>
                        <tbody>
                           {ongoingClasses.map((i, index) => (
                              <tr key={index}>
                                 <td>{index + 1} </td>
                                 <td>{i.class_name}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                     {ongoingClasses.length === 0 && (
                        <div className="wrap text-center text-lg text-gray-900 font-semibold bg-grey rounded-xl p-3">
                           <span>No Ongoing Class</span>
                        </div>
                     )}
                  </div>
                  <div className="btn-wrap"></div>
               </div>
            </div>
         </div>
      </TeacherMenu>
   );
}
