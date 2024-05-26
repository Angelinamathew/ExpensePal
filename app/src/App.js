import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Category from './Category';
import Home from './Home';
import Expsenses from './Expenses'; // Corrected import

class App extends Component {
    render() { 
        return ( 
            <Router>
                <Routes>
                     <Route path='/' element={<Home />} />
                     <Route path='/categories' element={<Category />} />
                     <Route path='/expenses' element={<Expsenses />} />
                </Routes>
            </Router>
        );
    }
}
 
export default App;
