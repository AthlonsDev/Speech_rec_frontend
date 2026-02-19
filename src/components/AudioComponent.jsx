import React from "react";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import BackupIcon from '@mui/icons-material/Backup';
import { fileDownloader } from "../services/Downloader";
import CloseIcon from '@mui/icons-material/Close';
// import { createTheme } from "../services/CreateTheme";

import { startServer } from "../api";

export default function AudioComponent({ send, darkMode }) {
    const [file, setFile] = useState(null);
    const [transcription, setTrascription] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modelType, setModelType] = useState('NOTES');

    const sendDataToParent = (e) => {
        console.log('Sending data to parent:', e);
        send({edit: e});
    }

    const handleClickEvent = (event) => {
        console.log('Model type selected:', event.target.innerText);
        setModelType(event.target.innerText);
    }

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setFile(event.target.files[0]);
        handleUpload();
    }

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

    const handleDownload = async () => {
        if (!transcription) return;
        fileDownloader(transcription);
    }

    const startInstance = async () => {
        try {
            console.log('Starting server...');
            const response = await startServer();
            if (response.ok) {
                console.log('Server started successfully');
            }
        } catch (error) {
            console.error('Error starting server:', error);
        }
    }

    useEffect(() => {
        startInstance();
    }, []);
        
        
    return (
        <>
            <div className={`mx-auto p-4 text-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className="hstack gap-5 justify-content-center">
                    <input className={`form-control  rounded-lg mt-4 p-4 text-center hover:bg-gray-400 transition-colors duration-300 hover:cursor-pointer flex flex-col items-center`} type="file" id="formFile" onChange={handleFileChange}/>
                    {/* <button type='button ' className='btn btn-outline-success btn-lg' onClick={handleUpload}>Upload</button> */}
                </div>
                <br />
                <div className="justify-content-center">
                    <p>Select Type of Audio</p>
                    <Button variant={modelType === 'NOTES' ? "contained" : "outlined"} color="primary" onClick={handleClickEvent}>Notes (1 Speaker)</Button>
                    <Button variant={modelType === 'MEETING' ? "contained" : "outlined"} color="primary" onClick={handleClickEvent}>Meeting (2+ Speakers)</Button>
                </div>
                <br />
                <div>
                    <Button startIcon={<BackupIcon />} size='large' variant="outlined" color="primary" onClick={handleUpload}>AI Process</Button>
                </div>


                {loading && <div className="text-center mt-4">Processing audio...</div>}
                {!transcription && (
                    <div className="mt-4 p-4 ">
                        <Button startIcon={<BackupIcon />} size='large' variant="outlined" color="primary" onClick={handleDownload}>Download Document</Button>
                    </div>
                )}
                <div>
                    <Button startIcon={<CloseIcon />} className="bg-red-500 hover:bg-red-600 text-white text-center" size='large' variant="contained" color="error" onClick={() => sendDataToParent('home')}>Close</Button>
                </div>
            </div>
        </>
    );

}