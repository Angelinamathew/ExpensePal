import React, { Component } from 'react';
import AppNav from './AppNav';

class Home extends Component {
    state = {}

    render() { 
        const mystyle = {
            color: "black",
            padding: "10px",
            fontFamily: "Times Roman"
          };
        return (
            <div>
             <AppNav/>
             <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
               <img src="/home1.jpg" alt="App Logo" style={{ width: '800px', height: 'auto' }} />
             </div>
             <h1 style={mystyle}>
                Welcome to my Expense Pal app
             </h1>
            </div>
        );
    }
}
 
export default Home;
