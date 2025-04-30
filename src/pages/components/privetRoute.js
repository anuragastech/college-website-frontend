// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ element }) => {
//   const token = localStorage.getItem('token'); // Check for token

//   return token ? element : <Navigate to="/" />;
// };

// export default PrivateRoute;




import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem('token');
  console.log('Token:', token);

  if (!token) {

    return <Navigate to="/" />;
  }

  try {
    
    // ✅ Decode JWT payload to get user role
    const user = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded User:', user);

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // ✅ Redirect based on role
      switch (user.role) {
        case 'student':
          return <Navigate to="/student/dashboard" />;
        case 'teacher':
          return <Navigate to="/teachers/dashboard" />;
        case 'admin':
          return <Navigate to="/admin/dashboard" />;
        default:
          return <Navigate to="/" />;
      }
    }

    // ✅ Render component if authorized
    return element;
  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('token');

    // ✅ Redirect based on user role during logout
    const user = JSON.parse(atob(token.split('.')[1]));
    if (user) {
      switch (user.role) {
        case 'student':
          return <Navigate to="/" />;
        case 'teacher':
        case 'admin':
          return <Navigate to="/admin" />;
        default:
          return <Navigate to="/" />;
      }
    }

    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
