import React, { useContext, useState } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import adminPostHandler from "../../../utils/adminPostHandler";
import Menu from "../components/Menu";

export default function MarkAttendance() {
   const loaderState  = useContext(LoaderContext);

   const [user_id, setUser_id] = useState("");
   const [class_id, setClass_id] = useState("");
   const [status, setStatus] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      const data = { user_id, class_id, status };
      try {
         const response = await adminPostHandler(
            "/admin/mark-attendance",
            data, loaderState
         );
         console.log(response);
      } catch (error) {
         console.log(error);
         if (error) alert("Invalid Ids");
      }
   };

   return (
      <Menu>
         <div className="container">
            <div className="col-lg-6 mx-auto py-32">
               <div className="form-wrap bg-white p-3 rounded-lg">
                  <div className="heading mb-3 text-center">
                     <span className="text-2xl font-bold">
                        Mark Student Attendance
                     </span>
                  </div>
                  <form onSubmit={handleSubmit}>
                     <div className="form-group mb-3">
                        <span className="font-bold text-sm text-slate-500">
                           {" "}
                           User ID <small className="text-red-600">*</small>
                        </span>
                        <input
                           type="text"
                           className="form-control"
                           value={user_id}
                           onChange={(e) => setUser_id(e.target.value)}
                           required
                        />
                     </div>

                     <div className="form-group mb-3">
                        <span className="font-bold text-sm text-slate-500">
                           {" "}
                           Class ID <small className="text-red-600">*</small>
                        </span>
                        <input
                           type="text"
                           className="form-control"
                           value={class_id}
                           onChange={(e) => setClass_id(e.target.value)}
                           required
                        />
                     </div>
                     <div className="form-group mb-3">
                        <span className="font-bold text-sm text-slate-500">
                           {" "}
                           Status <small className="text-red-600">*</small>
                        </span>
                        <select
                           type="text"
                           className="form-select"
                           value={status}
                           onChange={(e) => setStatus(e.target.value)}
                           required
                        >
                           <option value="">select status</option>
                           <option value="attended">Attended</option>
                           <option value="absent">absent</option>
                        </select>
                     </div>

                     <div className="btn-wrap">
                        <button className="btn bg-pri w-full  text-white">
                           Mark Student Attendance
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </Menu>
   );
}
