
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Grid, TextField, Box, Checkbox, Button, FormControlLabel, Stack, Card, Typography, CardContent, CardActions, Container } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const ExploreEvents = () => {
    // Example options for each filter category. Replace with your actual options.
    const [searchValue, setSearchValue] = useState("");
    const [categories, setCategories] = useState([]);
    const languages = ['English', 'Spanish', 'French'];
    const pricings = ['Free', 'Paid'];
    const types = ['Online', 'In-person'];
    // State for each filter category.
    const [selectedCategories, setSelectedCategories] = useState(categories.map(() => true));
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
    const [selectedLanguages, setSelectedLanguages] = useState(languages.map(() => false));
    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(null);
    const [selectedPricings, setSelectedPricings] = useState(pricings.map(() => false));
    const [selectedPricingIndex, setSelectedPricingIndex] = useState(null);
    const [selectedTypes, setSelectedTypes] = useState(types.map(() => false));
    const [selectedTypeIndex, setSelectedTypeIndex] = useState(null);
    // State for events data
    const [eventsData, setEventsData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEventsExists, setIsEventsExists] = useState(false);
    const [noMoreEvents, setNoMoreEvents] = useState(false);

    const [offset, setOffset] = useState(0);

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

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
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

    useEffect(() => {
        // Fetch data from the API when the component mounts
        axios
            .post("https://localhost:7182/api/Event/SearchEvent", {
                "searchQuery": searchValue,
                "offset": offset,
                //"Category": selectedCategories,
                //"language": selectedLanguages,
                //"pricing": ,
                //"eventType": 
            })
            .then((response) => {
                if (response.status == 200) {
                    setEventsData(response.data);
                    setIsEventsExists(true);
                    setNoMoreEvents(false);
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


    }, [searchValue, offset]); // Empty dependency array ensures this effect runs only once, when the component mounts

    useEffect(() => {
        // Update categories when eventsData changes
        var categoryList = new Set();
        eventsData.forEach((event) => {
            categoryList.add(event.categoryName);
        });
        setCategories([...categoryList]);

        // var languageList = new Set();
        // eventsData.forEach((event) => {
        //     languageList.add(event.language);
        // });
        // setLanguage([...languageList]);

        // var pricingList = new Set();
        // eventsData.forEach((event) => {
        //     pricingList.add(event.price);
        // });
        // setCategories([...pricingList]);

        // var typeList = new Set();
        // eventsData.forEach((event) => {
        //     typeList.add(event.type);
        // });
        // setCategories([...typeList]);

    }, [eventsData]);

    const handleFilterChange = (selectedFilter, setSelectedFilter, setSelectedIndex) => (index) => (event) => {
        const newSelectedFilter = selectedFilter.map((_, i) => i === index); // Select only the clicked index
        setSelectedFilter(newSelectedFilter);
        setSelectedIndex(event.target.checked ? index : null); // Set the selected index or null
        console.log()
        // You can use these newSelectedFilter and setSelectedIndex states for other filters too
    };


    return (
        <div paddingleft={2} >

            <Box paddingTop={2} paddingBottom={4}>
                <TextField
                    placeholder="Search Events"
                    inputProps={{
                        autoComplete: 'off',
                    }}
                    value={searchValue} // Bind value to searchValue state
                    onChange={handleSearchInputChange} // Handle input change

                /></Box>
            <Grid container spacing={2} sx={{ borderTop: 1, borderBottom: 2 }}>
                <Grid item xs={12} sm={4} md={3}>
                    <Box p={2} bgcolor="background.paper">
                        <Stack spacing={1} sx={{ border: 1 }}>
                            <h3>Filters</h3>
                            <h4>Category</h4>
                            {categories.map((category, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={selectedCategoryIndex === index}
                                            onChange={() => handleFilterChange(selectedCategories, setSelectedCategories, setSelectedCategoryIndex)(index)({ target: { checked: true } })}
                                            color="primary"
                                        />
                                    }
                                    label={category}
                                />
                            ))}
                            <h4>Language</h4>
                            {languages.map((language, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={selectedLanguageIndex === index}
                                            onChange={() => handleFilterChange(selectedLanguages, setSelectedLanguages, setSelectedLanguageIndex)(index)({ target: { checked: true } })}
                                            color="primary"
                                        />
                                    }
                                    label={language}
                                />
                            ))}
                            <h4>Pricing</h4>
                            {pricings.map((pricing, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={selectedPricingIndex === index}
                                            onChange={() => handleFilterChange(selectedPricings, setSelectedPricings, setSelectedPricingIndex)(index)({ target: { checked: true } })}
                                            color="primary"
                                        />
                                    }
                                    label={pricing}
                                />
                            ))}

                            <h4>Type</h4>
                            {types.map((type, index) => (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={selectedTypeIndex === index}
                                            onChange={() => handleFilterChange(selectedTypes, setSelectedTypes, setSelectedTypeIndex)(index)({ target: { checked: true } })}
                                            color="primary"
                                        />
                                    }
                                    label={type}
                                />
                            ))}

                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                    <Box p={2} bgcolor="background.paper">
                        <h3>Filtered Events</h3>
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
                          
                                                        {event.eventDate} - {event.eventStartTime}
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

                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
export default ExploreEvents;
