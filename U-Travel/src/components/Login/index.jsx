import React, { useState } from 'react';

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
    <div className="flex items-center justify-center h-screen bg-white relative overflow-hidden rounded-[40px]">
      <div className="absolute text-[100px] font-bold text-blue-100 rotate-45 select-none -z-10">
        U-Travel
      </div>

      <div className="w-[85%] max-w-sm">
        <h2 className="text-center text-3xl font-bold text-[#005B96] drop-shadow-md mb-8">
          Login
        </h2>

        {errorMsg && (
          <p className="text-red-600 text-center mb-4 font-medium">{errorMsg}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 mb-4 rounded-full bg-gray-300 placeholder-gray-600 text-sm focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 mb-6 rounded-full bg-gray-300 placeholder-gray-600 text-sm focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 mb-4 rounded-full bg-[#2E4A7D] text-white font-semibold shadow-md hover:bg-[#203761] transition"
        >
          Login
        </button>
        <button className="w-full py-3 rounded-full bg-[#64B5F6] text-white font-semibold shadow-md hover:bg-[#42A5F5] transition">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;