import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import "./Calculation.css";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { userService } from '../services/user.service';
import FileUploard from './FileUploader'

class Calculation extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          problem_name: "",
          lenght: "",
          route: "",
          precent: 50,
          result: 56,
        };
    }

    componentDidMount() {
      this.setState({ 
          user: JSON.parse(localStorage.getItem('user')),
          users: { loading: true }
      });
      userService.getAll().then(users => this.setState({ users }));
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

    handleStart = event => {
      event.preventDefault();
      console.log("submit")
      const {problem_name} = this.state;

      if (!problem_name) {
        return;
      }

      userService.startCalc(problem_name)
        .then(result => {

          this.setState({ 
            result: JSON.parse(localStorage.getItem('result')),
        });
          },
          error => console.log(error) //this.setState({ error, loading: false })
        );
    }

    progress = () => {
        this.setState({ completed: false });

    };

    componentDidMount() {
        this.timer = setInterval(this.progress, 500);
      }
    
      componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { classes } = this.props;
        return (
          <div className="Calculations">

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
              
              <FormGroup controlId="problem_file" bsSize="large">
                <Form.Label>Select Problem File</Form.Label>
                { <FormControl
                  autoFocus
                  type="problem_file"
                  value={this.state.problem_file}
                  onChange={this.handleChange}
                /> }
                <FileUploard/>
              </FormGroup>
             
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
                onClick = {this.handleStart}
              >
                Start
              </Button>
              <ProgressBar now={this.state.precent} />
              <Form.Label>{this.state.result}</Form.Label>
            </form>
          </div>
        );
      }
}
export default Calculation;