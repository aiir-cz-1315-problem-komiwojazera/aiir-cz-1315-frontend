import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import "./Register.css";
import { userService } from '../services/user.service';

export class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeat_password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && this.state.password === this.state.repeat_password;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    if (!(email && password)) {
      return;
    }

    userService.register(email, password)
    .then(
      user => {
          const { from } = this.props.location.state || { from: { pathname: "/" } };
          this.props.history.push(from);
      },
      error => this.setState({ error, loading: false })
     );
  }

  handleRegister = event => {
    event.preventDefault();
    console.log(this.state)
  }

  render() {
    return (
      <div className="Register">
      <div>
        <h3>Registration Form</h3>
      </div>
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <Form.Label>Email</Form.Label>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <Form.Label>Password</Form.Label>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="repeat_password" bsSize="large">
          <Form.Label>Repeat Password</Form.Label>
          <FormControl
            value={this.state.repeat_password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <Button
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          onClick={this.handleRegister}
        >
          Register
        </Button>
      </form>
    </div>
    )
  }
}

export default Register
