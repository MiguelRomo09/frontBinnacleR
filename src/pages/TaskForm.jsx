import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function TaskForm() {
  const {register, handleSubmit, setValue } = useForm();
  const {createTask, getTask, updateTask} = useTasks();
  const navigate = useNavigate();
  const params = useParams();


  useEffect(() => {
    async function loadTask(){ 
        if(params.id){
            const task = await getTask(params.id);
            setValue('title',task.title);
            setValue('description', task.description);
        }   
    }
    loadTask();
  },[]);

  const onSubmit = handleSubmit((data) => {
    if(params.id){
        updateTask(params.id, data);
    }else{
        createTask(data);
    }
    navigate('/tasks');
  });

  return (
    <div id="layoutFormTask">
        <div id="layoutFormTask_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-6">Nuevo</h3></div>
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
                                            />
                                            <label htmlFor="inputTitle">Title</label>
                                        </div>
                                        <div className="form-floating mb-3 ">
                                            <textarea
                                            rows="10"
                                            className="form-control"
                                            id="inputDescription"
                                            type="text"
                                            {...register('description', { required: true })}
                                            ></textarea>
                                            <label htmlFor="inputDescription">Description</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                            className="form-control"
                                            id="inputDate"
                                            type="date"
                                            {...register('date', { required: true })}
                                            />
                                            <label htmlFor="inputTitle">Date</label>
                                        </div>
                                        {/* <div className="form-check mb-3">
                                            <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                            <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                        </div> */}
                                        <div className="d-grid gap-2 align-items-center mt-4 mb-0">
                                            <button className="btn btn-success" type="submit">Save</button>
                                        </div>
                                    </form>
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

export default TaskForm