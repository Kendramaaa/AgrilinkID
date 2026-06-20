import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <div className="navbar">
        <h2 className="logo">
          <Link to="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-leaf-fill" viewBox="0 0 16 16">
              <path d="M1.4 1.7c.217.289.65.84 1.725 1.274 1.093.44 2.885.774 5.834.528 2.02-.168 3.431.51 4.326 1.556C14.161 6.082 14.5 7.41 14.5 8.5q0 .344-.027.734C13.387 8.252 11.877 7.76 10.39 7.5c-2.016-.288-4.188-.445-5.59-2.045-.142-.162-.402-.102-.379.112.108.985 1.104 1.82 1.844 2.308 2.37 1.566 5.772-.118 7.6 3.071.505.8 1.374 2.7 1.75 4.292.07.298-.066.611-.354.715a.7.7 0 0 1-.161.042 1 1 0 0 1-1.08-.794c-.13-.97-.396-1.913-.868-2.77C12.173 13.386 10.565 14 8 14c-1.854 0-3.32-.544-4.45-1.435-1.124-.887-1.889-2.095-2.39-3.383-1-2.562-1-5.536-.65-7.28L.73.806z"/>
            </svg> Agrilink ID
          </Link>
        </h2>
        <ul className="menu">
          <li><Link className={isActive('/cuaca')} to="/cuaca">Cuaca</Link></li>
          <li><Link className={isActive('/edukasi')} to="/edukasi">Edukasi</Link></li>
          <li><Link className={isActive('/marketplace')} to="/marketplace">Marketplace</Link></li>
          
          {user ? (
            <>
              <li><Link className={isActive('/profil')} to="/profil">Profil</Link></li>
              
              {user.role === 'admin' ? (
                <li><Link className={isActive('/admin')} to="/admin">Dashboard Admin</Link></li>
              ) : (
                location.pathname !== '/jual-panen' && (
                  <li><Link to="/jual-panen" className={`btn-sell ${isActive('/jual-panen')}`}><i className="bi bi-plus-lg"></i> Jual Panen</Link></li>
                )
              )}
              
              <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
            </>
          ) : (
            <li><Link className={isActive('/login')} to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
