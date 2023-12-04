import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import { FaCalendar, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import colorConfig from "../../../utils/colorConfig";
import studentGetHandler from "../../../utils/studentGetHandler";
import StatsCard from "../../admin/Dashboard/components/StatsCard";
import Breadcrumb from "../../components/Breadcrumb";
import StudentMenu from "../components/Menu";

export default function StudentDashboard() {
   const loaderState  = useContext(LoaderContext);

   const dum = [1, 2, 3];
   const navi = useNavigate();

   const [stats, setStats] = useState({
      classes: 0,
      grade: 0,
      name: "...",
   });
   const [ongoingClasses, setOngoingClasses] = useState([]);
   const [announcement, setAnnouncement] = useState([]);
   const [upcomingClasses, setUpcomingClasses] = useState([]);
   const [limit, setLimit] = useState(3);

   useEffect(() => {
      getStats();
   }, [limit]);

   const getStats = async () => {
      try {
         const response = await studentGetHandler(
            `/student/stats?limit=${limit}`, loaderState
         );
         setStats(response.stats);
         setOngoingClasses(response.ongoing_classes);
         setAnnouncement(response.announcement);
         setUpcomingClasses(response.upcoming_class);
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
         stats.name,
         "https://preschool.dreamstechnologies.com/template/assets/img/icons/dash-icon-01.svg"
      ),
      cardFunc("Grade", stats.grade, "imgLink"),
      cardFunc("Total Classes", stats.classes, "imgLink"),
   ];
   return (
      <StudentMenu>
         <Breadcrumb
            heading={"Welcome Adeayo"}
            link={"student"}
            base="dashboard"
         />

         {/* Card And Stats */}
         <div className="container py-4">
            <div className="row py-4">
               {cardArr.map((card, index) => (
                  <div className="col-lg-4">
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

         {/* Upcoming Lessons And Total classes Histories */}
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

                           {upcomingClasses.map((i, index) => (
                              <div
                                 className="wrap border-l-4 border-pri px-2 mb-3 bg-grey py-1 rounded"
                                 key={index}
                              >
                                 <span className="font-bold text-lg">
                                    {i.class_name}
                                 </span>
                                 <div className="flex text-gray-600">
                                    <div className="border-r pr-2 border-pri">
                                       <span className="flex gap-1 items-center">
                                          <FaCalendar /> {i.class_begin.date}
                                       </span>
                                    </div>
                                    <div className="border-l pl-2 border-pri">
                                       <span className="flex gap-2 items-center">
                                          <FaClock /> {i.class_begin.time} -{" "}
                                          {i.class_ends.time}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           ))}
                           {upcomingClasses.length === 0 && (
                              <div className="alert bg-grey text-center">
                                 <span className="text-gray-600 font-bold">
                                    No Upcoming classes
                                 </span>
                              </div>
                           )}
                        </div>
                     </div>

                     <div className="col-lg-4">
                        <div className="bg-white p-4 rounded-xl ">
                           <div className="heading text-xl font-medium mb-4">
                              <span>Total Class Today</span> <br />
                              <span className="text-sm">23 Nov. 2020</span>
                           </div>
                           <div className="text-wrap text-center">
                              <span className="text-3xl font-bold">
                                 20 / 10{" "}
                                 <span className="text-xs text-gray-500">
                                    complete
                                 </span>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4 mb-3">
                  <Calendar className="rounded-lg border-0" />
               </div>
            </div>
         </div>

         {/* Announcements */}
         <div className="container dash-tb">
            <div className="row">
               <div className="col-lg-6 mb-3">
                  <div className="wrap bg-white p-4 rounded-xl ">
                     <div className="heading text-xl font-bold mb-4">
                        <span>Ongoing Classes</span>
                     </div>

                     {ongoingClasses.map((i, index) => (
                        <div className="card rounded-xl shadow">
                           <div className="card-head text-center p-2 py-3 bg-pri text-white">
                              <span className="text-3xl font-bold">
                                 PHYSICS
                              </span>{" "}
                              <br />
                              <span className="text-xs text-white">
                                 {i.class_begin.date} <br />{" "}
                                 {i.class_begin.time} - {i.class_ends.time}
                              </span>
                           </div>
                           <div className="card-bodi p-2 leading-8">
                              {/* Teacher */}
                              <div className="text-wrap flex justify-between text-sm mb-2">
                                 <span className="font-bold text-md">
                                    Teacher:
                                 </span>{" "}
                                 <span className="text-slate-500 text-sm">
                                    {"config teacher"}
                                 </span>
                              </div>

                              {/* Grade  */}
                              <div className="text-wrap flex justify-between text-sm mb-2">
                                 <span className="font-bold text-md">
                                    Grade:
                                 </span>{" "}
                                 <span className="text-slate-500 text-sm">
                                    {i.grade}
                                 </span>
                              </div>

                              {/* Status */}
                              <div className="text-wrap flex justify-between text-sm mb-2">
                                 <span className="font-bold text-md">
                                    Status:
                                 </span>{" "}
                                 <span>{colorConfig(i.class_status)}</span>
                              </div>
                           </div>
                        </div>
                     ))}
                     {ongoingClasses.length === 0 && (
                        <div className="alert bg-grey text-center">
                           <span className="text-gray-600 font-bold">
                              No Upcoming classes
                           </span>
                        </div>
                     )}
                     <div className="btn-wrap"></div>
                  </div>
               </div>
               <div className="col-lg-6 mb-3">
                  <div className="wrap bg-white p-4">
                     <div className="heading mb-3 flex justify-between items-center">
                        <span className="font-bold text-2xl">
                           Announcements
                        </span>

                        {limit === 3 ? (
                           <span
                              className="text-pri cursor-pointer font-bold"
                              onClick={() => setLimit("")}
                           >
                              view all
                           </span>
                        ) : (
                           <span
                              className="text-pri cursor-pointer font-bold"
                              onClick={() => setLimit(3)}
                           >
                              view less
                           </span>
                        )}
                     </div>
                     {announcement.map((ann, index) => (
                        <div
                           className="wrap flex flex-wrap md:flex-nowrap justify-between mb-3 items-center border-bottom bg-pri text-white  px-3 p-2 rounded-lg"
                           key={index}
                        >
                           <div className="truncate col-lg-10">
                              <span className="text-lg font-bold">
                                 {ann.title}
                              </span>{" "}
                              <br />
                              <span className="text-slate-300 text-sm">
                                 {ann.description}
                              </span>
                           </div>

                           <div className="btn-wrap col-lg-2 flex  md:justify-end">
                              <button
                                 className="btn bg-white rounded-lg text-black btn-sm"
                                 onClick={() =>
                                    navi(
                                       `/student/dashboard/announcement?id=${ann._id}`
                                    )
                                 }
                              >
                                 Read
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </StudentMenu>
   );
}
