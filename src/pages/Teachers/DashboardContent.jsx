import Event from "../Teachers/Eventlist";
import Exams from "../Teachers/ExamList";

import StudentsList from "../Teachers/StudentList";
import Parents from "../Teachers/ParentList";
// import TimetableDisplay from '../../pages/Teachers/TimetableDisplay';
import TimetableDisplay from '../../pages/components/GetTimetable';

import TeacherProfile  from '../../pages/Teachers/TeacherProfile'

// import Attendence from "../Teachers/ExamList";
import Home from "../../pages/Teachers/TeachersHome";



const DashboardContent = ({ selectedMenu }) => {
  return (
    <div className="p-8">
      {selectedMenu === "home" && (
 <div>
          <Home />
        </div>      )}

{selectedMenu === "students" && (
        <div>
          <StudentsList />
        </div>
      )}

      {selectedMenu === "parents" && (
        <div>
          <Parents />
        </div>
      )}
      {selectedMenu === "Attendance" && (
        <div>
          <TimetableDisplay />
        </div>
      )}

      {selectedMenu === "timetable" && (
        <div>
          <TimetableDisplay />
        </div>
      )}

      {selectedMenu === "events" && (
        <div>
          <Event />
        </div>
      )}

      {selectedMenu === "exams" && (
        <div>
          <Exams />
        </div>
      )}

      {selectedMenu === "profile" && (
        <div>
          <TeacherProfile />
        </div>      )}
    </div>
  );
};

export default DashboardContent;
