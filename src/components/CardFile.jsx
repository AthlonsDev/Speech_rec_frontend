import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewText from './ModalViewText';
import { useState } from "react";
import axios from 'axios';


const CardFile = ({ onSend }) => {

  const [file, setFile] = useState(null);
  const [transcription, setTrascription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [modelType, setModelType] = useState('Notes');
  const [started, setStarted] = useState(false);
  const [stopped, setStopped] = useState(false);

  
// handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleClickEvent = (event) => {
    setModelType(event.target.innerText);
  }

  // send data to parent component
  React.useEffect(() => {
    if (transcription) {
      setTrascription(transcription);
    }
  }, [transcription]);

  React.useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || "https://m67kummn2c.execute-api.eu-west-2.amazonaws.com/test1";
    axios.get(`${API_URL}/buckets`)
    .then(res => {
        // console.log('Fetched buckets:', res.data);
        setBuckets(res.data || []);
        // console.log('Buckets state set to:', res.data || []);
        console.log('first bucket:', (res.data[0]));
    })
    .catch(err => {
        console.error('Error fetching buckets:', err);
    });
  }, []);
  
  // const handleStop = () => {
  //     console.log('Stopping backend API...');
  //     const API_URL = import.meta.env.VITE_API_URL || "https://m67kummn2c.execute-api.eu-west-2.amazonaws.com/test1";
  //     const apiKey = import.meta.env.VITE_API_KEY;
  //     axios.post(`${API_URL}/stop`, null, { headers: apiKey ? { 'x-api-key': apiKey } : {} })
  //     .then(res => {
  //         console.log('Backend API stopped:', res.data);
  //         setStopped(true);
  //     })
  //     .catch(err => {
  //         console.error('Error stopping backend API:',
  //           err?.response?.status,
  //           err?.response?.data,
  //           err?.response?.headers,
  //           err?.message
  //         );
  //     });
  //     // repeat the stop request after 3 seconds - to solve weird bug with lambda not stopping
  //     setTimeout(() => {
  //             handleStop(); 
  //     }, 3000);
  // };


  // file upload to backend API to be implemented
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true); // show loading spinner while uploading
    const formData = new FormData();
    console.log('modelType:', modelType);
    formData.append('file', file);
    formData.append('model_type', modelType);
        // Debug: Log FormData contents
    console.log('FormData contents:');
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    // const API_URL = import.meta.env.VITE_API_URL || "https://s5fzof-ip-13-40-107-140.tunnelmole.net";
  const API_URL = import.meta.env.VITE_API_URL || "https://m67kummn2c.execute-api.eu-west-2.amazonaws.com/test1";


   try {
      const response = await fetch(`${API_URL}/speech`, {
        method: "POST",
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
        <Card.Title class='text-center'>
          <h3>Upload File</h3>
          </Card.Title>
          <div class="hstack gap-5 justify-content-center">
            <input class="form-control" type="file" id="formFile" onChange={handleFileChange}/>
            <button type='button ' class='btn btn-outline-success btn-lg' onClick={handleUpload}>Upload</button>
          </div>
              {loading &&
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status" aria-hidden="true"></div>
                </div>
              }
          <div class='container'>
              <div class='text-center'>
                <ModalViewText text={buckets}/>
                <h4 class='mt-4 mb-3'>Select Model Type</h4>
              <div class="hstack gap-5 justify-content-center">
                {/* <button onClick={handleStart}>Start</button> */}
                {/* <button className='btn btn-outline-danger' onClick={handleStop}>Stop</button> */}
                <button class={`btn btn-outline-success active ${modelType === 'Notes' ? 'active' : ''}`} data-bs-toggle="button" aria-selected={modelType === "Notes"} onClick={handleClickEvent}>Notes</button>
                <button class={`btn btn-outline-success ${modelType === 'Meeting' ? 'active' : ''}`} data-bs-toggle="button" aria-selected={modelType === "Meeting"} onClick={handleClickEvent}>Meeting</button>
              </div>
              </div>
          </div>
      </Card.Body>
    </Card>
  );
};

export default CardFile;
