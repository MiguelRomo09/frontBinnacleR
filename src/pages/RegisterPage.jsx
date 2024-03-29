import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useUsers } from '../context/UsersContext'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const { signUp, isAuthenticated, errors: AuthErrors } = useAuth();
  const { checkUserExist } = useUsers();

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/records')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    if(values.user == ''){
      values.user = (values.name.substring(0, 3) +'-'+ values.surname.substring(0, 3)).toLowerCase()
    }
    signUp(values)
  })
  
  const [name, setInputName] = useState('');
  const [surname, setInputSurname] = useState('');
  const [user, setInputUser] = useState('');

  // Función para manejar cambios en campo1
  const handleInputNameChange = (event) => {
    console.log(event.target.value);
    const value = event.target.value;
    setInputName(value);
    updateInputUser(value, surname);
  };

  // Función para manejar cambios en campo2
  const handleInputSurnameChange = (event) => {
    const value = event.target.value;
    setInputSurname(value);
    updateInputUser(name, value);
  };

  // Función para actualizar el resultado
  const updateInputUser = async (valueName, valueSurname) => {
    var userAux = (valueName.substring(0, 3) +'-'+ valueSurname.substring(0, 3)).toLowerCase(); 
    var checkUser = await checkUserExist(userAux);
    console.log(checkUser);
      setInputUser(checkUser.data);
  };

  const password = watch('psw'); // Obtén el valor del campo de contraseña
  // const confirmPassword = watch('confirmPassword'); // Obtén el valor del campo de confirmación de contraseña


  return (
    <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Registro
                    </h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      {
                        AuthErrors.map((error, i) =>(
                          <div className="alert alert-danger" role="alert" key={i}>
                            {error}
                          </div>
                        ))
                        
                      }
                      {errors.name && (
                        <div className="alert alert-danger" role="alert">
                          El Nombre es requerido
                        </div>
                      )}
                      {errors.surname && (
                        <div className="alert alert-danger" role="alert">
                          El Apellido es requerido
                        </div>
                      )}
                      {errors.psw && (
                        <div className="alert alert-danger" role="alert">
                          La contraseña es requerida
                        </div>
                      )}
                      {errors.pswConfirm && (
                        <div className="alert alert-danger" role="alert">
                          Es necesario confirmar la contraseña
                        </div>
                        
                      )}
                      {console.log(errors)}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input                            
                              {...register('name', { required: true })}
                              className="form-control"
                              id="name"
                              value={name}                              
                              type="text"
                              autoComplete="off"
                              onChange={handleInputNameChange}
                            />
                            {/* <input className="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" /> */}
                            <label htmlFor="name">Nombre(s)</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating">
                            <input
                              {...register('surname', { required: true })}
                              className="form-control"
                              id="surname"
                              value={surname}
                              type="text"
                              autoComplete="off"
                              onChange={handleInputSurnameChange}
                            />
                            {/* <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" /> */}
                            <label htmlFor="surname">Apellidos</label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              {...register('psw', { required: true })}
                              className="form-control"
                              id="psw"
                              autoComplete="off"
                              type="password"
                            />
                            {/* <input className="form-control" id="psw" type="password" placeholder="Create a password" /> */}
                            <label htmlFor="psw">Contraseña</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              {...register('pswConfirm', {
                                validate: (value) =>                          
                                  value === password || 'Las contraseñas no coinciden',
                              })}
                              className="form-control"
                              id="pswConfirm"
                              autoComplete="off"
                              type="password"
                            />
                            {/* <input className="form-control" id="psw" type="password" placeholder="Create a password" /> */}
                            <label htmlFor="pswConfirm">Confirmar contraseña</label>
                          </div>
                        </div>
                        
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              {...register('user')}
                              className="form-control"
                              id="user"
                              type="text"
                              autoComplete="off"
                              value={user}
                              
                            />
                            {/* <input className="form-control" id="psw" type="password" placeholder="Create a password" /> */}
                            <label htmlFor="user">Usuario</label>
                          </div>
                          <span style={{'color' : '#8F949B','font-size' : '12px'}}>*El usuario se genera automaticamente, no se puede editar</span>
                        </div>
                      </div>
                      <div className="mt-4 mb-0">
                        <div className="d-grid">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            Registrarse
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small">                      
                      <Link to="/login">¿Ya estas registrado? Inicia sesión</Link>
                    </div>
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
              <div className="text-muted">
                Copyright &copy; Your Website 2023
              </div>
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


export default RegisterPage

 