import react from 'react';
import "../style/style.css"

const UploadForm = () => {
    const submitHandler = () => {

    }
    return (
        <div className=" row d-flex justify-content-center mb-5">
            <form className="col-5 form ">
                <div className="form-group text-center">
                    <div>
                        <textarea className="form-control mt-3" id="PromptTextArea" rows={5} defaultValue={""} placeholder="Enter a description for the image and/or music you want to be generated" />
                    </div>
                    <div>
                        <textarea className="form-control mt-3" id="CaptionTextArea" rows={2} defaultValue={""} placeholder="Enter a caption for your image" />
                    </div>
                    <button type="submit" style={{ textAlign: "center", backgroundColor: "#191C76", color: "E3DFFF" }} class="btn btn-primary btn-lg col-12 mt-3">Submit</button>

                </div>

            </form>

        </div>

    )
}

export default UploadForm;