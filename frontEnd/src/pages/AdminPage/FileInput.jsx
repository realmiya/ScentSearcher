import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import getNotes from '../../utils/getNotes';
import fileToDataUrl from '../../utils/fileToDataUrl';
import React, { useState } from "react";
import ReactFileReader from 'react-file-reader';
// @copyright Copyright (c)2017 Grillwork Inc.

class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleFiles = this.handleFiles.bind(this);
  }


handleFiles = (files) => {
  console.log("64",(files.base64))
}

  render() {
    return (
      <>
      <ReactFileReader fileTypes={[".png",".jpeg",".jpg"]} base64={false} multipleFiles={true} handleFiles={this.handleFiles}>
        <button className='btn btn-primary'>Upload Perfume's Image</button>
      </ReactFileReader>
      </>
    );
    
  }
}

export default FileInput;