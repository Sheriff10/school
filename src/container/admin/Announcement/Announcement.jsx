import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoaderContext } from "../../../context/LoaderContext";
import adminGetHandler from "../../../utils/adminGetHandler";
import adminPostHandler from "../../../utils/adminPostHandler";
import Breadcrumb from "../../components/Breadcrumb";
import Menu from "../components/Menu";

export default function Announcement() {
   const loaderState  = useContext(LoaderContext);

   const navi = useNavigate();
   const [title, setTitle] = useState("");
   const [description, setdescription] = useState("");
   const [announcement, setAnnouncement] = useState([]);
   const [limit, setLimit] = useState(3);

   useEffect(() => {
      getAnnouncement();
   }, [limit]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      const data = { type: "announcement", title, description };
      try {
         const response = await adminPostHandler("/admin/create-content", data, loaderState);
         getAnnouncement();
         alert("new announcemment posted");
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   const getAnnouncement = async () => {
      try {
         const response = await adminGetHandler(
            `/admin/get-announcement?limit=${limit}`, loaderState
         );
         setAnnouncement(response);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Menu>
         <Breadcrumb
            heading={"announcement"}
            link="Admin"
            base="announcement"
         />

         <div className="container">
            <div className="row">
               <div className="col-lg-4 col-md-6">
                  <div className="form-wrap p-4 rounded-xl bg-white ">
                     <div className="heading mb-3">
                        <span className="font-bold text-2xl">
                           Create Announcement
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
                              Announcement{" "}
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

                        <div className="btn-wrap">
                           <button className="btn bg-pri text-white w-full p-2 rounded-pill">
                              Send Assignment
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
               <div className="col-lg-8 col-md-6">
                  <div className="wrap bg-white p-4">
                     <div className="heading mb-3 flex justify-between items-center">
                        <span className="font-bold text-2xl">
                           Announcements
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
                     {announcement.map((ann, index) => (
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
                                       `/admin/announcement/view?id=${ann._id}`
                                    )
                                 }
                              >
                                 Read more
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
