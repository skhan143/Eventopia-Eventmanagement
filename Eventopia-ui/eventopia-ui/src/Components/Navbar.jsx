import React, { useContext } from 'react';
import { Link as RouterLink,useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { AuthContext } from './AuthContext'; 
import SearchBar from './SearchBar'

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext); 
  const currentLocation = useLocation();
  const handleLogOut = () => {
    localStorage.setItem('isLoggedIn', 'false');}
    
  const pathsWithoutSearchBar = ["/login", "/register", "/CreateEvent", "/SearchEvent"];
  return (
    <AppBar position="static" sx={{ backgroundColor: '#A30059' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button color="inherit" component={RouterLink} to="/">Home</Button>
          </Box>
          {!pathsWithoutSearchBar.includes(currentLocation.pathname) && <SearchBar />}
        <Box>
          {isLoggedIn && <Button color="inherit" component={RouterLink} to="/CreateEvent">Create Event</Button>}
          {!isLoggedIn && <Button color="inherit" component={RouterLink} to="/login">Login</Button>}
          {!isLoggedIn &&<Button color="inherit" component={RouterLink} to="/register">Register</Button>}
          {isLoggedIn && <Button onClick = {handleLogOut} color="inherit" component={RouterLink} to="/Logout">Logout</Button>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;