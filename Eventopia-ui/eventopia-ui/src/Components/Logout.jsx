import React, { useEffect, useContext } from "react";
import { AuthContext } from './AuthContext';
import { useHistory } from 'react-router-dom'; // Import the useHistory hook

const Logout = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Use isLoggedIn state instead
  const history = useHistory(); // Get access to the history object

  const handleLogOut = () => {
    if (isLoggedIn === true) { // Check if the user is logged in
      localStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false); // Set to logged out
      history.push('/login'); // Redirect to the login page or another route
    }
  };

  useEffect(() => {
    handleLogOut();
  }, [isLoggedIn, setIsLoggedIn, history]); // Added dependencies

  return (
    <div></div>
  );
};

export default Logout;
