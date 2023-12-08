import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import adminGetHandler from "../../../utils/adminGetHandler";
import Breadcrumb from "../../components/Breadcrumb";
import Menu from "../components/Menu";

export default function Teacher() {
   const navi = useNavigate();
   const [students, setStudents] = useState([]);
   const loaderState  = useContext(LoaderContext);


   useEffect(() => {
      getStudents();
   }, []);
   const getStudents = async () => {
      try {
         const response = await adminGetHandler("/admin/all-teachers", loaderState);
         setStudents(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div className="student">
         <Menu>
            <Breadcrumb heading={"Students"} link={"admin"} base={"student"} />
            {/* Search Forms */}
            <div className="container">
               <div className="form-group d-flex gap-4">
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Search by ID..."
                  />
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Search by Name..."
                  />
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Search by Phone..."
                  />
                  <div className="btn-wrap">
                     <button className="btn bg-pri text-light">Search</button>
                  </div>
               </div>
               <div className="row"></div>
            </div>

            {/* Table Section */}
            <div className="container py-5 my-3">
               <div className="wrap bg-white table-responsive p-3 py-5 rounded-xl">
                  <div className="heading flex justify-between mb-4">
                     <div className="text-wrap">
                        <span className="font-bold text-xl">Teacher List</span>
                     </div>
                     <div className="btn-wrap">
                        <span className="flex bg-pri text-white p-2 rounded-md">
                           <FaPlus />
                        </span>
                     </div>
                  </div>
                  <table className="w-full">
                     <thead>
                        <tr className="bg-pri text-white">
                           <th className="py-3 p-2">ID</th>
                           <th className="py-3 p-2">Firstname</th>
                           <th className="py-3 p-2">Lastname</th>
                           <th className="py-3 p-2">Address</th>
                           <th className="py-3 p-2">DOB</th>
                           <th className="text-center py-3 p-2">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {students.map((i, index) => (
                           <tr className="text-slate-600" key={index}>
                              <td className="p-2">{i.user_id}</td>
                              <td>{i.personal_info.firstname}</td>
                              <td>{i.personal_info.lastname}</td>
                              <td>{i.personal_info.address}</td>
                              <td>{i.personal_info.dob}</td>
                              <td className="flex justify-around items-center p-2 text-xs">
                                 <span className="bg-red-600 text-white p-2 rounded-full">
                                    <FaTrash />
                                 </span>{" "}
                                 <span className="bg-pri text-white p-2 rounded-full">
                                    <FaPen />{" "}
                                 </span>
                                 <span
                                    className="bg-pri text-white p-2 rounded-full"
                                    onClick={() =>
                                       navi(
                                          `/admin/teacher/view?id=${i.user_id}`
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
      </div>
   );
}
