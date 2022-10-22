import react, { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import "../style/style.css"

const UploadForm = () => {
    const submitHandler = () => {

    }
    const { user } = UserAuth()
    const renderForm = () => {
        if (user != null) {
            return (<form className="col-5 form ">
                <div className="form-group text-center">
                    <div>
                        <textarea className="form-control mt-3" id="PromptTextArea" rows={5} defaultValue={""} placeholder="Enter a description for the image and/or music you want to be generated" />
                    </div>
                    <div>
                        <textarea className="form-control mt-3" id="CaptionTextArea" rows={2} defaultValue={""} placeholder="Enter a caption for your image" />
                    </div>
                    <button type="submit" style={{ textAlign: "center", backgroundColor: "#191C76", color: "E3DFFF" }} class="btn btn-primary btn-lg col-12 mt-3">Submit</button>

                </div>

            </form>)

        } else {
            return (
                <h4 className='col-5 text-danger text-center'>Log in to start generating!</h4>
            )
        }
    }


    return (
        <div className=" row d-flex justify-content-center mb-5">
            {renderForm()}

        </div>

    )
}

export default UploadForm;