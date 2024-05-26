import React, { Component } from 'react';
import AppNav from './AppNav';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Table, Container, Input, Button, Label, FormGroup, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Expenses extends Component {

    emptyItem = {
        description: '',
        expensedate: new Date(),
        location: '',
        category: { id: 1, name: 'Travel' }
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            Categories: [],
            Expenses: [],
            item: this.emptyItem
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;

        await fetch(`/api/expenses`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });

        this.props.history.push("/expenses");
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    handleDateChange(date) {
        let item = { ...this.state.item };
        item.expensedate = date;
        this.setState({ item });
    }

    async remove(id) {
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedExpenses = [...this.state.Expenses].filter(i => i.id !== id);
            this.setState({ Expenses: updatedExpenses });
        });
    }

    async componentDidMount() {
        try {
            const response = await fetch('/api/categories');
            const categories = await response.json();
            this.setState({ Categories: categories });

            const responseExp = await fetch('/api/expenses');
            const expenses = await responseExp.json();
            this.setState({ Expenses: Array.isArray(expenses) ? expenses : [], isLoading: false });
        } catch (error) {
            console.error("Failed to fetch data", error);
            this.setState({ isLoading: false });
        }
    }

    render() {
        const title = <h3>Add Expense</h3>;
        const { Categories, Expenses, isLoading, item } = this.state;

        if (isLoading)
            return (<div>Loading....</div>);

        let optionList = Categories.map(category =>
            <option value={category.id} key={category.id}>
                {category.name}
            </option>
        );

        let rows = Expenses.map(expense =>
            <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.location}</td>
                <td><Moment date={expense.expensedate} format="YYYY/MM/DD" /></td>
                <td>{expense.category.name}</td>
                <td><Button size="sm" color="danger" onClick={() => this.remove(expense.id)}>Delete</Button></td>
            </tr>
        );

        return (
            <div>
                <AppNav />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="description">Title</Label>
                            <Input type="text" name="description" id="description"
                                value={item.description} onChange={this.handleChange} autoComplete="name" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category</Label>
                            <Input type="select" name="category" id="category" onChange={this.handleChange} value={item.category.id}>
                                {optionList}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="expensedate">Date</Label>
                            <DatePicker selected={item.expensedate} onChange={this.handleDateChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input type="text" name="location" id="location" value={item.location} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/">Cancel</Button>
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
                                <th width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Expenses;
