import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <header style = {headerStyle}>
        <h3>Travelling Salesman Problem Solver</h3>
      </header>
    )
  }
}

const headerStyle = {
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '1rem'

}
