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

        <div class="text-center">
            <h1>Speech Recognition</h1>
        </div>

        {/* Load model API */}

        <CardFile text={data} setTranscription={handleSetTranscription}/>
        <CardForm></CardForm>
        </>
    );
};
