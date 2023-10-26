import React, { useState } from 'react';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ExploreEvents from './ExploreEvents';
const SearchEvent = () => {
    const [value, setValue] = useState(0); // This will hold the current tab index.
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Tabs 
                value={value}
                textColor="primary"
                indicatorColor="primary"
                onChange={handleChange}
                centered
            >
                <Tab label="Explore Events" />
                <Tab label="Upcoming Events" />
                <Tab label="My Tickets" />
            </Tabs>
            {value === 0 && <div><ExploreEvents/></div>}
            {value === 1 && <div> Upcoming Events</div>}
            {value === 2 && <div> My Tickets</div>}
        </div>
    );
}
 
export default SearchEvent;
