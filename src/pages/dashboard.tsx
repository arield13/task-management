import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import { useRouter } from 'next/router';

const Dashboard = () => {
  // Initialize Next.js router
  const router = useRouter();

  // State for user email and menu visibility
  const [email, setEmail] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  // Check for user email in local storage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('email')) {
        // If no email found in local storage, redirect to login page
        router.push('/login');
      } else {
        // Set user email if available in local storage
        setEmail(localStorage.getItem('email') || '');
      }
    }
  }, [router]); // Run this effect when the router changes

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  // Function to handle user logout
  const logOut = () => {
    // Clear email from local storage and redirect to login page
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div>
      {/* Header section */}
      <header className="masthead">
        {/* Boards menu */}
        <div className="boards-menu">
          {/* Buttons and search input for boards */}
          <button className="boards-btn btn"><i className="fab fa-trello boards-btn-icon"></i>Boards</button>
          <div className="board-search">
            <input type="search" className="board-search-input" aria-label="Board Search"/>
            <i className="fas fa-search search-icon" aria-hidden="true"></i>
          </div>
        </div>
        {/* Logo */}
        <div className="logo">
          <h1>Trello</h1>
        </div>
      </header>

      {/* Board information bar */}
      <section className="board-info-bar">
        {/* Board controls */}
        <div className="board-controls">
          <button className="personal-btn btn">Personal</button>
          <button className="private-btn btn">Private</button>
        </div>
        {/* Button to show menu */}
        <button className="menu-btn btn" onClick={toggleMenu}>... Show Menu</button>
        {/* Display menu if menuVisible is true */}
        {menuVisible && (
          <div className='main-menu-bar'>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {/* Display user email */}
              <li>
                <button className='menu-dropdownlist-bar'>{email}</button>
              </li>
              {/* Button to log out */}
              <li onClick={logOut}>
                <button className='menu-dropdownlist-bar' >Log out</button>
              </li>
            </ul>
          </div>
        )}
      </section>

      {/* TaskList component */}
      <TaskList />
    </div>
  );
};

export default Dashboard;
