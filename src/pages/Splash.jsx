import React from "react";
import { useState } from "react";
import axios from 'axios';

export default function Splash(){
    const [loading, setLoading] = useState(true);
    const [started, setStarted] = useState(false);

    React.useEffect(() => {
        // quick animation of application starting up
        
       
        // repeat the start request after 3 seconds - to solve weird bug with lambda not starting
        setTimeout(() => {
              handleStart(); 
      }, 3000);
        window.location.href = "/model_1";

    }, []);


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