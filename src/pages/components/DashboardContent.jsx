import AddSubject from "../AddSubject";
import Timetable from "../TimeTable";
import AddTeacher from "../AddTeacher";
import AddStudent from "../AddStudents";
import AddClass from "../../pages/AddClass";
import ParentList from "../../pages/parentData";
import Event from "../../pages/EventList";
import Exam from "../../pages/ExamList";
import Home from "../Home"
import Attendence from '../components/GetAttendence'



const DashboardContent = ({ selectedMenu }) => {
  return (
    <div className="p-8">
      {selectedMenu === "home" && (
        <div>
          <Home />
        </div>      )}

      {selectedMenu === "teachers" && (
        <div>
          <AddTeacher />
        </div>
      )}

      {selectedMenu === "students" && (
        <div>
          <AddStudent />
        </div>
      )}
      {selectedMenu === "timetable" && (
        <div>
          <Timetable />
        </div>
      )}

      {selectedMenu === "parents" && (
        <div>
          <ParentList />
        </div>
      )}

      {selectedMenu === "subjects" && (
        <div>
          <AddSubject />
        </div>
      )}

      {selectedMenu === "classes" && (
        <div>
          <AddClass />
        </div>
      )}
      {selectedMenu === "events" && (
        <div>
          <Event />
        </div>
      )}
      {selectedMenu === "exams" && (
        <div>
          <Exam />
        </div>
      )}

      {selectedMenu === "attendance" && (
        <div>
          <Attendence />
        </div>
      )}
    </div>
  );
};

export default DashboardContent;
