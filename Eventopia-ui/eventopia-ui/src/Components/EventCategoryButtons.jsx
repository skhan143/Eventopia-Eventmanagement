import { Button, Box, TextField, AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";


const buttonStyles = {
  borderRadius: "50px",
  color: "rgba(0, 0, 0, 0.8)",
  backgroundColor: "white",
  fontStyle: "italic",
  "&:hover": {
    backgroundColor: "#f0f0f0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Adding a slight shadow on hover
  },
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)", // Adding a slight shadow by default
};
const boxStyle = {
  backgroundColor: '#f0f0f0',
};

const h2Color = {
  color: '#000000',
};

const EventCategoryButtons = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // New state for selected category
  const [errorMessage, setErrorMessage] = useState('');

  const boxStyle = {
    backgroundColor: '#f0f0f0',
  };

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get('https://localhost:7182/api/Event/Categories')
      .then((response) => {
        // Update the categories state with the API response data
        setCategories(response.data);
      })
      .catch((error) => {
        // Handle API errors and show an error message
        setErrorMessage('An error occurred. Please try again later.');
      });
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    onCategorySelect(categoryId); // Invoke the callback with the selected categoryId
  };

  return (
    <AppBar style={boxStyle} position="static" sx={{ background: '#EFEFEF', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', borderRadius: '50px' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Typography variant='h5' color='black'>Browse Event by Category</Typography>
          <Box display="flex" justifyContent="center" flexWrap="wrap" mt={2}>
            {categories.map((category) => (
              <div key={category.id} style={{ margin: '5px', alignItems: 'flex-start' }}>
                <Button
                  style={{
                    ...buttonStyles,
                    backgroundColor: selectedCategory === category.id ? '#9386f0' : 'white',
                  }}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </Button>
              </div>
            ))}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default EventCategoryButtons;