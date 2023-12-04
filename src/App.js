import logo from "./logo.svg";
import "./App.css";
import "react-calendar/dist/Calendar.css"; //calender css
import Menu from "./container/admin/components/Menu";
import { Route, Routes } from "react-router-dom";
import Student from "./container/admin/Students/Student";
import ViewStudent from "./container/admin/Students/ViewStudent";
import CreateStudent from "./container/admin/Students/CreateStudent";
import StudentClass from "./container/admin/StudentClass/StudentClass";
import CreateClass from "./container/admin/StudentClass/CreateClass";
import Announcement from "./container/admin/Announcement/Announcement";
import Login from "./container/auth/Login";
import Dashboard from "./container/admin/Dashboard/Dashboard";
import MarkAttendance from "./container/admin/MarkAttendance/MarkAttendance";
import Message from "./container/admin/Dashboard/Message/Message";
import TeacherDashboard from "./container/teacher/TeacherDashboard/TeacherDashboard";
import Assignments from "./container/teacher/Assignment/Assignment";
import TeacherClass from "./container/teacher/StudentClass/TeacherClass";
import TeacherStudent from "./container/teacher/Students/Student";
import TeacherMarkAttendance from "./container/teacher/MarkAttendance/MarkAttendance";
import ViewAssignment from "./container/teacher/Assignment/View/ViewAssignment";
import ViewClasses from "./container/teacher/StudentClass/ViewClasses/ViewClasses";
import CalenderWrap from "./container/teacher/TeacherCalender/CalenderWrap";
import Home from "./container/Home/Home";
import AdminViewClasses from "./container/admin/StudentClass/ViewClasses/ViewClasses";
import StudentDashboard from "./container/student/Dashboard/Dashboard";
import StudentCalendar from "./container/student/StudentCalendar/StudentCalendar";
import StudentClass_ from "./container/student/StudentClass/StudentClass";
import StudentMessage from "./container/student/Message/StudentMessage";
import StudentAssignment from "./container/student/StudentAssignments/StudentAssignment";
import StudentViewAssignment from "./container/student/StudentAssignments/View/ViewAssignment";
import ViewAnnouncement from "./container/admin/Announcement/View";
import TeacherViewStudent from "./container/teacher/Students/ViewStudent";
import StudentViewAnnouncement from "./container/student/Dashboard/View";
import TeacherViewClasses from "./container/teacher/StudentClass/ViewClasses/ViewClasses";
import LoaderContextWrap from "./context/LoaderContext";

function App() {
   window.api = "http://localhost:5000";
   return (
      <LoaderContextWrap>
         <div className="App">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/auth/login" element={<Login />} />
               <Route path="/admin/dashboard" element={<Dashboard />} />
               <Route path="/admin/dashboard/message" element={<Message />} />
               <Route path="/admin/student" element={<Student />} />
               <Route path="/admin/student/view" element={<ViewStudent />} />
               <Route
                  path="/admin/create/student"
                  element={<CreateStudent />}
               />
               <Route path="/admin/classes" element={<StudentClass />} />
               <Route
                  path="/admin/classes/view"
                  element={<AdminViewClasses />}
               />
               <Route path="/admin/classes/create" element={<CreateClass />} />
               <Route path="/admin/announcement" element={<Announcement />} />
               <Route
                  path="/admin/announcement/view"
                  element={<ViewAnnouncement />}
               />
               <Route path="/admin/attendance" element={<MarkAttendance />} />

               {/* Teacher Route */}
               <Route
                  path="/teacher/dashboard"
                  element={<TeacherDashboard />}
               />
               <Route path="/teacher/assignment" element={<Assignments />} />
               <Route
                  path="/teacher/assignment/view"
                  element={<ViewAssignment />}
               />
               <Route path="/teacher/classes" element={<TeacherClass />} />
               <Route
                  path="/teacher/classes/view"
                  element={<TeacherViewClasses />}
               />
               <Route path="/teacher/student" element={<TeacherStudent />} />
               <Route
                  path="/teacher/student/view"
                  element={<TeacherViewStudent />}
               />
               <Route
                  path="/teacher/attendance"
                  element={<TeacherMarkAttendance />}
               />
               <Route path="/teacher/calender" element={<CalenderWrap />} />

               {/* Student Routes */}
               <Route
                  path="/student/dashboard"
                  element={<StudentDashboard />}
               />
               <Route
                  path="/student/dashboard/announcement"
                  element={<StudentViewAnnouncement />}
               />
               <Route path="/student/calendar" element={<StudentCalendar />} />
               <Route path="/student/class" element={<StudentClass_ />} />
               <Route path="/student/message" element={<StudentMessage />} />
               <Route
                  path="/student/assignments"
                  element={<StudentAssignment />}
               />
               <Route
                  path="/student/assignments/view"
                  element={<StudentViewAssignment />}
               />
            </Routes>
         </div>
      </LoaderContextWrap>
   );
}

export default App;
