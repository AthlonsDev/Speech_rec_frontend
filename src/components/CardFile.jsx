import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewText from './ModalViewText';
import { useState } from "react";
import axios from 'axios';
import { Document, Packer, Paragraph, TextRun } from "docx";


const CardFile = ({ onSend }) => {

  const [file, setFile] = useState(null);
  const [transcription, setTrascription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [modelType, setModelType] = useState(null);

  
// handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleClickEvent = (event) => {
    setModelType(event.target.innerText)
  }

  // send data to parent component
  React.useEffect(() => {
    if (transcription) {
      setTrascription(transcription);
    }
  }, [transcription]);

  React.useEffect(() => {
    axios.get("http://10.3.0.75:8000/")
    .then(res => {
        setBuckets(res.data);
    });
  }, []);

  // file upload to backend API to be implemented
  const handleUpload = async () => {
    if (!file) return;
    if (modelType == null) {
      console.log('select modeltype')
      return;
    }

    setLoading(true); // show loading spinner while uploading
    onSend(modelType)
    const formData = new FormData();
    formData.append('file', file);
    // const API_URL = import.meta.env.VITE_API_URL || "http://kx8x1l-ip-82-3-162-166.tunnelmole.net";
    const API_URL = import.meta.env.VITE_API_URL || "http://10.3.0.75:8000";

   try {
      const response = await fetch(`${API_URL}/speech`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.text();
      setTrascription(data);
      setLoading(false);
      console.log('File uploaded successfully:', data);

    } 
    catch (error) {
      console.error('Error uploading file:', error); // expects a JSON response with transcription
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title class='text-center'>Upload File</Card.Title>
          <div class="hstack gap-5 justify-content-center">
            <input class="form-control" type="file" id="formFile" onChange={handleFileChange}/>
            <button type='button ' class='btn btn-outline-secondary' onClick={handleUpload}>Upload</button>
          </div>
              {loading &&
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status" aria-hidden="true"></div>
                </div>
              }
          <div class='container'>
              <div class='text-center'>
                <ModalViewText text={buckets}/>
                <button type='button' class='btn btn-outline-primary' onClick={handleClickEvent}>Notes</button>
                <button type='button' class='btn btn-outline-primary' onClick={handleClickEvent}>Meeting</button>

              </div>
          </div>
      </Card.Body>
    </Card>
  );
};

export default CardFile;
