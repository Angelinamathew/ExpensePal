import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Table, Container, Input, Button, Label, FormGroup, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';


class Expenses extends Component {
    // Defining an empty expense item template
    emptyItem = {
        description: '', // Description of the expense
        expensedate: new Date(), // Date of the expense, initialized to the current date
        location: '', // Location where the expense was incurred
        category: { id: 1, name: 'Travel' }, // Default category of the expense
        expenseInDollar: 0.0 
    };

    constructor(props) {
        super(props);

        // Initializing the state of the component
        this.state = {
            isLoading: true, // State to indicate if the data is still loading
            Categories: [], // Array to hold the list of categories
            Expenses: [], // Array to hold the list of expenses
            item: this.emptyItem // Current expense item being created or edited
        };

        // Binding event handlers to the component instance
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    // Method to handle the submission of the form
    async handleSubmit(event) {
        event.preventDefault(); // Preventing the default form submission behavior
        const { item } = this.state; // Extracting the current item from the state

        // Making a POST request to save the new expense item
        await fetch(`/api/expenses`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item), // Converting the item to a JSON string
        });

        // Redirecting to the expenses list page after saving the expense
        this.props.history.push("/expenses");
    }

    // Method to handle changes in the input fields
    handleChange(event) {
        const target = event.target; // Getting the target input field
        const value = target.value; // Getting the value of the input field
        const name = target.name; // Getting the name of the input field
        let item = { ...this.state.item }; // Creating a copy of the current item from the state
        item[name] = value; // Updating the relevant field in the item
        this.setState({ item }); // Updating the state with the modified item
    }

    // Method to handle changes in the date picker
    handleDateChange(date) {
        let item = { ...this.state.item }; // Creating a copy of the current item from the state
        item.expensedate = date; // Updating the expense date in the item
        this.setState({ item }); // Updating the state with the modified item
    }

    // Method to handle the removal of an expense item
    async remove(id) {
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE', // Making a DELETE request to the API
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            // Updating the state to remove the deleted expense from the list
            let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
            this.setState({ Expenses: updatedExpenses });
        });
    }

    // Method to fetch data from the API when the component mounts
    async componentDidMount() {
        try {
            // Fetching the list of categories from the API
            const response = await fetch('/api/categories');
            const categories = await response.json();
            this.setState({ Categories: categories });

            // Fetching the list of expenses from the API
            const responseExp = await fetch('/api/expenses');
            const expenses = await responseExp.json();
            // Updating the state with the fetched categories and expenses, and setting isLoading to false
            this.setState({ Expenses: Array.isArray(expenses) ? expenses : [], isLoading: false });
        } catch (error) {
            // Logging any errors that occur during the fetch
            console.error("Failed to fetch data", error);
            this.setState({ isLoading: false });
        }
    }

    // Rendering the component
    // Rendering the component
render() {
    const title = <h3>Add Expense</h3>; // Title for the expense form
    const { Categories, Expenses, isLoading, item } = this.state; // Extracting relevant data from the state

    if (isLoading)
        return (<div>Loading....</div>); // Displaying a loading message if data is still being fetched

    // Creating the list of options for the category select dropdown
    let optionList = Categories.map(category =>
        <option value={category.id} key={category.id}>
            {category.name}
        </option>
    );

    // Creating the rows for the expenses table
    let rows = Expenses.map(expense =>
        <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.location}</td>
            <td><Moment date={expense.expensedate} format="YYYY/MM/DD" /></td> {/* Formatting the date */}
            <td>{expense.category.name}</td>
            <td>{expense.expenseInDollar}</td>
            <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td> {/* Delete button */}
        </tr>
    );

    return (
        <div>
            <AppNav /> {/* Rendering the navigation component */}
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}> {/* Form for adding a new expense */}
                    <FormGroup>
                        <Label for="description">Title</Label>
                        <Input type="text" name="description" id="description"
                            value={item.description} onChange={this.handleChange} autoComplete="name" /> {/* Description input */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Category</Label>
                        <Input type="select" name="category" id="category" onChange={this.handleChange} value={item.category.id}>
                            {optionList} {/* Category select dropdown */}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="expensedate">Date</Label>
                        <DatePicker selected={item.expensedate} onChange={this.handleDateChange} /> {/* Date picker */}
                    </FormGroup>
                     <FormGroup>
                        <Label for="expenseInDollar">Expense in Dollar</Label> {/* Add this block for the expenseInDollar input */}
                        <Input type="number" step="0.01" name="expenseInDollar" id="expenseInDollar"
                            value={item.expenseInDollar} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" value={item.location} onChange={this.handleChange} /> {/* Location input */}
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '} {/* Save button */}
                        <Button color="secondary" tag={Link} to="/">Cancel</Button> {/* Cancel button */}
                    </FormGroup>
                </Form>
            </Container>
            <Container>
                <h3>Expense List</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="30%">Description</th>
                            <th width="10%">Location</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th width="10%">Expense ($)</th>
                            <th width="10%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows} {/* Rendering the rows of expenses */}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

}

export default Expenses; // Exporting the Expenses component for use in other parts of the application
