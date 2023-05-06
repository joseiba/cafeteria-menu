import { useState } from 'react'
import coffeeIcon from '../assets/coffee.svg'
import jwtDecode from 'jwt-decode'
import '../styles/login.css'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginHandle = (e) => {
    e.preventDefault()
    // login and get an user with JWT token
    fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((tokenData) => {
        window.localStorage.setItem('accessToken', JSON.stringify(tokenData.access))
        console.log(tokenData);
        console.log(jwtDecode(tokenData.access).user_id);
        onLogin(jwtDecode(tokenData.access).user_id)
      })
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={loginHandle}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              aria-label="Username"
              placeholder="Username"
              id="username"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />

          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              aria-label="Password"
              placeholder="Password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>        
        </div>
      </form>
    </div>
  )
}

export default Login
