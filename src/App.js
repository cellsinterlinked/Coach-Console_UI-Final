import React, { useState, useContext, useEffect, useCallback } from 'react';
import './App.css';
import Auth from './Components/Pages/Auth';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Components/Pages/DashBoard';
import { AuthContext } from './Context/auth-context';

let logoutTimer;

function App() {

  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false)
  const [role, setRole] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState()
  const auth = useContext(AuthContext)



  const login = useCallback((uid, token, role, expirationDate) => {
    setToken(token);
    setUserId(uid)
    setRole(role)
    const tokenExpirationDate = expirationDate ||  new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate)
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        role: role,
        expiration: tokenExpirationDate.toISOString()
      }))

  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setRole(null);
    localStorage.removeItem('userData');

  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime()
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, storedData.role, new Date(storedData.expiration));
    }
  }, [login]);



  console.log(token)

  return (
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
        userId: userId,
        role: role,
        token: token,
        login: login,
        logout: logout
    }}>
    <BrowserRouter>
      {token === false && (
        <Routes>
          <Route path="/" element={<Auth setToken={setToken} />} />
        </Routes>
      )}

      {token === true && (
        <Routes>
          <Route path="/" element={<Dashboard /> } />
        </Routes>
      )}
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
