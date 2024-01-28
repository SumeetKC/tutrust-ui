// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your Spring Boot backend for authentication
      const response = await axios.post('http://localhost:8080/api/auth/signin', credentials);
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      // Redirect to the dashboard or another protected route
      navigate('/home');

    } catch (error) {
      // Handle authentication failure (e.g., display an error message)
      console.error('Authentication failed:', error.message);
    }
  };

  return (
    <>
      <section className='contacts padding'>
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input type="text" name="username" value={credentials.username} onChange={handleChange} />
            </label>
            <br />
            <label>
              Password:
              <input type="password" name="password" value={credentials.password} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Login</button>
          </form>
          <Link to="/signup">Sign Up</Link>
        </div>
      </section>
    </>
  );
};

export default Login;
