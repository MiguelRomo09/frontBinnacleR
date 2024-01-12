import { useForm } from 'react-hook-form'
// import { useTasks } from '../context/TasksContext';
import { useRecords } from '../context/RecordsContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

function RecordForm() {
  const {register, handleSubmit, setValue } = useForm();
  const {createRecord, getRecord, updateRecord} = useRecords();
  const navigate = useNavigate();
  const params = useParams();

  var titlePage = '';
  if(params.type == 1){titlePage = 'Editar registro'}
  if(params.type == 2){titlePage = 'Ver registro'} 
  if(params.type == undefined){titlePage = 'Nuevo registro'} 
  useEffect(() => {
    async function loadRecord(){ 
        if(params.id){
            const record = await getRecord(params.id);
            setValue('title',record.title);
            setValue('content', record.content);
            setValue('date', formatDate(new Date(record.date)));
            
        }   
    }
    loadRecord();
  },[]);

  const onSubmit = handleSubmit((data) => {
    if(params.id){
        updateRecord(params.id, data);
    }else{
        createRecord(data);
    }
    navigate('/records');
  });
   // Función para formatear la fecha como 'YYYY-MM-DD'
   const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  return (
    <div id="layoutFormTask">
        <div id="layoutFormTask_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-6">{titlePage}</h3></div>
                                <div className="card-body">
                                    {/* {
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
                                    )} */}
                                    <form onSubmit={onSubmit}>
                                        <div className="form-floating mb-3">
                                            <input
                                            className="form-control"
                                            id="inputTitle"
                                            type="text"
                                            {...register('title', { required: true })}
                                            disabled={params.type == 2}
                                            />
                                            <label htmlFor="inputTitle">Titulo</label>
                                        </div>
                                        <div className=" mb-3 ">

                                            <textarea
                                            rows={10}
                                            className="form-control"
                                            id="inputContent"
                                            type="text"
                                            placeholder="Comentarios"
                                            {...register('content', { required: true })}
                                            disabled={params.type == 2}
                                            />
                                        </div>
                                        
                                        <div className="form-floating mb-3">
                                            <input
                                            className="form-control"
                                            id="inputDate"
                                            type="date"
                                            {...register('date', { required: true })}
                                            disabled={params.type == 2}
                                            />
                                            <label htmlFor="date">Fecha</label>
                                        </div>
                                        <div className="gap-2 align-items-center mt-4 mb-0">
                                            <Link
                                                to={`/records`}
                                                type="button"
                                                className="btn btn-dark col-4 float-end"
                                                title="Ver"
                                            >Regresar</Link>
                                            {params.type != 2 && <button className="btn btn-success col-4 float-start" type="submit">Guardar</button>}
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

export default RecordForm