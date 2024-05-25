import React, {Component} from "react";

class Category extends Component {
    //internal storage of any component , keep track of state
    state = {
        isLoading: true,
        Categories: []
      } 
      //can call fn through 
      //sync --> send a request and wait
      //async --> use for better user experience and automatic update
    //incharge of processing ths js file and export the function
    async componentDidMount(){
        const response = await fetch('/api/categories')
        const body = await response.json();
        this.setState({Categories : body, isLoading: false});
    }
    render() {
        const {Categories, isLoading} = this.state; 
        if(isLoading)
            return(<div>Loading....</div>)


            return ( 
            
                <div>
                
                    <h2>Categories</h2>
                    {
                        Categories.map( category => 
                            <div id={category.id}>
                                {category.name}
                            </div>
                        )

                    }

                </div>
         );
    }
}
 
export default Category;