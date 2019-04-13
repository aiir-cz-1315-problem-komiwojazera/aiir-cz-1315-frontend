import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <header style = {headerStyle}>
        <div style={nameStyle} >Travelling Salesman Problem Solver</div>
        <NavLink style={logoutStyle} exact to="/login"> Logout </NavLink>
      </header>
    )
  }
}

const headerStyle = {
  background: '#333',
  padding: '2rem', 
  
}

const nameStyle = {
  fontSize: '25px',
  color: 'white',

}

const logoutStyle = {
  float: 'right',
  textAlign: 'right',
  padding: '10px',
  color: 'white',
  marginTop: '-40px'
}