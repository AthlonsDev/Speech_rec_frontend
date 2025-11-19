import React from "react";
import { useState } from "react";
import axios from 'axios';



const ModalViewText = (data) => {

    const handleClick = (item) => {
        // send  request to backend to download file
        return async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || "http://10.3.0.75:8000";
                const response = await fetch(`${API_URL}/download/${encodeURIComponent(item)}`);
                if (!response.ok) {
                    throw new Error('File download failed');
                }
                const blob = await response.blob();
                // create a link to download the file
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', item); //or any other extension
                link.download = item;
                document.body.appendChild(link);
                link.click();
                link.remove();
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        };
    }

    return (
        <>
            <div class='mx-auto p-4 text-center'>
                <button type='button' class='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#staticBackdrop">View</button>
            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Transcription</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {data.text.length > 0 ? (
                                data.text.map((item, index) => (
                                    <div key={index} class='mb-3 p-2 border'>
                                        <p>{item}</p>
                                        <button 
                                            type='button'
                                            class='btn btn-outline-secondary btn-sm'
                                            onClick={handleClick(item)}>
                                                Download
                                        </button>
                                     </div>
                                ))
                            ) : (
                                "No Transcription Available"
                                )}

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="button" class="btn btn-primary">Understood</button> */}
                            {/* TODO: Save transcription as a Word file */}
                            {/*  */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalViewText