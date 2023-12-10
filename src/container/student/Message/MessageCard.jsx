import React, { useState } from "react";

export default function MessageCard({ title, description }) {
   const [show, setShow] = useState(false);
   return (
      <div className="container">
         <div className=" wrap flex  gap-4 justify-between mb-3 items-center border-bottom bg-pri text-white  px-3 p-2 rounded-lg">
            <div className={` col`}>
               <span className="text-lg font-bold capitalize">{title}</span>{" "}
               <br />
               <span className="text-slate-300 text-sm">{description}</span>
            </div>

            <div className="btn-wrap">
               <button
                  className="btn bg-white rounded-lg text-black btn-sm"
                  onClick={() => setShow(!show)}
               >
                  Read more
               </button>
            </div>
         </div>
      </div>
   );
}
