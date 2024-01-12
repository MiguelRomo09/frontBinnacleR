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
         if(isAuthenticated) navigate("/records");
    }, [isAuthenticated])
    return(
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card shadow-lg border-0 rounded-lg mt-5">
                                    <div className="card-header"><h3 className="text-center font-weight-light my-4">Iniciar sesión</h3></div>
                                    <div className="card-body">
                                        {
                                            signInErros.map((error, i) =>(
                                            <div className="alert alert-danger" role="alert" key={i}>
                                                {error}
                                            </div>
                                            ))
                                            
                                        }
                                        {errors.psw && (
                                            <div className="alert alert-danger" role="alert">
                                            La contraseña es requerida
                                            </div>
                                        )}
                                        {errors.user && (
                                            <div className="alert alert-danger" role="alert">
                                            El usuario es requrido
                                            </div>
                                        )}
                                        <form onSubmit={onSubmit}>
                                            <div className="form-floating mb-3">
                                                <input
                                                className="form-control"
                                                id="inputEmail"
                                                type="text"
                                                {...register('user', { required: true })}
                                                />
                                                <label htmlFor="inputEmail">Usuario</label>
                                            </div>
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input
                                                className="form-control"
                                                id="inputPassword"
                                                type="psw"
                                                autoComplete="off"
                                                {...register('psw', { required: true })}
                                                />
                                                <label htmlFor="inputPassword">Contraseña</label>
                                            </div>
                                            {/* <div className="form-check mb-3">
                                                <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                <label className="form-check-label" htmlFor="inputRememberPassword">Remember psw</label>
                                            </div> */}
                                            <div className="d-grid gap-2 align-items-center mt-4 mb-0">
                                                <button className="btn btn-primary" type="submit">Iniciar sesión</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="card-footer text-center py-3">
                                        <div className="small"><Link to="/register">¿No tienes cuenta? Registrate</Link></div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-5 mx-auto">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header">
                                    ESTANDARIZACIÓN DE CONTROL Y PARÁMETROS DE LÍNEA 1
                                </div>
                                <div className="card-body row justify-content-center ">
                                    <img className="img-thumbnail" style={{"width" : '70%',"height" : '70%'}} src="img\qr.jpeg" alt="Descripción de la imagen"></img>
                                </div>
                            </div>
                        </div>
                            
                    </div>
                </main>
            </div>
            {/* <div id="layoutAuthentication_footer">
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
            </div> */}
        </div>
    )
}

export default LoginPage