import React, { Component } from 'react'
import ReactUploadFile from 'react-upload-file';
import { Button } from "react-bootstrap";

export default class FileUploader extends Component {
  render() {

    const options = {
        baseUrl: 'http://127.0.0.1',
        query: (files)=>{
            const l = files.length;
            const queryObj = {};
            for(let i = l-1; i >= 0; --i) {
              queryObj[i] = files[i].name;
            }
            return queryObj;
          },
          // body: {
          //   purpose: 'save'
          // },
          body: (files)=>{
            const l = files.length;
            const queryObj = {};
            for(let i = l-1; i >= 0; --i) {
              queryObj[i] = files[i].name;
            }
            return queryObj;
          },
          dataType: 'json',
          multiple: true,
          numberLimit: 9,
          accept: '*',
          // fileFieldName: 'file',
          fileFieldName: (file) => {
            return file.name;
          },
          withCredentials: false,
          requestHeaders: {
            'User-Agent': 'Warrior!'
          },
          didChoose: (files) => {
            console.log('you choose', typeof files == 'string' ? files : files[0].name);
          },
          beforeUpload: (files) => {
            if (typeof files === 'string') return true;
            if (files[0].size < 1024 * 1024 * 20) {
              return true;
            }
            return false;
          },
          didUpload: (files) => {
            console.log('you just uploaded', typeof files === 'string' ? files : files[0].name);
          },
          uploading: (progress) => {
            console.log('loading...', progress.loaded / progress.total + '%');
          },
          uploadSuccess: (resp) => {
            console.log('upload success!');
          },
          uploadError: (err) => {
            alert(err.message);
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

