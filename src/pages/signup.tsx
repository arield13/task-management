import { useState } from 'react';
import { signupUser } from '../services/authService'; // Import the signup service
import { useRouter } from 'next/router';

const SignupPage = () => {
  // Initialize Next.js router
  const router = useRouter();

  // State variables for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle the signup process
  const handleSignup = async () => {
    try {
      // Attempt to sign up the user
      const response = await signupUser(email, password);

      // On successful signup:
      // Store token in local storage
      localStorage.setItem('token', response.token);
      setErrorMessage('');

      // Redirect user to the login page
      router.push('/login');
    } catch (error: any) {
      // Handle signup error
      console.error('Signup failed:', error);
      // Set error message, showing the error and suggesting to check a link for details
      setErrorMessage(`${error.message} check: https://reqres.in/!` || 'Signup failed');
    }
  };

  // Function to cancel signup and go back to the login page
  const handleCancel = () => {
    router.push('/login');
  };

  return (
    <div className='form-login'>
      <h1>Sign Up</h1>
      {/* Email input */}
      <label htmlFor="email" className='label-login'><b>Email</b></label>
      <input type="email" className='board-add-list-input-login' value={email} onChange={(e) => setEmail(e.target.value)} />
      {/* Password input */}
      <label htmlFor="password" className='label-login'><b>Password</b></label>
      <input type="password" className='board-add-list-input-login' value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* Display error message */}
      <h3>{errorMessage}</h3>
      <div className='login-botton'>
        {/* Signup and Cancel buttons */}
        <button className='add-card-btn-login btn' onClick={handleSignup}>Sign Up</button>
        <button className='add-card-btn-login-red btn' onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default SignupPage;
