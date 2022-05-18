import React, { useState, useContext } from 'react';
import CoverImage from '../../Resources/tyler-nix-Y1drF0Y3Oe0-unsplash.jpg';
import './Auth.css';
import Input from '../Forms/InputFront';
import Button from '../Buttons/Button';
import Validator from 'validator';
import Axios from 'axios';
import { AuthContext } from '../../Context/auth-context';
import icon from '../../Resources/Group 1.png';
import { useHttpClient } from '../Hooks/http-hook';

const Auth = () => {
  const auth = useContext(AuthContext);
  const { error, sendRequest, setError } = useHttpClient();
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [role, setRole] = useState('coach');
  const [coachCode, setCoachCode] = useState('');

  const signInToggle = () => {
    setLogin(true);
  };

  const signUpToggle = () => {
    setLogin(false);
  };

  const signInSubmit = async (e) => {
    let res;
    e.preventDefault();
    if (Validator.isEmail(email) === false) {
      return setError('Please enter a valid email');
    } else if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    } else {
      try {
        res = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/login',
          'post',
          {
            email: email,
            password: password,
          }
        );
        auth.login(res.data.userId, res.data.token, res.data.role);
      } catch (err) {}
    }
  };

  const signUpSubmit = async (e) => {
    let res;
    e.preventDefault();
    if (Validator.isEmail(email) === false) {
      return setError('Please enter a valid email');
    } else if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    } else if (password !== confirmPassword) {
      return setError('Passwords must match');
    } else if (role === 'client' && coachCode.length !== 10) {
      return setError(
        'Please enter the full Coach Code provided by your trainer'
      );
    } else {
      try {
        res = await Axios.post(
          process.env.REACT_APP_BACKEND_URL + '/users/signup',
          {
            email: email,
            password: password,
            role: role,
            coachCode: coachCode,
          }
        );
      } catch (err) {
        setError(` ${err}`);
        return;
      }

      console.log('sign up', res.data);
      auth.login(res.data.userId, res.data.token, res.data.role);
    }
  };

  return (
    <div className="auth-wrapper center">
      <div className="auth-container">
        <div className="auth-image-wrapper center">
          <img src={CoverImage} alt="" />
          <div className="vignette"></div>
        </div>
        <div className="auth-details center">
          <div className="auth-icon-container">
            <img alt="" src={icon} />
          </div>
          <h1>COACH CONSOLE</h1>
          <p>Something About How Cool This App Is</p>
          <p>
            More information neato stuff cool you know whats up all the
            information about all the cool features and customization and buzz
            words to make you click.
          </p>
        </div>
        <div className="auth-form center">
          <h1
            className={login === false ? 'loginHead' : 'loginHead text-hidden'}
          >
            SIGN UP
          </h1>
          <h1
            className={login === true ? 'loginHead' : 'loginHead text-hidden'}
          >
            LOGIN
          </h1>
          <Input
            name="front-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="front-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            name={login === true ? 'front-input hidden' : 'front-input'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Input
            name={
              login !== true && role === 'client'
                ? 'front-input'
                : 'front-input hidden'
            }
            placeholder="Coach Code"
            value={coachCode}
            onChange={(e) => setCoachCode(e.target.value)}
          />

          {login === false && (
            <section className="role-select-wrapper">
              <p>Are you here as a coach or client?</p>
              <div className="role-button-container">
                <div
                  className={
                    role === 'coach' ? 'role-button role-active' : 'role-button'
                  }
                  onClick={() => setRole('coach')}
                >
                  COACH
                </div>
                <div
                  className={
                    role === 'client'
                      ? 'role-button role-active'
                      : 'role-button'
                  }
                  onClick={() => setRole('client')}
                >
                  CLIENT
                </div>
              </div>
            </section>
          )}

          <div className="error-container">{error && <p>{error}</p>}</div>
          <Button
            name={
              login === true ? 'auth-button-primary' : 'auth-button-secondary'
            }
            contents="SIGN IN"
            click={login === false ? signInToggle : signInSubmit}
          />
          <Button
            name={
              login === false ? 'auth-button-primary' : 'auth-button-secondary'
            }
            contents="SIGN UP"
            click={login === true ? signUpToggle : signUpSubmit}
          />

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
