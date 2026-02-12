import React from 'react';
import { Card } from 'react-bootstrap';
import { useState } from "react";
import { generateDoc } from '../api'; 
import { fileDownloader } from '../services/Downloader';

const CardForm = ({ onSend }) => {
  const [inputValue, setInputValue] = useState([""]);
  const [text, setText] = useState("Title")

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


  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div class='text-center'>
        <Card.Title>Enter Transcript</Card.Title>
          <div class='input-group mb-3'>
            {/* <input type='text' class='form-control' placeholder='Search' aria-describedby='button-addon2' value={inputValue} onChange={handleInputChange}/> */}
            <textarea class='form-control' placeholder='Search' aria-describedby='button-addon2' value={inputValue} onChange={handleInputChange} rows={3}/>
            {/* <button type='button' class='btn btn-outline-success' id='button-addon2' onClick={handleInputButtonClick}>Generate</button> */}
          </div>
          <div class="hstack gap-5 justify-content-center">
            <button class='btn btn-outline-success active' data-bs-toggle="button" onClick={handleButtonClick}>Generate Doc</button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardForm;
