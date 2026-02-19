import React from "react";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import BackupIcon from '@mui/icons-material/Backup';
import { fileDownloader } from "../services/Downloader";
import CloseIcon from '@mui/icons-material/Close';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';


export default function TextComponent({ send, darkMode }) {
    const [inputValue, setInputValue] = useState([""]);
    const [text, setText] = useState("Title")
    const [file, setFile] = useState(null);
    const [transcription, setTrascription] = useState(null);
    const [loading, setLoading] = useState(false);
    const sendDataToParent = (e) => {
        console.log('Sending data to parent:', e);
        send({edit: e});
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = async (event) => {
        console.log(`Generating doc`);
        const res = await generateDoc(inputValue)
        .then(data => {
            console.log('Document generated successfully:', data);
            setText(data);})
            // await fileDownloader(res)(); // call the file downloader function with the URL from the response to trigger the download
    }
    const handleDownload = async () => {
        if (!text) return;
        setLoading(true);
        fileDownloader(text)();
        setLoading(false);
    }


    return (
        <>
            <div className={`mx-auto p-4 text-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>  
                    <TextSnippetIcon style={{ fontSize: 100 }} />
                <div className='text-center mt-12'>
                    <div className="flex justify-center"></div>
                    <textarea className='form-control' placeholder='Enter text to generate document' aria-describedby='button-addon2' value={inputValue} onChange={handleInputChange}/>
                    <br />
                    <Button variant="contained" onClick={handleButtonClick}>Generate Document</Button>
                </div>
                <div className="text-center mt-4">
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
            </div>
        </>

    );

}