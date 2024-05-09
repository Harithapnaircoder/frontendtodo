import React from 'react';
import Typography from '@mui/material/Typography';
//  this is a simple footer
const Footer = ({ backgroundColor }) => {
  return (
    <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: backgroundColor || '#ccc' }}>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Hatio All rights reserved. 
          Contact us at www.Hatio@gmail.com
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
