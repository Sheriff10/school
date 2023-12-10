import React, { useContext, useState } from "react";
import { FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { LoaderContext } from "../../context/LoaderContext";
import loginPostHandler from "../../utils/authPostHandler";

export default function Login() {
   const loaderState  = useContext(LoaderContext);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const navi = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const data = { username, password };
         const response = await loginPostHandler("/admin/auth", data, loaderState);
         const { user } = response;

         switch (user) {
            case "administrator":
               navi("/admin/dashboard");
               break;

            case "student":
               navi("/student/dashboard");
               break;

            case "teacher":
               navi("/teacher/dashboard");
               break;

            default:
               break;
         }

         console.log(user);
      } catch (error) {
         console.log(error);
         if (error) console.log("Invalid credential");
      }
   };
   return (
      <>
         <Header />
         <div className="container">
            <div className="col-lg-6 mx-auto py-32">
               <div className="form-wrap shadow-lg p-3 rounded-lg">
                  <div className="heading mb-3 text-center">
                     <span className="text-2xl font-bold">
                        Login to your dashboard
                     </span>
                  </div>
                  <form onSubmit={handleSubmit}>
                     <div className="form-group mb-3">
                        <span className="font-bold text-sm text-slate-500">
                           {" "}
                           Username <small className="text-red-600">*</small>
                        </span>
                        <input
                           type="text"
                           className="form-control p-3"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                        />
                     </div>

                     <div className="form-group mb-3">
                        <span className="font-bold text-sm text-slate-500">
                           {" "}
                           Password <small className="text-red-600">*</small>
                        </span>
                        <input
                           type="password"
                           className="form-control p-3"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </div>

                     <div className="btn-wrap">
                        <button className="btn bg-pri w-full hover:bg-blue-500  text-white">
                           Login
                        </button>
                     </div>
                  </form>

                  <div className="info flex gap-2 items-center my-3 text-sm">
                     <span className="bg-pri bg-opacity-50 text-pri p-2 rounded-full">
                        {" "}
                        <FaInfo />
                     </span>{" "}
                     <span className="text-pri font-bold">
                        Forgotten Credential? Contact Admin
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
