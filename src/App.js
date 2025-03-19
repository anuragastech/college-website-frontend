import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';
import AddTeacher from './pages/AddTeacher';
import AddStudent from './pages/AddStudents';
import AddSubject from './pages/AddSubject';
import SetTimetable from './pages/TimeTable';
import ExamList from './pages/ExamList'
import AddClass from './pages/AddClass';
import EventList from './pages/EventList'
import TeacherDashboard from './pages/Teachers/TeacherDashboard';
import TimetableDisplay from './pages/Teachers/TimetableDisplay';
import ParentData from  './pages/parentData'

import StudentDashboard from './pages/students/StudentDashboard';
import StudentProfile from './pages/students/StudentProfilePasge';
import TeacherProfile from './pages/Teachers/TeacherProfile';
import AdminHome from './pages/Home';

import TeachersHome from './pages/Teachers/TeachersHome';
import TimetableView from './pages/components/TimetableView';


function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/add-subject" element={<AddSubject />} />
      <Route path="/admin/add-student" element={<AddStudent />} />
      <Route path="/admin/add-teacher" element={<AddTeacher />} />
      <Route path="/admin/set-timetable" element={<SetTimetable />} />
      <Route path="/admin/add-class" element={<AddClass />} />
      <Route path="/admin/examList" element={<ExamList />} />
      <Route path="/admin/events" element={<EventList />} />
      <Route path="/admin/parntData" element={<ParentData />} />
      <Route path="/admin/home" element={<AdminHome />} />


      <Route path="/teachers/dashboard" element={<TeacherDashboard />} />
      <Route path="/teachers/Timetable" element={<TimetableDisplay />} />
      <Route path="/teacher/profile" element={<TeacherProfile />} />
      <Route path="/teacher/Home" element={<TeachersHome />} />

     

      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/profile" element={<StudentProfile />} />

      <Route path="/timetableview" element={<TimetableView />} />

      
    </Routes>
  );
}

export default App;
