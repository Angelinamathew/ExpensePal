import React, { Component } from 'react';
import AppNav from './AppNav';
import './Home.css'; // Ensure you import the CSS file

class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <AppNav />
                <h1 className="title">Welcome to my Expense Pal app</h1>
                <div className="image-container">
                    <img src="/home1.jpg" alt="App Logo" className="app-logo" />
                </div>
            </div>
        );
    }
}

export default Home;
