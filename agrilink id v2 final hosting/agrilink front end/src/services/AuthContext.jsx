import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('agrilink_user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {

      const response = await fetch(
      'https://agrilinkid.sisteminformasikotacerdas.id/agrilink_api/index.php/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            email,
            password
          })
        }
      );

      const result = await response.json();

      console.log(result);

      if (result.status === true) {

        setUser(result.user);

        localStorage.setItem(
          'agrilink_user',
          JSON.stringify(result.user)
        );

        return {
          success: true
        };
      }

      return {
        success: false
      };

    } catch (error) {

      console.error(error);

      return {
        success: false,
        message: 'Gagal terhubung ke server'
      };
    }
  };

  const updateUser = async (data) => {
    try {

      const formData = new FormData();

      formData.append('id', user.id);
      formData.append('name', data.name);
      formData.append('phone', data.phone);

      const response = await fetch(
      'https://agrilinkid.sisteminformasikotacerdas.id/agrilink_api/index.php/api/auth/update',        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();

      if (result.status) {

        setUser(result.user);

        localStorage.setItem(
          'agrilink_user',
          JSON.stringify(result.user)
        );

        return {
          success: true
        };
      }

      return {
        success: false
      };

    } catch (error) {

      console.error(error);

      return {
        success: false
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrilink_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;