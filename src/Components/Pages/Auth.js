import React, {useState, useContext} from 'react'
import CoverImage from '../../Resources/tyler-nix-Y1drF0Y3Oe0-unsplash.jpg';
import './Auth.css';
import Input from '../Forms/InputFront';
import Button from '../Buttons/Button';
import Validator from 'validator'
import Axios from 'axios'
import {AuthContext} from '../../Context/auth-context';


const Auth = ({setToken}) => {
  const auth = useContext(AuthContext)
  const [login, setLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const [coachId, setCoachId] = useState("")




  const signInToggle = () => {
    setLogin(true)
  }

  const signUpToggle = () => {
    setLogin(false)
  }





  const signInSubmit = async(e) => {
    let res;
    e.preventDefault()
    if (Validator.isEmail(email) === false) {
      return setError("Please enter a valid email")
    } else if (password.length < 6) {
      return setError("Password must be at least 6 characters")
    } else {
      try{
        res = await Axios.post('http://localhost:5000/api/users/login', {email: email, password: password})
        auth.login(res.data.userId, res.data.token, res.data.role )
        console.log(res)
      } catch (err) {
        setError(`Check your credentials and try again ${err}`)
        return;
      }
      setToken(true)
  }
}

  const signUpSubmit = (e) => {
    e.preventDefault()
    if (Validator.isEmail(email) === false) {
      return setError("Please enter a valid email")
    } else if (password.length < 6) {
      return setError("Password must be at least 6 characters")
    } else if (password !== confirmPassword) {
      return setError("Passwords must match")
    } else {
      setToken(true)
    }
  }


  return (
    <div className="auth-wrapper center">
      <div className="auth-container">
        <div className="auth-image-wrapper center">
          <img src={CoverImage} alt="" />
          <div className="vignette"></div>
        </div>
        <div className="auth-details center">
          <h1>COACH CONSOLE</h1>
          <p>Something About How Cool This App Is</p>
          <p>More information neato stuff cool you know
            whats up all the information about all the
            cool features and customization and buzz words
            to make you click.
          </p>
        </div>
        <div className="auth-form center">
          <h1 className={login === false ? "loginHead" : "loginHead text-hidden"}>SIGN UP</h1>
          <h1 className={login === true ? "loginHead" : "loginHead text-hidden"}>LOGIN</h1>
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
          name={login === true ? "front-input hidden" :"front-input"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="error-container">
            {error && <p>{error}</p>}
          </div>
          <Button
           name={login === true ? "auth-button-primary" : "auth-button-secondary"}
           contents="SIGN IN"
           click={login === false ? signInToggle : signInSubmit}
          />
          <Button
           name={login === false ? "auth-button-primary" : "auth-button-secondary"}
           contents="SIGN UP"
           click={login === true ? signUpToggle : signUpSubmit }
          />






        </div>

      </div>

    </div>
  )
}

export default Auth;