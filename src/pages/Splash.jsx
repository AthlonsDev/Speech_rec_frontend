import React from "react";
import { useState } from "react";
import axios from 'axios';

export default function Splash(){
    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "https://m67kummn2c.execute-api.eu-west-2.amazonaws.com/test1";

    React.useEffect(() => {
        const apiKey = import.meta.env.VITE_API_KEY;
        axios.post(`${API_URL}/start`, null, { headers: apiKey ? { 'x-api-key': apiKey } : {} })
        .then(res => {
            console.log('Backend API started:', res.data);
            setStarted(true);
        })
        .catch(err => {
            console.error('Error starting backend API:',
              err?.response?.status
            );
        });
        // repeat the start request after 3 seconds - to solve weird bug with lambda not starting
        setTimeout(() => {
              handleStart(); 
      }, 3000);
    }, []);

    React.useEffect(() => {
        if (started) {
            axios.get(`${API_URL}/`)
            .then(res => {
                setLoading(false);
                console.log('Backend API is running:', res.data);
                // go to model_1 page
                window.location.href = "/model_1";
            })
            .catch(err => {
                console.error('Error checking backend API status:',
                  err?.response?.status,
                //   try again after 2 seconds
                );
            });
        }
    }, [started]);

    return(
        <>
            <div class="text-center">
                <h1>Welcome to the Speech Recognition App</h1>
                <p>Your gateway to accurate and efficient speech-to-text conversion.</p>
                <p>The Server is Initializing...</p>
                {loading &&
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status" aria-hidden="true">
                    
                  </div>
                  
                </div>
                }
                <p>Please wait...</p>
            </div>
        </>
    )
}