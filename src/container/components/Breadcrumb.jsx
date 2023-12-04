import React from "react";

export default function Breadcrumb({ heading, link, base }) {
   return (
      <div className="breadcrumb">
         <div className="d-flex container justify-between py-3">
            <div className="heading">
               <span className="text-xl font-bold">{heading}</span>
            </div>
            <div className="text-wrap capitalize">
               <span className="text-lg font-medium">{link}</span> /{" "}
               <span className="text-sm">{base}</span>
            </div>
         </div>
      </div>
   );
}
