import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

const API_BASE_URL = 'https://agrilinkid.sisteminformasikotacerdas.id/agrilink_api/index.php/api';

export const UserProvider = ({ children }) => {
  const [farmers, setFarmers] = useState([]);

  const fetchFarmers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      const json = await response.json();

      if (json.status) {
        setFarmers(json.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const addFarmer = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/users/create`, {
      method: 'POST',
      body: formData
    });

    const json = await response.json();

    if (json.status) {
      await fetchFarmers();
      return true;
    }

    alert(json.message);
    return false;
  };

  const updateFarmer = async (id, formData) => {
    const response = await fetch(`${API_BASE_URL}/users/update/${id}`, {
      method: 'POST',
      body: formData
    });

    const json = await response.json();

    if (json.status) {
      await fetchFarmers();
      return true;
    }

    return false;
  };

  const deleteFarmer = async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/delete/${id}`, {
      method: 'DELETE'
    });

    const json = await response.json();

    if (json.status) {
      await fetchFarmers();
      return true;
    }

    return false;
  };

  return (
    <UserContext.Provider
      value={{
        farmers,
        addFarmer,
        updateFarmer,
        deleteFarmer
      }}
    >
      {children}
    </UserContext.Provider>
  );
};