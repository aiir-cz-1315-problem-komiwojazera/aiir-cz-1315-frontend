import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import "./Calculation.css";
import ProgressBar from 'react-bootstrap/ProgressBar'

class Calculation extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          problem_name: "",
          lenght: "",
          route: "",
          precent: 50
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
    
    handleSubmit = event => {
        event.preventDefault();
        this.state.precent += 10;
        console.log(this.state.precent);
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
                <Form.Label>Problem File</Form.Label>
                <FormControl
                  autoFocus
                  type="problem_file"
                  value={this.state.problem_file}
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

              <ProgressBar now={this.state.precent} />


            </form>
          </div>
        );
      }
}
export default Calculation;