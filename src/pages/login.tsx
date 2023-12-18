import { useState } from 'react';
import { loginUser } from '../services/authService'; // Import the login service
import { useRouter } from 'next/router';
import './dashboard.css';

const LoginPage = () => {
  // Initialize Next.js router
  const router = useRouter();

  // State variables for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle the login process
  const handleLogin = async () => {
    // Validation: Check if email or password is empty
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('You must enter User and Password!');
      return;
    }

    try {
      // Attempt to log in the user
      setErrorMessage('Signing In...');
      const response = await loginUser(email, password);

      // On successful login:
      // Store token and email in local storage
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', email);
      setErrorMessage('');

      // Redirect user to the dashboard
      router.push('/dashboard');
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error);
      setErrorMessage('Error verifying user at https://reqres.in/!');
    }
  };

  // Function to navigate to the signup page
  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className='form-login'>
      <h1>Login</h1>
      {/* Email input */}
      <label htmlFor="email" className='label-login'><b>Email</b></label>
      <input type="email" className='board-add-list-input-login' value={email} onChange={(e) => setEmail(e.target.value)} />
      {/* Password input */}
      <label htmlFor="password" className='label-login'><b>Password</b></label>
      <input type="password" className='board-add-list-input-login' value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* Display error message */}
      <h3>{errorMessage}</h3>
      <div className='login-botton'>
        {/* Login and Signup buttons */}
        <button className='add-card-btn-login btn' onClick={handleLogin}>Login</button>
        <button className='add-card-btn-login-red btn' onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
