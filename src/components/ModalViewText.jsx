import React from "react";
import { useState } from "react";
import axios from 'axios';



const ModalViewText = (data) => {

    const [buckets, setBuckets] = useState([]);

    axios.get("http://10.3.0.75:8000/")
    .then(res => {
        setBuckets(res.data);
    });

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
                            {/* {data.text ? <div dangerouslySetInnerHTML={{ __html: data.text }} /> : "No Transcription Available"} */}
                              // read from /speech endpoint
                            {buckets.length > 0 ? (
                                <ul>
                                    {buckets.map((bucket, index) => (
                                        <li key={index}>{bucket}</li>
                                    ))}
                                </ul>
                            ) : (
                                "No Data Available"
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