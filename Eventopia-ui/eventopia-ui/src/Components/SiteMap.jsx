import React from 'react';
import { Grid, Typography, Link, IconButton } from '@mui/material';

// Social media icons
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const SiteMap = () => (
  <div style={{ backgroundColor: "#F2F2F2", padding: "30px 0" }}>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={4} md={4}>
        <Typography variant="body1">Eventopia</Typography>
        <Typography variant="body2">123 Main Street</Typography>
        <Typography variant="body2">Townsville, ST 12345</Typography>
        <Typography variant="body2">(123) 456-7890</Typography>
        <Typography variant="body2">info@eventopia.com</Typography>
      </Grid>
      
      <Grid item xs={12} sm={4} md={4}>
        <Typography variant="body1">Quick Links</Typography>
        <Link href="#" color="inherit">About Us</Link>
        <Link href="#" color="inherit">Contact Us</Link>
        <Link href="#" color="inherit">Privacy Policy</Link>
        <Link href="#" color="inherit">Terms & Conditions</Link>
      </Grid>

      <Grid item xs={12} sm={4} md={4}>
        <Typography variant="body1">Follow Us</Typography>
        <IconButton><FacebookIcon /></IconButton>
        <IconButton><InstagramIcon /></IconButton>
        <IconButton><TwitterIcon /></IconButton>
        <IconButton><LinkedInIcon /></IconButton>
      </Grid>
    </Grid>
  </div>
);

export default SiteMap;
