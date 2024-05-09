import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { HashLink as RouterLink } from 'react-router-hash-link'; 

const NavLink = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontSize: '1rem',
  padding: theme.spacing(1),
  textDecoration: 'none',
  border: '1px solid transparent', // border
  transition: 'border-color 0.3s ease-in-out', // hover effect

  '&:hover': {
    textDecoration: 'underline',
    borderColor: 'white', // Change border color on hover
  },
}));
export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, width: '100%', position: 'fixed', zIndex: '100', top: 0 }}>
      <AppBar position="static" sx={{ bgcolor: 'black' }}>
        <Toolbar sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>        
              <NavLink component={RouterLink} to="/newproject" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
                New Project
              </NavLink>     
              <NavLink component={RouterLink} to="/projectview" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
              ProjectView
              </NavLink>
              <NavLink component={RouterLink} to="/allproject" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
               All Project
              </NavLink>
              <NavLink component={RouterLink} to="/exportgit" style={{ textDecoration: 'none', color: 'inherit', marginRight: '10px' }}>
              Project summary
              </NavLink>             
               <NavLink component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Logout
              </NavLink>
            </Box>
            <Box>
              <NavLink component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>            
              </NavLink>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
