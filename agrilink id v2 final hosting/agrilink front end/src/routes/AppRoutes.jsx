import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import Home from '../views/pages/Home';
import Marketplace from '../views/pages/Marketplace';
import Login from '../views/pages/Login';
import Signup from '../views/pages/Signup';
import Cuaca from '../views/pages/Cuaca';
import Edukasi from '../views/pages/Edukasi';
import Profil from '../views/pages/Profil';
import JualPanen from '../views/pages/JualPanen';
import AdminDashboard from '../views/pages/AdminDashboard';
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Robust role check with fallback for older data
  const userRole = (user.role || 'petani').toLowerCase();

  if (role && userRole !== role.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cuaca" element={<Cuaca />} />
      <Route path="/edukasi" element={<Edukasi />} />
      <Route 
        path="/profil" 
        element={
          <ProtectedRoute>
            <Profil />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jual-panen" 
        element={
          <ProtectedRoute role="petani">
            <JualPanen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      {/* Signup page is now used only by Admin, but we keep the route for admin usage if needed, 
          or we can nest it. For now, let's keep it but it's not linked from Login anymore. */}
      <Route 
        path="/add-farmer" 
        element={
          <ProtectedRoute role="admin">
            <Signup />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
