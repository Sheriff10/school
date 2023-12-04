import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import studentGetHandler from "../../../utils/studentGetHandler";
import studentPostHandler from "../../../utils/studentPostHandler";
import Breadcrumb from "../../components/Breadcrumb";
import StudentMenu from "../components/Menu";
import MessageCard from "./MessageCard";

export default function StudentMessage() {
   const loaderState  = useContext(LoaderContext);

   const dum = [1, 2, 3];
   const [title, setTitle] = useState("");
   const [description, setdescription] = useState("");
   const [limit, setLimit] = useState(3);

   const [messages, setMessages] = useState([]);

   useEffect(() => {
      getMessages();
   }, [limit]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const data = { type: "message", title, description };
      try {
         const response = await studentPostHandler(
            "/student/create-content",
            data, loaderState
         );
         getMessages()
         alert("new message posted");
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   const getMessages = async () => {
      try {
         const response = await studentGetHandler(
            `/student/get-messages?limit=${limit}`, loaderState
         );
         setMessages(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <StudentMenu>
         <Breadcrumb heading={"Send Message"} link="student" base={"message"} />

         <div className="container">
            <div className="row">
               <div className="col-lg-4 col-md-6">
                  <div className="form-wrap p-4 rounded-xl bg-white ">
                     <div className="heading mb-3">
                        <span className="font-bold text-2xl">
                           Send Admin Message
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
                              {" "}
                              Messaage{" "}
                              <small className="text-red-600">*</small>
                           </span>
                           <textarea
                              type="text"
                              rows={4}
                              className="form-control p-3"
                              placeholder="Type your message"
                              value={description}
                              onChange={(e) => setdescription(e.target.value)}
                              required
                           />
                        </div>

                        <div className="btn-wrap">
                           <button className="btn bg-pri text-white w-full p-2 rounded-pill">
                              Send Assignment
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
               <div className="col-lg-8 col-md-6">
                  <div className="wrap bg-white p-4 rounded-xl">
                     <div className="heading flex justify-between mb-3">
                        <span className="font-bold text-2xl">
                           Previous Messages
                        </span>
                        {limit === 3 ? (
                           <span
                              className="text-pri cursor-pointer font-bold"
                              onClick={() => setLimit("")}
                           >
                              view all
                           </span>
                        ) : (
                           <span
                              className="text-pri cursor-pointer font-bold"
                              onClick={() => setLimit(3)}
                           >
                              view less
                           </span>
                        )}
                     </div>
                     {messages.map((ann, index) => (
                        <MessageCard
                           key={index}
                           title={ann.title}
                           description={ann.description}
                        />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </StudentMenu>
   );
}
