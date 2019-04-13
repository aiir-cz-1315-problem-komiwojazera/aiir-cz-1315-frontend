import React, { Component } from 'react'
import ReactUploadFile from 'react-upload-file';
import { Button } from "react-bootstrap";

export default class FileUploader extends Component {
  render() {

    const options = {
        baseUrl: 'http://127.0.0.1',
        query: {
          warrior: 'fight'
        }
      }
      const btns = {
        chooseFile: <Button style={btnStyle}>Choose File</Button>,
        upload:  <Button style={btnStyle}>Upload File</Button>
      }
      return (
        <ReactUploadFile options={options} uploadFileButton={btns.upload} />

      );
  }
}

const btnStyle = {
    width: '13rem',
    height: '3rem',
    textColor: 'white',
    textAlign: 'center',
    margin: '1rem',
    fontSize: '11px',
}

