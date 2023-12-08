import React, { useContext, useState } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import adminPostHandler from "../../../utils/adminPostHandler";
import Breadcrumb from "../../components/Breadcrumb";
import Menu from "../components/Menu";

export default function CreateClass() {
   const loaderState  = useContext(LoaderContext);

   const [class_name, setClass_name] = useState("");
   const [teacher_id, setTeacher] = useState("");
   const [grade, setGrade] = useState("");
   const [startDate, setStartDate] = useState("");
   const [endDate, setEndDate] = useState("");
   const [startTime, setStartTime] = useState("");
   const [endTime, setEndTime] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      const data = {
         class_name,
         teacher_id,
         grade,
         class_begin: { date: startDate, time: startTime },
         class_ends: { date: endDate, time: endTime },
      };

      try {
         const response = await adminPostHandler("/admin/create-class", data, loaderState);
         console.log(response);
         alert("class scheduled");
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Menu>
         <Breadcrumb heading={"Create Class"} link={"Classes"} base="create" />
         <div className="container">
            <div className="col-lg-5 col-md-8 mx-auto">
               <div className="form-wrap mb-3 bg-white p-4 rounded-xl">
                  <form onSubmit={handleSubmit}>
                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Select Subject{" "}
                           <small className="text-danger">*</small>
                        </span>
                        <select
                           className="form-select"
                           value={class_name}
                           onChange={(e) => setClass_name(e.target.value)}
                           required
                        >
                           <option value="" selected>
                              select subject
                           </option>
                           <option value="math">Math</option>
                           <option value="physics">Physics</option>
                        </select>
                     </div>

                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Select Teacher{" "}
                           <small className="text-danger">*</small>
                        </span>
                        <select
                           className="form-select"
                           value={teacher_id}
                           onChange={(e) => setTeacher(e.target.value)}
                           required
                        >
                           <option value="" selected>
                              Select Teacher
                           </option>
                           <option value="656de976137b2ae1ed048679	">Akinwumi Grace</option>
                           <option value="sheezey">Mary Global </option>
                        </select>
                     </div>

                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Select Grade <small className="text-danger">*</small>
                        </span>
                        <select
                           className="form-select"
                           value={grade}
                           onChange={(e) => setGrade(e.target.value)}
                           required
                        >
                           <option value="" selected>
                              Select Grade
                           </option>
                           <option value="11">Grade 1</option>
                           <option value="grade 2">Grade 2</option>
                        </select>
                     </div>

                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Class Begin <small className="text-danger">*</small>
                        </span>

                        <div className="input-wrap flex gap-2 justify-between">
                           <input
                              type="date"
                              className="form-control"
                              onChange={(e) => setStartDate(e.target.value)}
                              required
                           />
                           <input
                              type="time"
                              className="form-control"
                              onChange={(e) => setStartTime(e.target.value)}
                              required
                           />
                        </div>
                     </div>

                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Class Ends <small className="text-danger">*</small>
                        </span>

                        <div className="input-wrap flex gap-2 justify-between">
                           <input
                              type="date"
                              className="form-control"
                              onChange={(e) => setEndDate(e.target.value)}
                              required
                           />
                           <input
                              type="time"
                              className="form-control"
                              onChange={(e) => setEndTime(e.target.value)}
                              required
                           />
                        </div>
                     </div>

                     <div className="btn-wrap">
                        <button className="btn bg-pri w-100 text-white font-bold rounded-pill">
                           Create Class
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </Menu>
   );
}
