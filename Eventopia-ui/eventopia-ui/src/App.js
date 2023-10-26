import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext'; 
import Login from './Components/Login';
import Registration from './Components/Registration';
import Navbar from './Components/Navbar';
import './App.css';
import LandingPage from './Components/LandingPage';
import SiteMap from './Components/SiteMap';
import CreateEvent from './Components/CreateEvent';
import SearchEvent from './Components/SearchEvent';
import Logout from './Components/Logout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/createEvent" component={CreateEvent} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Registration} />
            <Route path="/searchevent" component={SearchEvent} />
            <Route path="/logout" component={Logout} />
          </Switch>
          <SiteMap/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;