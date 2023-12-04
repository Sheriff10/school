import React from "react";

export default function StatsCard({ title, subTitle, value, imgUrl }) {
   return (
      <div className="cards p-4 flex justify-between items-center bg-white rounded-lg shadow">
         <div className="wrap">
            <div className="card-head mb-2">
               <span className="font-bold">{title}</span>
            </div>
            <div className="card-bodi">
               <span className="text-3xl font-bold">{value}</span>{" "}
               <span className="text-xs text-gray-500">{subTitle}</span>
            </div>
         </div>
         <div className="img-wrap">
            <img
               //    src="https://preschool.dreamstechnologies.com/template/assets/img/icons/dash-icon-01.svg"
               src={imgUrl}
               alt="Students"
            />
         </div>
      </div>
   );
}
