import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UsersContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ModifyUserForm() {
  const {
    register,
    handleSubmit,
    watch, 
    setValue,
    formState: { errors },
  } = useForm()
  const { isAuthenticated, errors: AuthErrors } = useAuth();
  const { getUser,updateUser,checkUserExist } = useUsers();

  const navigate = useNavigate()

  const params = useParams();


  const [name, setInputName] = useState('');
  const [surname, setInputSurname] = useState('');
  const [user, setInputUser] = useState('');
  const [suspend, setInputSuspend] = useState(false);
  const [userType, setInputUserType] = useState(false);

  useEffect(() => {
    async function loadRecord(){ 
        if(params.id){
            const findUser = await getUser(params.id);
            setValue('name',findUser[0].name);
            setValue('surname', findUser[0].surname);
            setValue('user', findUser[0].user);
            if(findUser[0].status == 2){              
              setValue('suspend', true);
              setInputSuspend(true);
            }else{           
              setValue('suspend', false);
              setInputSuspend(false);
            }
            if(findUser[0].userType == 1){              
              setValue('userType', true);
              setInputUserType(true);
            }else{           
              setValue('userType', false);
              setInputUserType(false);
            }

            setInputName(findUser[0].name);
            setInputSurname(findUser[0].surname);
            setInputUser(findUser[0].user);
        }   
    }
    loadRecord();
  },[]);

  useEffect(() => {
    if (!isAuthenticated) navigate('/records')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    if(values.user == ''){
      values.user = (values.name.substring(0, 3) +'-'+ values.surname.substring(0, 3)).toLowerCase();
    }
    updateUser(params.id,values);
    navigate('/admin-users')
    
  })
  

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
                      Modificar usuario
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
                            <label htmlFor="surname">Apellidos</label>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              {...register('psw')}
                              className="form-control"
                              id="psw"
                              autoComplete="off"
                              type="password"
                            />
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
                            <label htmlFor="pswConfirm">Confirmar contraseña</label>
                          </div>
                        </div>
                        
                        <span style={{'color' : '#8F949B','font-size' : '12px'}}>*Si no se quiere modificar la contraseña, deje en blanco los espacios</span>
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
                            <label htmlFor="user">Usuario</label>
                          </div>
                          <span style={{'color' : '#8F949B','font-size' : '12px'}}>*El usuario se genera automaticamente, no se puede editar</span>
                        </div>
                        <div className='col-md-6'>
                          <ul className="list-group list-group-horizontal">
                            <li className="list-group-item col-md-6">
                              <input className="form-check-input me-1" type="checkbox" value={suspend}  id="suspend" {...register('suspend')}/>
                              <label className="form-check-label" htmlFor="suspend">Suspender</label>
                            </li>
                            <li className="list-group-item col-md-6">
                              <input className="form-check-input me-1" type="checkbox" value={userType} id="userType" {...register('userType')} />
                              <label className="form-check-label" htmlFor="userType">Administrador</label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 mb-0">
                        <div className="d-grid">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            Guardar cambios
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


export default ModifyUserForm

 