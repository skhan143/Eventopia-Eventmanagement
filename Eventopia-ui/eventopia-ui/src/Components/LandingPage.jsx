import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCategoryButtons from "./EventCategoryButtons";
import { ToggleButton, ToggleButtonGroup, Stack, ButtonGroup, Typography, Container, AppBar, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const LandingPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [isEventsExists, setIsEventsExists] = useState(false);
  const [offset, setOffset] = useState(0);
  const [noMoreEvents, setNoMoreEvents] = useState(false);
  const buttonStyle = {
    width: "100%",
    display: "flex",
    justifyContent: 'space-between', // This will push the buttons to the extreme ends
    alignItems: 'center'
  };

  const circleStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease-in-out', // Add transition for smooth effect
    cursor: 'pointer', // Add cursor style to indicate interactivity
  };

  const circleHoverStyle = {
    ...circleStyle,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // A slightly darker shade
  };

  const handleMouseEnterLeft = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
  };

  const handleMouseEnterRight = (e) => {
    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'white';
  };

  const handleCategorySelect = (categoryId) => {
    // Do something with the selected categoryId in the parent component
    setCategoryId(categoryId);
  };

  const handleNext = () => {
    setOffset(offset + 8);
  };

  const handlePrevious = () => {
    if (offset >= 8) {
      setOffset(offset - 8);
    }
    else {
      setOffset(0);
    }
  };

  const boxStyle = {
    backgroundColor: '#f0f0f0',
  };


  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .post("https://localhost:7182/api/Event/upcomingEvents", { categoryId: categoryId, offset: offset })
      .then((response) => {
        // Update the eventsData state with the API response data
        if (response.status == 200) {
          setEventsData(response.data);
          setIsEventsExists(true);
          setNoMoreEvents(false)
        }
        else {
          setIsEventsExists(false);
          setNoMoreEvents(true);
        }
      })
      .catch((error) => {
        // Handle API errors and show an error message
        setErrorMessage("An error occurred. Please try again later.");
        setIsEventsExists(false);
        setNoMoreEvents(true);
      });
  }, [categoryId, offset]); // Empty dependency array ensures this effect runs only once, when the component mounts



  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <Container>

        <Card>
          <CardContent>
            <img
              src={process.env.PUBLIC_URL + "images/LandingPageStatic.jpg"}
              alt="EventopiaStatic"
              style={{ width: "100%", height: 200, objectFit: "cover" }}
            />
          </CardContent>
          <CardActions>{/* Add actions here if needed */}</CardActions>
        </Card>

        <EventCategoryButtons onCategorySelect={handleCategorySelect} />

        {!isEventsExists ? <Container>
          <h2>No events to display</h2>
          {noMoreEvents && <Button variant="contained" onClick={handlePrevious} style={{ backgroundColor: '#A30059', color: 'white' }}>Back</Button>}
        </Container>
          :
          <Container style={{ display: 'flex', marginTop: '16px', alignItems: 'center', backgroundColor: '#f0f0f0', padding: '8px' }}>
            <div style={circleStyle} onMouseEnter={handleMouseEnterLeft} onMouseLeave={handleMouseLeave}>
              <KeyboardArrowLeftIcon onClick={handlePrevious} style={{ fontSize: '3rem', color: 'grey' }} />
            </div>
            <Grid container spacing={2}>
              {eventsData.map((event) => (
                <Grid key={event.id} item xs={12} sm={6} md={4}>
                  <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <img
                        src={process.env.PUBLIC_URL + "images/event.jpg"}
                        alt="Event Image"
                        style={{ width: "100%", height: 200, objectFit: "cover" }}
                      />
                      <Typography variant="h5">{event.name}</Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {event.eventDate} - {event.eventTime}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {event.categoryName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {event.description}
                      </Typography>
                    </CardContent>
                    <CardActions>{/* Add actions here if needed */}</CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <div style={circleStyle} onMouseEnter={handleMouseEnterRight} onMouseLeave={handleMouseLeave}>
              <KeyboardArrowRightIcon onClick={handleNext} style={{ fontSize: '3rem', color: 'grey' }} />
            </div>
          </Container>
        }




      </Container>
    </div>
  );
};

export default LandingPage;
