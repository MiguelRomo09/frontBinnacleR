import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage(){

    const {register, handleSubmit, formState:{errors}} = useForm();
    const {signIn, errors: signInErros, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(data => {
        signIn(data);
        console.log(data);
    })

    useEffect(() =>{
        if(isAuthenticated) navigate("/tasks");
    }, [isAuthenticated])
    return(
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                    <div className="card-body">
                                        {
                                            signInErros.map((error, i) =>(
                                            <div className="alert alert-danger" role="alert" key={i}>
                                                {error}
                                            </div>
                                            ))
                                            
                                        }
                                        {errors.password && (
                                            <div className="alert alert-danger" role="alert">
                                            Password is required
                                            </div>
                                        )}
                                        {errors.email && (
                                            <div className="alert alert-danger" role="alert">
                                            Email is required
                                            </div>
                                        )}
                                        <form onSubmit={onSubmit}>
                                            <div className="form-floating mb-3">
                                                <input
                                                className="form-control"
                                                id="inputEmail"
                                                type="email"
                                                {...register('email', { required: true })}
                                                />
                                                <label htmlFor="inputEmail">Email address</label>
                                            </div>
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input
                                                className="form-control"
                                                id="inputPassword"
                                                type="password"
                                                {...register('password', { required: true })}
                                                />
                                                <label htmlFor="inputPassword">Password</label>
                                            </div>
                                            {/* <div className="form-check mb-3">
                                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                            </div> */}
                                            <div className="d-grid gap-2 align-items-center mt-4 mb-0">
                                                <button className="btn btn-primary" type="submit">Button</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default LoginPage