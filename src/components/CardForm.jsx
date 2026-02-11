import React from 'react';
import { Card } from 'react-bootstrap';
import { useState } from "react"; 

const CardForm = ({ onSend }) => {
  const [inputValue, setInputValue] = useState([""]);
  const [searchType, setSearchType] = useState("Title")

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputButtonClick = () => {
    if (inputValue.length < 2){
      alert("Input field is empty!");
      return;
    } 
    else {
      if (onSend) {
        onSend(inputValue, searchType);
      }
    }
  }

  const handleButtonClick = (event) => {
    setSearchType(event.target.innerText);
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
            <button class='btn btn-outline-success active' data-bs-toggle="button" onClick={handleInputButtonClick}>Generate Doc</button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardForm;
