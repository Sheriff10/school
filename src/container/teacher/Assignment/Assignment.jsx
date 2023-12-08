import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import teacherGetHandler from "../../../utils/teacherGetHandler";
import teacherPostHandler from "../../../utils/teacherPostHandler";
import Breadcrumb from "../../components/Breadcrumb";
import Menu from "../components/Menu";

export default function Assignments() {
   const loaderState  = useContext(LoaderContext);
   
   const dum = [1, 2, 3];
   const [assignment, setAssignment] = useState([]);
   const [title, setTitle] = useState("");
   const [description, setdescription] = useState("");
   const [grade, setGrade] = useState("");
   const [link, setLink] = useState("");
   const [limit, setLimit] = useState(3);

   useEffect(() => {
      getAssignments();
   }, [limit]);

   const navi = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();

      const data = { type: "assignment", title, description, grade };
      try {
         const response = await teacherPostHandler(
            "/teacher/create-assignment",
            data, loaderState
         );
         alert("new assignment posted");
         getAssignments()
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   const getAssignments = async () => {
      try {
         const response = await teacherGetHandler(
            `/teacher/get-assignment?limit=${limit}`, loaderState
         );
         setAssignment(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Menu>
         <Breadcrumb heading={"Assignments"} link="Admin" base="Assignments" />

         <div className="container">
            <div className="row">
               <div className="col-lg-4 col-md-6 mb-4">
                  <div className="form-wrap p-4 rounded-xl bg-white ">
                     <div className="heading mb-3">
                        <span className="font-bold text-2xl">
                           Create Assignment
                        </span>
                     </div>

                     <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                           <span className="font-bold text-sm text-slate-500">
                              Title
                              <small className="text-red-600">*</small>
                           </span>
                           <input
                              type="text"
                              className="form-control p-3"
                              placeholder="Title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              required
                           />
                        </div>

                        <div className="form-group mb-3">
                           <span className="font-bold text-sm text-slate-500">
                              Grade
                              <small className="text-red-600">*</small>
                           </span>
                           <select
                              className="form-select p-3"
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                              required
                           >
                              <option value="">select grade</option>
                              <option value="11">10 A</option>
                              <option value="10b">10 B</option>
                              <option value="10c">10 C</option>
                           </select>
                        </div>

                        <div className="form-group mb-3">
                           <span className="font-bold text-sm text-slate-500">
                              {" "}
                              Assignments{" "}
                              <small className="text-red-600">*</small>
                           </span>
                           <textarea
                              type="text"
                              rows={4}
                              className="form-control p-3"
                              placeholder="Announcement"
                              value={description}
                              onChange={(e) => setdescription(e.target.value)}
                              required
                           />
                        </div>

                        <div className="form-group mb-3">
                           <span className="font-bold text-sm text-slate-500">
                              {" "}
                              Link{" "}
                           </span>
                           <input
                              type="text"
                              className="form-control p-3"
                              placeholder="Title"
                              value={link}
                              onChange={(e) => setLink(e.target.value)}
                              required
                           />
                        </div>

                        <div className="btn-wrap">
                           <button className="btn bg-pri text-white w-full p-2 rounded-pill">
                              Send Announcement
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
               <div className="col-lg-8 col-md-6">
                  <div className="wrap bg-white p-4 rounded-xl">
                     <div className="heading mb-3">
                        <span className="font-bold text-2xl">
                           Assignments History
                        </span>
                     </div>
                     {assignment.map((ann, index) => (
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
                                       `/teacher/assignment/view?id=${ann._id}`
                                    )
                                 }
                              >
                                 View
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
