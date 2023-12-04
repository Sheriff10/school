import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import adminGetHandler from "../../../utils/adminGetHandler";
import colorConfig from "../../../utils/colorConfig";
import Breadcrumb from "../../components/Breadcrumb";
import Menu from "../components/Menu";

export default function StudentClass() {
   const loaderState  = useContext(LoaderContext);

   const dum = [1, 2, 3, 4, 5];
   const navi = useNavigate();

   const [limit, setLimit] = useState(5);
   const [status, setStatus] = useState("");
   const [classes, setClasses] = useState([]);
   const [cardClasses, setCardClasses] = useState([]);
   const [cardStatus, setCardStatus] = useState("pending");

   useEffect(() => {
      getClasses();
      getCardClasses();
   }, [limit, status, cardStatus]);

   const getClasses = async () => {
      try {
         const response = await adminGetHandler(
            `/admin/get-classes?limit=${limit}&status=${status}`, loaderState
         );
         setClasses(response.classes);
         console.log(response.classes);
      } catch (error) {
         console.log(error);
      }
   };

   const getCardClasses = async () => {
      try {
         const response = await adminGetHandler(
            `/admin/get-classes?limit=&status=${cardStatus}`
         );
         setCardClasses(response.classes);
         console.log(response.classes);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Menu>
         <Breadcrumb heading={"Classes"} link={"Admin"} base={"Classes"} />

         {/* Class Cards */}
         <div className="container">
            <div className="heading flex justify-between bg-white rounded-xl p-3 mb-3">
               <div className="text-wrap flex gap-2 items-center">
                  <span>Filter</span>
                  <select
                     className="form-select"
                     onChange={(e) => setCardStatus(e.target.value)}
                  >
                     <option value="pending">Pending</option>
                     <option value="ongoing">Ongoing</option>
                     <option value="canceled">Canceled</option>
                  </select>
               </div>

               <div className="btn-wrap">
                  <span className="flex items-center gap-2 text-white bg-pri rounded-lg p-2">
                     Create New Class <FaPlus />
                  </span>
               </div>
            </div>
            <div className="row">
               {cardClasses.map((classes, index) => (
                  <div
                     className="col-lg-3 col-md-4 col-sm-6 mb-5"
                     key={index}
                     onClick={() =>
                        navi(`/admin/classes/view?id=${classes._id}`)
                     }
                  >
                     <div className="card rounded-xl shadow">
                        <div className="card-head text-center p-2 py-3 bg-pri text-white">
                           <span className="text-3xl font-bold capitalize">
                              {classes.class_name}
                           </span>{" "}
                           <br />
                           <span className="text-xs text-white">
                              {classes.class_begin
                                 ? `${classes.class_begin.date}`
                                 : "N/A"}{" "}
                              <br />{" "}
                              {classes.class_begin
                                 ? `${classes.class_begin.time}`
                                 : "N/A"}
                           </span>
                        </div>
                        <div className="card-bodi p-2 leading-8">
                           {/* Teacher */}
                           <div className="text-wrap flex justify-between text-sm mb-2">
                              <span className="font-bold text-md">
                                 Teacher:
                              </span>{" "}
                              <span className="text-slate-500 text-sm">
                                 config teacher_name
                              </span>
                           </div>

                           {/* Grade  */}
                           <div className="text-wrap flex justify-between text-sm mb-2">
                              <span className="font-bold text-md">Grade:</span>{" "}
                              <span className="text-slate-500 text-sm">
                                 {classes.grade}
                              </span>
                           </div>

                           {/* Status */}
                           <div className="text-wrap flex justify-between text-sm mb-2">
                              <span className="font-bold text-md">Status:</span>{" "}
                              <span>{colorConfig(classes.class_status)}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Table Section */}
         <div className="container py-5 my-3">
            <div className="wrap bg-white table-responsive p-3 py-5 rounded-xl">
               <div className="heading flex justify-between mb-4">
                  <div className="text-wrap">
                     <span className="font-bold text-xl">Classes History</span>
                  </div>
                  <div className="text-wrap flex gap-2 items-center">
                     <span>Filter</span>
                     <select
                        className="form-select w-[200px]"
                        onChange={(e) => setStatus(e.target.value)}
                     >
                        <option value="">All</option>
                        <option value="completed">Completed</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="pending">Pending</option>
                        <option value="canceled">Canceled</option>
                     </select>
                     <select
                        className="form-select"
                        onChange={(e) => setLimit(e.target.value)}
                     >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                     </select>
                  </div>
               </div>
               <table className="w-full">
                  <thead>
                     <tr className="bg-pri text-white">
                        <th className="py-3 p-2">Class ID</th>
                        <th className="py-3 p-2">Teacher</th>
                        <th className="py-3 p-2">Grade</th>
                        <th className="py-3 p-2">Status</th>
                        <th className="py-3 p-2">Schedule</th>
                        <th className="text-center py-3 p-2">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {classes.map((i, index) => (
                        <tr className="text-slate-600">
                           <td className="p-2">{i._id}</td>
                           <td className="py-3 p-2">config teacher name</td>
                           <td className="py-3 p-2">{i.grade}</td>
                           <td className="py-3 p-2">
                              {colorConfig(i.class_status)}
                           </td>
                           <td className="py-3 p-2">
                              {/* {i.class_begin.date}, {i.class_begin} */}
                              {i.class_begin
                                 ? `${i.class_begin.date} ${i.class_begin.time}`
                                 : "N/A"}
                           </td>
                           <td className="flex justify-around items-center p-2 text-xs">
                              <span className="bg-red-600 text-white p-2 rounded-full">
                                 <FaTrash />
                              </span>
                              <span
                                 className="bg-pri text-white p-2 cursor-pointer rounded-full"
                                 onClick={() =>
                                    navi(
                                       `/admin/classes/view?id=${i._id}`
                                    )
                                 }
                              >
                                 <FaEye />{" "}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </Menu>
   );
}
