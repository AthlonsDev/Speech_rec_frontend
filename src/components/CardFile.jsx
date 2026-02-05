import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewText from './ModalViewText';
import ModalTranscriptionView from './ModalTranscriptionView';
import { useState } from "react";
import { downloadDocument, getRoot } from '../api';
import axios from 'axios';


const CardFile = ({ onSend }) => {

  const [file, setFile] = useState(null);

  const [transcription, setTrascription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [modelType, setModelType] = useState('Notes');
  const [started, setStarted] = useState(false);

  
// handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  }

  const handleClickEvent = (event) => {
    setModelType(event.target.innerText);
  }

  React.useEffect(() => {
    console.log('Component mounted, checking API root...');
        async function getRootData() {
            try {
                const data = await getRoot();
                console.log("API Root Response:", data);
            }
            catch (error) {
                console.error("Error fetching API root:", error);
            }
        }
        getRootData();
    }, []);

  // send data to parent component
  React.useEffect(() => {
    if (transcription) {
      setTrascription(transcription);
    }
  }, [transcription]);

  // React.useEffect(() => {
  //   const API_URL = import.meta.env.VITE_API_URL || "https://m67kummn2c.execute-api.eu-west-2.amazonaws.com/test1";
  //   axios.get(`${API_URL}/buckets`)
  //   .then(res => {
  //       // console.log('Fetched buckets:', res.data);
  //       setBuckets(res.data || []);
  //       // console.log('Buckets state set to:', res.data || []);
  //       console.log('first bucket:', (res.data[0]));
  //   })
  //   .catch(err => {
  //       console.error('Error fetching buckets:', err);
  //   });
  // }, []);



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
  const API_URL = import.meta.env.VITE_API_URL || "https://fall-unavailable-resistant-moving.trycloudflare.com"; //using temp cloudlfare tunnel
  // const API_URL = import.meta.env.VITE_API_URL || "http://10.3.0.68:8000";


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

  const saveDoc = async () => {
    async function fetchAndSave() {
      try {
        const filename = file.name.replace('.wav', ''); // Replace spaces with underscores for URL encoding
        const blob = await downloadDocument('docs/' +filename + '.docx');
        console.log('Document saved, preparing download...', filename);
        // create a link to download the file
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename + '.docx'); //or any other extension
        link.download = filename + '.docx';
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error('Error saving document:', error);
      }
    }
    fetchAndSave();
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
                {/* <ModalViewText text={buckets}/> */}
                <ModalTranscriptionView text={transcription}/>
                <button class='btn btn-outline-success mt-4' 
                  onClick={() => {
                    saveDoc()
                  }}>Save Word Document</button>
                <h4 class='mt-4 mb-3'>Select Model Type</h4>
              <div class="hstack gap-5 justify-content-center">
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
