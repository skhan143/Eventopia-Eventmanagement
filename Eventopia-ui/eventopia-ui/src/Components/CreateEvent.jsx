import React, { useEffect, useState } from 'react';
import { Button, Container, TextField, Grid, Box, FormControl, InputLabel, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';


const RoundButton = styled(Button)({
  borderRadius: "50px",
  color: "rgba(0, 0, 0, 0.8)",
  backgroundColor: "white",
  fontStyle: "italic",
  "&:hover": {
    backgroundColor: "#f0f0f0",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
});

const EventCategoryButtons = ({ onCategorySelect, onSearchChange }) => {

  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={2}>

      <Box display="flex" justifyContent="center" flexWrap="wrap" mt={2}>
        {categories.map((category) => (
          <div key={category.id} style={{ margin: "5px", alignItems: "flex-start" }}>
            <RoundButton onClick={() => onCategorySelect(category.id)}>{category.name}</RoundButton>
          </div>
        ))}
      </Box>
    </Box>
  );
};

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    organizer: '',
    eventDate: '',
    eventStartTime: '',
    eventEndTime: '',
    location: '',
    language: 'English',
    categoryId: null,// Initialize category with null or any default value
    pricingOption: 'Free',
    price: '', 
    eventType: 'Online',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const [isCreated, setIsCreated] = useState(false);
  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategorySelect = (categoryId) => {
    setEventData((oldEventData) => ({
      ...oldEventData,
      categoryId: categoryId
    }));
  };

  
  const handleSearchChange = (searchValue) => {
    // Update the search value in the CreateEvent component
    setEventData((oldEventData) => ({
      ...oldEventData,
      categoryId: null // Reset the selected category when the search input changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(eventData);

    try {

      await axios.post('https://localhost:7182/api/Event/CreateEvent', eventData);  

      setIsCreated(true);
    } catch (error) {
      console.error('Registration failed:', error);
      console.log(error.request); 
    }
  };
  const handlePricingOptionChange = (event) => {
    setEventData({
      ...eventData,
      pricingOption: event.target.value,
      price: event.target.value === 'Free' ? '' : eventData.price // Reset the price if 'Free' is selected
    });
  };

  const handlePriceChange = (event) => {
    setEventData({
      ...eventData,
      price: event.target.value
    });
  };
  const handleEventTypeChange = (e) => {
    setEventData({
      ...eventData,
      eventType: e.target.value
    });
};

  return (
    <Container>
      <h1>Create your event</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Event Name"
              name="name"
              value={eventData.name}
              onChange={handleChange}
            />

          </Grid>
          <Grid item xs={5}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="organizer"
              label="Organizer"
              name="organizer"
              value={eventData.organizer}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="date"
              label="Date"
              name="eventDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={eventData.eventDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="startTime"
              label="Start Time"
              name="eventStartTime"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={eventData.eventStartTime}
              onChange={handleChange}
              />
          </Grid>
          <Grid item xs={5}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="endTime"
              label="End Time"
              name="eventEndTime"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={eventData.eventEndTime}
              onChange={handleChange}
           />
           </Grid>
                 <Grid item xs={5}>
          <FormControl variant="outlined" fullWidth>
              <InputLabel id="language-label">Event Language</InputLabel>
              <Select
                  labelId="language-label"
                  id="language"
                  name="language"
                  value={eventData.language}
                  onChange={handleChange}
                  label="Event Language"
              >
                  <MenuItem value={"English"}>English</MenuItem>
                  <MenuItem value={"Spanish"}>Spanish</MenuItem>
                  <MenuItem value={"French"}>French</MenuItem>
                  {/* Add other languages as needed */}
              </Select>
          </FormControl>
      </Grid>
           

      <Grid item xs={5}>
          <TextField
              variant="outlined"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
          />
      </Grid>

          <Grid item xs={10}>
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              label="Description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>           
              <Typography variant='h5 ' id="category-label">Event Category</Typography>
              <EventCategoryButtons
                onCategorySelect={handleCategorySelect}
                onSearchChange={handleSearchChange}
              />
          </Grid>

          <Grid item xs={10}>
              <TextField
                variant="outlined"
                fullWidth
                label="Selected Category"
                value={eventData.categoryId ? eventData.categoryId.toString() : ""}
                InputProps={{
                  readOnly: true,
                }}
              />
         </Grid>
        <Grid item xs={5}>
             <FormControl variant="outlined" fullWidth>
                 <InputLabel id="pricing-label">Pricing Option</InputLabel>
                <Select
                  labelId="pricing-label"
                  id="pricing-option"
                  name="pricingOption"
                  value={eventData.pricingOption}
                  onChange={handlePricingOptionChange}
                  label="Pricing Option"
                >
                  <MenuItem value={"Free"}>Free</MenuItem>
                  <MenuItem value={"Paid"}>Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {eventData.pricingOption === 'Paid' && (
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="price"
                  label="Price ($)"
                  name="price"
                  value={eventData.price}
                  onChange={handlePriceChange}
                  type="number"
                />
              </Grid>
            )}

            <Grid item xs={5}>
              <FormControl variant="outlined" fullWidth>
                  <InputLabel id="event-type-label">Event Type</InputLabel>
                  <Select
                      labelId="event-type-label"
                      id="eventType"
                      name="eventType"
                      value={eventData.eventType}
                      onChange={handleEventTypeChange}
                      label="Event Type"
                  >
                      <MenuItem value={"Online"}>Online</MenuItem>
                      <MenuItem value={"In-person"}>In-person</MenuItem>
                  </Select>
              </FormControl>
                </Grid>
                
         
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Create Event
            </Button>
          </Grid>
       </Grid> 
      </Box>
    </Container>
  );
};

export default CreateEvent;