import React, { useContext, useState } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import adminPostHandler from "../../../utils/adminPostHandler";
import Breadcrumb from "../../components/Breadcrumb";
import Menu from "../components/Menu";

export default function CreateCalendar() {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [date, setDate] = useState("");
   const [type, setType] = useState("");

   const loaderState = useContext(LoaderContext);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const data = { title, description, date, type };

      try {
         const response = await adminPostHandler(
            "/admin/create-calender",
            data,
            loaderState
         );
         alert("Calendar created successfully ");
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Menu>
         <Breadcrumb
            heading={"Create Calendar"}
            link={"Calender"}
            base="create"
         />

         <div className="container">
            <div className="col-lg-5 col-md-8 mx-auto">
               <div className="form-wrap mb-3 bg-white p-4 rounded-xl">
                  <form onSubmit={handleSubmit}>
                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Title
                           <small className="text-danger">*</small>
                        </span>
                        <input
                           type="text"
                           className="form-control"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           required
                        />
                     </div>

                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Description
                           <small className="text-danger">*</small>
                        </span>
                        <input
                           type="text"
                           className="form-control"
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                           required
                        />
                     </div>

                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Date
                           <small className="text-danger">*</small>
                        </span>
                        <input
                           type="date"
                           className="form-control"
                           value={date}
                           onChange={(e) => setDate(e.target.value)}
                           required
                        />
                     </div>

                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Type
                           <small className="text-danger">*</small>
                        </span>
                        <select
                           className="form-select"
                           value={type}
                           onChange={(e) => setType(e.target.value)}
                           required
                        >
                           <option value="" defaultChecked>
                              Select Type
                           </option>
                           <option value="academic event">
                              Academic Event
                           </option>
                           <option value="holiday">Holiday</option>
                           <option value="extracurricular activity">
                              Extracurricular Activity
                           </option>
                        </select>
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
