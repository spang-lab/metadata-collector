import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import Messages from './Messages';
import { GlobalState } from './Context';
import { UserState } from './UserContext';

function App() {
    return (
        <Router>
            <GlobalState>
                <UserState>
                    <Header />
                    <Messages />
                    <Navigation />
                    <Footer />
                </UserState>
            </GlobalState>
        </Router>
    );
}

export default App;
