import React from "react";
import CalenderComp from "../../../components/Calender";
import Breadcrumb from "../../components/Breadcrumb";
import CalenderWrap from "../../teacher/TeacherCalender/CalenderWrap";
import StudentMenu from "../components/Menu";

export default function StudentCalendar() {
   return (
      <StudentMenu>
         <Breadcrumb heading={"Calendar"} link={"Student"} base={"calendar"} />
         <CalenderComp />
      </StudentMenu>
   );
}
