import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import "./Login.css";
import { NavLink } from 'react-router-dom';

class Calculation extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          problem_name: "",
          Lenght: "",
          Route: "",
          Progres: 0
        };
    }

    validateForm() {
        return this.state.problem_name.length > 0;
    }

      
    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        //tu dodaj request by wystartować obliczenia
    }
    

    render() {
        return (
          <div className="Calculations">
            <div>
              <h3>Sign In</h3>
            </div>
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="problem_name" bsSize="large">
                <Form.Label>Problem Name</Form.Label>
                <FormControl
                  autoFocus
                  type="problem_name"
                  value={this.state.problem_name}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="problem_name" bsSize="large">
                <Form.Label>Problem File</Form.Label>
                <FormControl
                  autoFocus
                  type="problem_name"
                  value={this.state.problem_name}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Start
              </Button>
            </form>
            <NavLink exact to="/register"> Create New Account </NavLink>
          </div>
        );
      }
}
export default Calculation;