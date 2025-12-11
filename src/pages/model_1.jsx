import React, { useCallback } from "react";
import { data, Link, useParams } from "react-router-dom";
import CardFile from "../components/CardFile";
import CardForm from "../components/CardForm";
import Sidebar from "../components/Sidebar";
import { getFiles, getSpeech } from "../api";
import axios from 'axios'
import { useEffect, useState } from "react";
import { use } from "react";




export default function Model_1(){
    const [transcription, setTranscription] = useState("");
// retireve transcription data from CardFile component
    const handleSetTranscription = useCallback((data) => {
        setTranscription(data);
    }, []);
    return(
        <>
        {/* Sidebar Menu */}
        {/* <Sidebar/> */}

            <div class="text-center">
                <h1>Speech Recognition</h1>
            </div>

            {/* Load model API */}

            <CardFile text={data} setTranscription={handleSetTranscription}/>

            <h2 class="text-center mt-4 mb-4">
                Quick Tutorial
                
            </h2>

            <h3>
                How Does It Work?
            </h3>
            <p>
                Our Speech Recognition model utilizes advanced machine learning algorithms to convert spoken language into written text. By analyzing audio input, the model identifies phonetic patterns and translates them into accurate transcriptions.
            </p>

            <h3>
                Step-by-Step Guide
            </h3>
            <ol>
                <li><strong>Upload Your Audio File:</strong> Click on the upload button to select your audio file from your device.</li>
                <li><strong>Select Model Type:</strong> Choose the appropriate model type that best suits your audio characteristics.</li>
                <li><strong>Initiate Transcription:</strong> Click the 'Upload' button to send your file for processing. The model will analyze the audio and generate a transcription.</li>
                <li><strong>Cloud Processing: </strong> The audio file is processed in the cloud and saved in the database, so the app can be accessed from any device.</li>
                <li><strong>View Results:</strong> Once processing is complete, the transcribed text will be available to download as a Word document.</li>
            </ol>

            <h3>
                Type of Models
            </h3>
            <ul>
                <li><strong>Notes Transcription:</strong> Suitable for single speaker audio.</li>
                <li><strong>Meeting Transcription:</strong> Designed for multi-speaker audio, such as business meetings or conferences.</li>
            </ul>
            <h3>
                Disclaimer
            </h3>
            <p>
                This model is running in a testing environment, so the processing of the audio files is still quite slow.
                When a more advaced environment will be available, the speed and accuracy of the transcriptions will improve significantly.
            </p>
        </>
    );
};
