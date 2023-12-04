import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Menu from "../components/Menu";

export default function TeacherCreateClass() {
   return (
      <Menu>
         <Breadcrumb heading={"Create Class"} link={"Classes"} base="create" />
         <div className="container">
            <div className="col-lg-5 col-md-8 mx-auto">
               <div className="form-wrap mb-3 bg-white p-4 rounded-xl">
                  <div className="form-group mb-3">
                     <span className="text-sm text-slate-500 font-bold">
                        Select Subject <small className="text-danger">*</small>
                     </span>
                     <select className="form-select">
                        <option value="" selected>
                           select subject
                        </option>
                        <option value="">
                           Math 1
                        </option>
                        <option value="">
                           Social 2
                        </option>
                     </select>
                  </div>

                  <div className="form-group mb-3">
                     <span className="text-sm text-slate-500 font-bold">
                        Select Teacher <small className="text-danger">*</small>
                     </span>
                     <select className="form-select">
                        <option value="" selected>
                           Select Teacher
                        </option>
                        <option value="">
                           Teacher 1
                        </option>
                        <option value="">
                           Teacher 2
                        </option>
                     </select>
                  </div>

                  <div className="form-group mb-3">
                     <span className="text-sm text-slate-500 font-bold">
                        Select Grade <small className="text-danger">*</small>
                     </span>
                     <select className="form-select">
                        <option value="" selected>
                           Select Grade
                        </option>
                        <option value="">
                           Grade 1
                        </option>
                        <option value="">
                           Grade 2
                        </option>
                     </select>
                  </div>

                  <div className="form-group mb-3">
                     <span className="text-sm text-slate-500 font-bold">
                        Class Schedule <small className="text-danger">*</small>
                     </span>

                     <div className="input-wrap flex gap-2 justify-between">
                        <input type="date" className="form-control" />
                        <input type="time" className="form-control" />
                     </div>
                  </div>

                  <div className="btn-wrap">
                    <div className="btn bg-pri w-100 text-white font-bold rounded-pill">Create Class</div>
                  </div>
               </div>
            </div>
         </div>
      </Menu>
   );
}
