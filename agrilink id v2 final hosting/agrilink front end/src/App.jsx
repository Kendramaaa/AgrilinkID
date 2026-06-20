import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './views/components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { ProductProvider } from './services/ProductContext';
import { AuthProvider } from './services/AuthContext';
import { UserProvider } from './services/UserContext';
import './App.css';
import './index.css';


function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <UserProvider>
          <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
        </UserProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;