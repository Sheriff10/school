import React from "react";
import CalenderComp from "../../../components/Calender";

import Breadcrumb from "../../components/Breadcrumb";
import TeacherMenu from "../components/Menu";

export default function CalenderWrap() {
   return (
      <TeacherMenu>
         <Breadcrumb heading={"Calender"} link={"Teacher"} base={"calender"} />
         <CalenderComp />
      </TeacherMenu>
   );
}
