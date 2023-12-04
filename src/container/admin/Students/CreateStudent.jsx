import React, { useContext, useState } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import adminPostHandler from "../../../utils/adminPostHandler";
import Breadcrumb from "../../components/Breadcrumb";
import Menu from "../components/Menu";

export default function CreateStudent() {
   const loaderState  = useContext(LoaderContext);

   const initialValues = {
      username: "",
      password: "",
      role: "",
      firstname: "",
      lastname: "",
      address: "",
      grade: "",
      dob: "",
   };

   const [formData, setFormData] = useState(initialValues);

   const handleInputChange = (key, value) => {
      setFormData((prevData) => ({
         ...prevData,
         [key]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await adminPostHandler(
            "/admin/create-student",
            formData, loaderState
         );
         console.log(response);
         console.log("Form Data:", formData);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Menu>
         <Breadcrumb
            heading={"Add Student"}
            link={"Student"}
            base={"Create "}
         />
         <div className="container">
            <div className="wrap bg-white rounded-xl p-4">
               <div className="heading mb-4 ">
                  <span className="text-xl font-bold">Add New Student</span>
               </div>

               <form onSubmit={handleSubmit}>
                  <div className="form-wrap row">
                     {Object.keys(initialValues).map((key) => (
                        <div className="form-group col-lg-4 mb-3" key={key}>
                           <span className="font-bold text-sm text-slate-500">
                              {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                              {<small className="text-red-600">*</small>}
                           </span>
                           <input
                              type={key === "password" ? "password" : "text"}
                              className="form-control p-3"
                              placeholder={
                                 key.charAt(0).toUpperCase() + key.slice(1)
                              }
                              value={formData[key]}
                              onChange={(e) =>
                                 handleInputChange(key, e.target.value)
                              }
                              required
                           />
                        </div>
                     ))}
                     <div className="btn-wrap col-12">
                        <button
                           className="btn bg-pri btn-lg text-white"
                           // onClick={handleSubmit}
                        >
                           Add Student
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </Menu>
   );
}
