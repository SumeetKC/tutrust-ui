import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    console.log('Inside Signup');
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your signup logic here, for example, send the data to the server
    try {
        // Make a POST request to your Spring Boot backend for authentication
        console.log('Formdata is ', formData);
        const response = await axios.post('http://localhost:8080/api/auth/signup', formData);
        console.log('Signup successful:', response.data);
        // Redirect to the dashboard or another protected route
        navigate('/login');
      } catch (error) {
        // Handle authentication failure (e.g., display an error message)
        console.error('Signup failed:', error.message);
      }
    // Reset the form after submission
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
