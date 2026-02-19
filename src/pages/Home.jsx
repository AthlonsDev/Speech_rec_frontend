import React, { useEffect, useState } from "react";
// import CardForm from "../components/CardForm";
// import CardItem from "../components/CardItem";
// import Sidebar from "../components/Sidebar";
import { getBuckets } from "../api";
import ModalViewText from "../components/ModalViewText";
import Button from '@mui/material/Button';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AudioComponent from "../components/AudioComponent";
import TextComponent from "../components/TextComponent";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


export default function Home() {
    const [buckets, setBucket] = useState(null);
    const [showDocs, setShowDocs] = useState(false);
    const [selected, setSelected] = useState('home');
    const [darkMode, setDarkMode] = useState(false);
    const handleSend = async (inputValue, searchType) => {
        // Call getSearch with the input value as features
        const res = [inputValue, searchType];
        const data = await getSearch(res);
        const resArray = Array.isArray(data) ? data : [data];
        setQuery(resArray);
    };

    // useEffect(() => {
    //     const res = getBuckets()
    //     .then(data => {
    //       console.log('Buckets fetched successfully:', data);
    //       setBucket(data);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching buckets:', error);
    //     });
    //   }, []);

    const handlePageFlow = (e) => {
        console.log('Page flow event received:', e.edit);
        if (e === 'home' || e.edit === 'home') {
            setSelected('home');
            console.log('Home page selected');
        }
        else if (e === 'audio') {
            setSelected('audio');
            console.log('Audio page selected');
        }
        else if (e === 'text') {
            setSelected('text');
            console.log('Text page selected');
        }
    }

    return (
        <>
        {/* Home Page */}
        <div className={`mx-auto p-4 text-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <button className='absolute top-4 right-4 p-2 bg-gray-400 border rounded hover:cursor-pointer hover:bg-gray-400 transition-colors duration-300' 
                onClick={() => setDarkMode(!darkMode)}>{darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </button>
            <div className={` flex flex-col items-center h-screen p-4 ${selected === 'home' ? '' : 'hidden'}`}>
                <h1 className="text-2xl font-bold mb-4 text-center">Home</h1>
                <br />
                    <ModalViewText text={["Document 1: This is the content of document 1.", "Document 2: This is the content of document 2."]} />
                <br />
                <div className={`rounded-lg mt-4 p-4 text-center hover:bg-gray-400 transition-colors duration-300 hover:cursor-pointer flex flex-col items-center ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}`} onClick={() => handlePageFlow('audio')}>
                    {/* <button className="font-bold p-4 bg-gray-400 rounded-lg text-white hover:cursor-pointer hover:bg-gray-200">Upload Audio</button> */}
                        <Button color="primary" aria-label="upload a file" size='large'>
                            <VoiceChatIcon />
                        </Button>
                        <p>Upload Audio</p>
                </div>
                <br />
                <div className={`rounded-lg mt-4 p-4 text-center hover:bg-gray-400 transition-colors duration-300 hover:cursor-pointer ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}`} onClick={() => handlePageFlow('text')}>
                    <Button color="primary" aria-label="process text/transcription" size='large'>
                        <TextSnippetIcon />
                    </Button>
                    <p>Process Text/Transcription</p>
                </div>
            </div>

        {/* Audio Page */}
            <div>
                {selected === 'audio' && (
                    <AudioComponent send={handlePageFlow} darkMode={darkMode} />
                )}
            </div>
            {/* Text Page */}
            <div>
                {selected === 'text' && (
                    <TextComponent send={handlePageFlow} darkMode={darkMode} />
                )}
            </div>
        </div>
        </>
    )
}