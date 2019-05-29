import React, { Component } from 'react';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import "./Calculation.css";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { userService } from '../services/user.service';
import CustomizedTable from './CustomizedTable'

class Calculation extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          problem_name: "",
          route: "",
          precent: 0,
          result: "",
        };
    }

    validateForm() {
        return this.state.problem_name.length > 0 && this.uploadInput.files[0] !==  undefined;
    }

    componentDidMount() {
      this.timer = setInterval(this.progress, 500);

      let user = JSON.parse(localStorage.getItem('user'))
      let userId = user.id
      console.log("EEEEEEE")
      console.log(JSON.stringify({ userId}))
      userService.getHistory(JSON.stringify({ userId}))
      .then(
          history => {
              // const { from } = this.props.location.state || { from: { pathname: "/" } };
              // this.props.history.push(from);
          },
      );
    }
    handleChange = event => {
      //nowe
      this.fileName = event.target.value

      //stare
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    handleStart = event => {
      event.preventDefault();
      console.log("submit")
      const {problem_name} = this.state;

      if (!problem_name) {
        return;
      }

      this.setState({precent: 25})
      let user = JSON.parse(localStorage.getItem('user'))
      let userId = user.id
      const data = new FormData();
      data.append('file', this.uploadInput.files[0]);
      data.append('filename', this.fileName);
      data.append('user', userId)


      userService.startCalc(data)
        .then(result => {
	console.log(result)
          this.setState({ 
            result: result.result,
			route: result.route,		
            precent: 100
          });
          },
          error => console.log(error) //this.setState({ error, loading: false })
        );
    }

    progress = () => {
        this.setState({ completed: false });

    };
    
      componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { classes } = this.props;
        return (
          
          <div>
            <div style={tableStyle}>
  <CustomizedTable />
</div>
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

<div>
<input ref={(ref) => { this.uploadInput = ref; }} type="file" />
</div>
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
 <div><Form.Label>Route:</Form.Label></div>
 <div><Form.Label>{this.state.route}</Form.Label></div>
 <div><Form.Label>Result:</Form.Label></div>
 <div><Form.Label>{this.state.result}</Form.Label></div>
</form>
</div>
          </div>
          
        );
      }
}
export default Calculation;

const tableStyle = {
  width: '25%',
  margin: '1rem, 1rem, 1rem, 1rem',
  position: '-webkit-sticky',
  position: 'sticky',
  top: '4.2rem',
  position: 'absolute',
  right: '3rem',
  top: '20rem'
}
