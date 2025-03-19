const handleLogout = async () => {
    try {
      await instance.post('/api/auth/logout');
      navigate('/login');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  