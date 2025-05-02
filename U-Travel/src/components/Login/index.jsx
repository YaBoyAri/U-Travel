import React, { useState } from 'react';
import './style.css'; // pastikan path ini sesuai

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Login successful!');
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg-text">U-Travel</div>
      <div className="login-box">
        <h2 className="login-title">Login User</h2>

        {errorMsg && <p className="error-text">{errorMsg}</p>}

        <input
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="login-btn">Login</button>
        <button className="register-btn">Register</button>

        <div className="driver-link">
          <a href="#">Driver</a>
        </div>
      </div>
    </div>
  );
};

export default Login;