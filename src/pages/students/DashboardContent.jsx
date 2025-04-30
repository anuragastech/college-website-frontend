import Event from "../Teachers/ExamList";
import Exams from "../Teachers/ExamList";
import Subjects from '../students/subjectlist';
import TimetableDisplay from '../../pages/components/GetTimetable';
import AttendenceDisplay from '../../pages/students/StudentAttendenceDisplay';
import StudentHome from '../students/StudentHomePae';

const DashboardContent = ({ selectedMenu, setSelectedMenu }) => {
  return (
    <div className="p-8">
      {selectedMenu === "home" && (
        <div>
          <StudentHome setSelectedMenu={setSelectedMenu} />
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
        <div>
          <AttendenceDisplay />
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
