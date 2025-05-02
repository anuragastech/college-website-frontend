import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import StudentRegister from './pages/students/signup';

import AdminDashboard from './pages/AdminDashboard';
import AddTeacher from './pages/AddTeacher';
import AddStudent from './pages/AddStudents';
import AddSubject from './pages/AddSubject';
import SetTimetable from './pages/TimeTable';
import ExamList from './pages/ExamList';
import AddClass from './pages/AddClass';
import EventList from './pages/EventList';
import ParentData from './pages/parentData';

import TeacherDashboard from './pages/Teachers/TeacherDashboard';
import TimetableAttendence from './pages/Teachers/TimetableDisplay';
import TeacherProfile from './pages/Teachers/TeacherProfile';
import TeachersHome from './pages/Teachers/TeachersHome';

import StudentDashboard from './pages/students/StudentDashboard';
import StudentProfile from './pages/students/StudentProfilePasge';
import GetStudentAttendence from './pages/students/StudentAttendenceDisplay';

import TimetableView from './pages/components/TimetableView';
import GetAttendence from './pages/components/GetAttendence';
import CreateTImetable from './pages/CreateMonthlyTimetabble';
import GetMonthlTImetable from './pages/components/GetMonthlTimetable';
import ClassWiswStudennts from './pages/GetAllClasswiseStudents';

import AdminHome from './pages/Home';
import PrivateRoute from './pages/components/privetRoute';
import StudentHomePage from './pages/students/StudentHomePae';
import StudentLogin from './pages/students/stdLogin';
import TchrLogin    from './pages/Teachers/loginTchr'
import  TchrSignup from './pages/Teachers/signupTchr'


import Home from './pages/HomePage/home';
import About from './pages/components/aboutHome';
import Contact from './pages/components/contactHome'

function App() {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/admin" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/studentLogin" element={<StudentLogin />} />
      <Route path="/studensinup" element={<StudentRegister />} />

      <Route path="/registerteacher" element={<TchrSignup />} />
      <Route path="/teacher" element={<TchrLogin />} />


      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />


      {/* 👑 Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={<PrivateRoute element={<AdminDashboard />} allowedRoles={['admin']} />}
      />
      <Route
        path="/admin/add-subject"
        element={<PrivateRoute element={<AddSubject />} allowedRoles={['admin']} />}
      />
      <Route
        path="/admin/add-student"
        element={<PrivateRoute element={<AddStudent />} allowedRoles={['admin']} />}
      />
      <Route
        path="/admin/add-teacher"
        element={<PrivateRoute element={<AddTeacher />} allowedRoles={['admin']} />}
      />
      <Route
        path="/admin/set-timetable"
        element={<PrivateRoute element={<SetTimetable />} allowedRoles={['admin']} />}
      />
      <Route
        path="/admin/add-class"
        element={<PrivateRoute element={<AddClass />} allowedRoles={['admin']} />}
      />
      <Route
        path="/admin/examList"
        element={<PrivateRoute element={<ExamList />} allowedRoles={['admin']} />}
      />
      <Route
        path="/admin/events"
        element={<PrivateRoute element={<EventList />} allowedRoles={['admin']} />}
      />
      <Route
        path="/admin/parentData"
        element={<PrivateRoute element={<ParentData />} allowedRoles={['admin']} />}
      />
      <Route
        path="/admin/home"
        element={<PrivateRoute element={<AdminHome />} allowedRoles={['admin']} />}
      />

      {/* 👨‍🏫 Teacher Routes */}
      <Route
        path="/teachers/dashboard"
        element={<PrivateRoute element={<TeacherDashboard />} allowedRoles={['teacher']} />}
      />
      <Route
        path="/teachers/attendence"
        element={<PrivateRoute element={<TimetableAttendence />} allowedRoles={['teacher']} />}
      />
      <Route
        path="/teacher/profile"
        element={<PrivateRoute element={<TeacherProfile />} allowedRoles={['teacher']} />}
      />
      <Route
        path="/teacher/home"
        element={<PrivateRoute element={<TeachersHome />} allowedRoles={['teacher']} />}
      />

      {/* 🧑‍🎓 Student Routes */}
      <Route
        path="/student/dashboard"
        element={<PrivateRoute element={<StudentDashboard />} allowedRoles={['student']} />}
      />
      <Route
        path="/student/profile"
        element={<PrivateRoute element={<StudentProfile />} allowedRoles={['student']} />}
      />
      <Route
        path="/getattendencestudent"
        element={<PrivateRoute element={<GetStudentAttendence />} allowedRoles={['student']} />}
      />
      <Route
        path="/studenthome"
        element={<PrivateRoute element={<StudentHomePage />} allowedRoles={['student']} />}
      />

      {/* 🌍 Common Routes */}
      <Route
        path="/timetableview"
        element={<PrivateRoute element={<TimetableView />} allowedRoles={['admin', 'teacher', 'student']} />}
      />
      <Route
        path="/getattendence"
        element={<PrivateRoute element={<GetAttendence />} allowedRoles={['admin', 'teacher', 'student']} />}
      />
      <Route
        path="/monthlytimetable"
        element={<PrivateRoute element={<CreateTImetable />} allowedRoles={['admin', 'teacher']} />}
      />
      <Route
        path="/getmonthlytimetable"
        element={<PrivateRoute element={<GetMonthlTImetable />} allowedRoles={['admin', 'teacher', 'student']} />}
      />
      <Route
        path="/classwise"
        element={<PrivateRoute element={<ClassWiswStudennts />} allowedRoles={['admin']} />}
      />
    </Routes>
  );
}

export default App;
