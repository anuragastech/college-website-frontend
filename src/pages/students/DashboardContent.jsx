

import Event from "../Teachers/ExamList";
import Exams from "../Teachers/ExamList";
import Subjects from  '../students/subjectlist'
// import TimetableDisplay from '../../pages/students/Timetable';
import TimetableDisplay from '../../pages/components/GetTimetable';


const DashboardContent = ({ selectedMenu }) => {
  return (
    <div className="p-8">
      {selectedMenu === "home" && (
        <h2 className="text-2xl font-bold">Welcome to the Dashboard!</h2>
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

      {selectedMenu === "subjects" && (
        <div>
          <Subjects />
        </div>
      )}

      {selectedMenu === "exams" && (
        <div>
          <Exams />
        </div>
      )}

      {selectedMenu === "attendance" && (
        <h2 className="text-2xl font-bold">Attendance Records</h2>
      )}
    </div>
  );
};

export default DashboardContent;
