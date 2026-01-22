import React from "react";

const ModalTranscriptionView = ({ text }) => {
    const checkData = () => {
        if (text) {
            console.log("Text content:", text);
        }
    };

    React.useEffect(() => {
        checkData();
    }, [text]);
    return (
        <>
            <div class='mx-auto p-4 text-center'>
                <button type='button' class='btn btn-outline-primary' data-bs-toggle="modal" data-bs-target="#staticBackdrop">View Current Transcription</button>
            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Current Transcription</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {/* {text ? <div dangerouslySetInnerHTML={{ __html: text }} /> : "No Transcription Available"} */}
                            {text}

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalTranscriptionView