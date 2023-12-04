import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import adminGetHandler from "../../../utils/adminGetHandler";
import Breadcrumb from "../../components/Breadcrumb";
import Menu from "../components/Menu";
import StatsCard from "./components/StatsCard";

export default function Dashboard() {
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

   const cardFunc = (title, value, imgUrl) => {
      return { title, value, imgUrl };
   };

   const cardArr = [
      cardFunc(
         "Students",
         stats.students,
         "https://preschool.dreamstechnologies.com/template/assets/img/icons/dash-icon-01.svg"
      ),
      cardFunc("Teachers", stats.teachers, "imgLink"),
      cardFunc("Classes", stats.classes, "imgLink"),
   ];

   const getStats = async () => {
      try {
         const response = await adminGetHandler("/admin/stats", loaderState);
         setStats(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   const getClasses = async () => {
      try {
         const response = await adminGetHandler("/admin/ongoing-class?limit=5");
         setOngoingClasses(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Menu>
         <Breadcrumb heading={"Dashboard"} link={"admin"} base="dashboard" />

         {/* Stats Card */}
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

         {/*  */}
         <div className="container dash-tb">
            <div className="row">
               <div className="col-lg-6 mb-3">
                  <div className="wrap bg-white p-4 rounded-xl ">
                     <div className="heading text-xl font-bold mb-4">
                        <span>Ongoing Classes</span>
                     </div>
                     <div className="responsive-table">
                        <table className="w-full text-center">
                           <thead>
                              <tr>
                                 <th>S/N</th>
                                 <th>Subject</th>
                                 <th>Teacher</th>
                              </tr>
                           </thead>
                           <tbody>
                              {ongoingClasses.map((i, index) => (
                                 <tr key={index}>
                                    <td>{index + 1} </td>
                                    <td>{i.class_name}</td>
                                    <td>Mr. Oloyede Collins</td>
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
               <div className="col-lg-6 mb-3">
                  <div className="wrap rounded-xl bg-white p-4">
                     <div className="heading mb-3">
                        <span className="font-bold text-2xl">
                           Unread Messages
                        </span>
                     </div>
                     {dum.map((ann, index) => (
                        <div
                           className="wrap flex justify-between mb-3 items-center border-bottom bg-pri text-white  px-3 p-2 rounded-lg"
                           key={index}
                        >
                           <div className="text-wrap">
                              <span className="text-lg font-bold">
                                 School Xtracurriculumn Cancelled
                              </span>{" "}
                              <br />
                              <span className="text-slate-300 text-sm">
                                 This is to let everyone know...
                              </span>
                           </div>

                           <div className="btn-wrap">
                              <button
                                 className="btn bg-white rounded-lg text-black btn-sm"
                                 onClick={() =>
                                    navi("/admin/dashboard/message")
                                 }
                              >
                                 Read more
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </Menu>
   );
}
