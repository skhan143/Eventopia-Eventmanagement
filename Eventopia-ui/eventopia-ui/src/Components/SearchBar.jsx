import React from 'react';
import {Box, Button} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
const SearchBar = () => {
    return ( 
        <div>
            <Box paddingLeft={20}>
            <Button color="inherit" component={RouterLink} to="/SearchEvent">Search Events</Button>
          </Box>
        </div>
     );
}
 
export default SearchBar;