import React from 'react';
import './App.css';
import Auth from './Components/Pages/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Pages/DashBoard';
import { AuthContext } from './Context/auth-context';
import { useAuth } from './Components/Hooks/auth-hook';

function App() {
  const { token, login, logout, role, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        role: role,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        {!token && (
          <Routes>
            <Route path="/" element={<Auth />} />
          </Routes>
        )}

        {token && (
          <Routes>
            <Route path="/" element={<Dashboard userId={userId} userRole={role} />} />
          </Routes>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
