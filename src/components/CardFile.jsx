import React from 'react';
import { Card } from 'react-bootstrap';
import ModalViewText from './ModalViewText';
import ModalTranscriptionView from './ModalTranscriptionView';
import { useState } from "react";
import { downloadDocument, getRoot, getBuckets, uploadFile } from '../api';
import axios from 'axios';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';


const CardFile = ({ onSend }) => {

  const [file, setFile] = useState(null);

  const [transcription, setTrascription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buckets, setBuckets] = useState([]);
  const [modelType, setModelType] = useState('Notes');

  
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

  React.useEffect(() => {
    const res = getBuckets()
    .then(data => {
      console.log('Buckets fetched successfully:', data);
      setBuckets(data);
    })
    .catch(error => {
      console.error('Error fetching buckets:', error);
    });
  }, []);


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

    // Upload file to backend and get transcription response
   try {
      const data = await uploadFile(file, modelType)
      .then(res => res)
      .catch(err => {
        console.error('Error uploading file:', err);
        throw err; // re-throw to be caught by outer catch
      });
      
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
                {/* <ModalTranscriptionView text={transcription}/> */}
                <ModalViewText text={buckets}/>
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
