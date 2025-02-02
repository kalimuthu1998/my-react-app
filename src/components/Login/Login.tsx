import React, { useState } from 'react';
import axios from 'axios';  // Import axios
import './Login.css';  
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        console.log('Login Successful');
        navigate('/dashboard');  // Redirect to dashboard after successful login
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-submit">Sign In</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="links">
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/forgot-password")}>Forgot Password?</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
