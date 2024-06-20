import React, { Component } from 'react'; 
import AppNav from './AppNav'; 

class Category extends Component {

    // Initialize the state with isLoading set to true and Categories as an empty array
    state = {  
        isLoading: true,
        Categories: []
    }

    // Lifecycle method that runs after the component is mounted to the DOM
    async componentDidMount() {
        // Fetch data from the API endpoint
        const response = await fetch('/api/categories');
        // Parse the response data as JSON
        const body = await response.json();
        // Update the state with the fetched data and set isLoading to false
        // The isLoading state property is set to false, indicating that the loading process is complete.
        this.setState({ Categories: body, isLoading: false });
    }

    render() {
        // Destructure Categories and isLoading from the state
        const { Categories, isLoading } = this.state;

        // If data is still loading, display a loading message
        if (isLoading) 
            return (<div>Loading...</div>);
        
        // Once data is loaded, display the navigation component and the list of categories
        return (
            <div>
                <AppNav /> {/* Render the AppNav component */}
                <h2>Categories</h2> {/* Heading for the categories list */}
                {
                    // Map over the Categories array to create a div for each category
                    Categories.map(category => 
                        <div key={category.id}> {/* Set a unique key for each div using the category id */}
                            {category.name} {/* Display the category name */}
                        </div>
                    )
                }
            </div>
        );
    }
}

// Export the Category component as the default export
export default Category;
