import React, { useContext, useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import { LoaderContext } from "../../../../context/LoaderContext";
import adminPostHandler from "../../../../utils/adminPostHandler";
import Menu from "../../components/Menu";
import adminGetHandler from "../../../../utils/adminGetHandler";

export default function CreateCalendar() {
   const [subject, setSubject] = useState("");
   const [grade, setGrade] = useState("");
   const [result, setResult] = useState("");
   const [students, setStudents] = useState([]);
   const [user_id, setUser_id] = useState("");
   const [student_name, setStudent_name] = useState("");

   const resultArr = ["A", "B", "C", "D", "E", "F"];
   const gradeArr = ["1", "2", "3", "4", "5", "11"];

   const loaderState = useContext(LoaderContext);

   useEffect(() => {
      getStudents();
   }, [grade]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {
         user_id,
         subject,
         student_grade: grade,
         result,
         student_name,
      };
      console.log(data);
      try {
         const response = await adminPostHandler(
            "/admin/grade/create",
            data,
            loaderState
         );
         alert("New result recorded");
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   const getStudents = async () => {
      try {
         const response = await adminGetHandler(
            `/admin/grade/students?grade=${grade}`,
            loaderState
         );
         setStudents(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   const handleSelectChange = (event) => {
      const selectedStudentId = event.target.value;
      const selectedStudent = students.find(
         (student) => student._id === selectedStudentId
      );

      setUser_id(selectedStudentId);

      if (selectedStudent) {
         setStudent_name(
            `${selectedStudent.personal_info.firstname} ${selectedStudent.personal_info.lastname}`
         );
      }
   };

   return (
      <Menu>
         <Breadcrumb heading={"New Records"} link={"Grade"} base="Record" />

         <div className="container">
            <div className="col-lg-5 col-md-8 mx-auto">
               <div className="form-wrap mb-3 bg-white p-4 rounded-xl">
                  <form onSubmit={handleSubmit}>
                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Subject
                           <small className="text-danger">*</small>
                        </span>
                        <input
                           type="text"
                           className="form-control"
                           required
                           value={subject}
                           onChange={(e) => setSubject(e.target.value)}
                        />
                     </div>

                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Grade
                           <small className="text-danger">*</small>
                        </span>
                        <select
                           className="form-select"
                           value={grade}
                           onChange={(e) => setGrade(e.target.value)}
                           required
                        >
                           <option value="" defaultChecked>
                              Select grade
                           </option>
                           {gradeArr.map((i, index) => (
                              <option value={i} defaultChecked key={index}>
                                 {i}
                              </option>
                           ))}
                        </select>
                     </div>

                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Students
                           <small className="text-danger">*</small>
                        </span>
                        <select
                           className="form-select"
                           required
                           value={user_id}
                           // onChange={(e) => setUser_id(e.target.value)}
                           onChange={(event) => handleSelectChange(event)}
                        >
                           <option value="" defaultChecked>
                              Select Students
                           </option>
                           {students.map((i, index) => (
                              <option
                                 value={i._id}
                                 key={index}
                                 onClick={() => alert("kkkkk")}
                              >
                                 {i.personal_info.firstname}{" "}
                                 {i.personal_info.lastname}
                              </option>
                           ))}
                        </select>
                     </div>
                     {/* setStudent_name(
                                       `${i.personal_info.firstname} ${i.personal_info.lastname}`
                                    ) */}
                     <div className="form-group mb-3">
                        <span className="text-sm text-slate-500 font-bold">
                           Result
                           <small className="text-danger">*</small>
                        </span>
                        <select
                           className="form-select"
                           required
                           value={result}
                           onChange={(e) => setResult(e.target.value)}
                        >
                           <option value="" defaultChecked>
                              Select Result
                           </option>
                           {resultArr.map((i, index) => (
                              <option value={i} key={index}>
                                 {i}
                              </option>
                           ))}
                        </select>
                     </div>

                     <div className="btn-wrap">
                        <button className="btn bg-pri w-100 text-white font-bold rounded-pill">
                           Record Result
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </Menu>
   );
}
