import Navbar from '../components/Navbar';
import {AiOutlineGoogle} from "react-icons/ai";

const Signup = () => {
    return (
        <div>
            <Navbar/>
            <section className="vh-100" style={{ backgroundColor: '#363639' }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong bg-dark" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <h3 className="mb-5" style={{fontWeight: '550', color: 'white'}}>Sign Up</h3>
                                    <div className="form-outline mb-4">
                                        <input type="email" id="typeEmailX-2" className="form-control form-control-lg bg-secondary" placeholder='Email'/>

                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="text" id="typeEmailX-2" className="form-control form-control-lg bg-secondary" placeholder='Username'/>

                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="password" id="typePasswordX-2" className="form-control form-control-lg bg-secondary" placeholder='Password'/>

                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="password" id="typePasswordX-2" className="form-control form-control-lg bg-secondary" placeholder='Confirm Password'/>

                                    </div>
                                    {/* Checkbox */}
                                    <div className="form-check d-flex justify-content-start mb-4">
                                        <input className="form-check-input ml3" type="checkbox" defaultValue id="form1Example3" />
                                        <label className="form-check-label me3" htmlFor="form1Example3" style={{color: 'white'}}> Remember password </label>
                                    </div>
                                    <button className="btn btn-primary btn-lg btn-block bg-secondary" type="submit" style={{width: '100%'}}>Sign Up</button>
                                    <hr className="my-4" style={{color: 'white'}}/>
                                    <button className="btn btn-lg btn-block btn-primary" style={{ backgroundColor: '#dd4b39' ,width:'100%', height: '15%'}} type="submit"><AiOutlineGoogle size={30} style={{verticalAlign: 'middle'}} className="fab fa-google me-2"/> Sign up with Google</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
    )
}

export default Signup