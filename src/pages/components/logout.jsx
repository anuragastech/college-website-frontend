const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login after logout
  };
  