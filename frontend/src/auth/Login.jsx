import "./Login.css"
import { useState } from "react";
import {Link} from "react-router-dom"
const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className="login-page">
        <div className="login-container">
            <div className="login-left-box">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path fill="#A0E8AF" d="M51.8,-61.4C57.9,-45.6,47.4,-22.8,44.1,-3.2C40.9,16.4,45,32.7,38.8,48.3C32.7,63.8,16.4,78.6,0.3,78.3C-15.8,78,-31.5,62.7,-47.3,47.1C-63,31.5,-78.7,15.8,-78.3,0.5C-77.8,-14.8,-61.2,-29.7,-45.4,-45.4C-29.7,-61.2,-14.8,-77.8,4,-81.8C22.8,-85.8,45.6,-77.1,51.8,-61.4Z" transform="translate(100 100)" />
</svg>
            <div className="app-head">
                Smart Dairy
            </div>
            <div className="app-side-head">
            Smart Dairy transforms the mundane task of recording daily <br/> activities into a  journey of self-discovery and growth, <br/> where every entry becomes a testament to personal progress and reflection.
            </div>
            </div>
            <div className="login-right-box">
        <div className="auth-nav">
            <div className="auth-head">Login</div>
        </div>
      <form onSubmit={handleLogin} className="login-form">
        <div>
          
          <input
            placeholder="Username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="auth-nav">
        <a href="#" onClick={handleForgotPassword}>
          Forgot Password?
        </a>
        <Link to="/signup" className="sign-link">Sign Up</Link>
      </div>
        <button type="submit">Login</button>
      </form>
      
            </div>
        </div>
    </div>
  )
}

export default Login