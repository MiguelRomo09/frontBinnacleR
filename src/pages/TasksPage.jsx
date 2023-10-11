// import React from 'react'

import { useEffect } from "react";
import { useTasks } from "../context/TasksContext"
import { Link } from "react-router-dom";

function TasksPage() {
  const { getTasks,tasks, deleteTask } = useTasks();

  useEffect(() =>{
    getTasks()
  },[]);

  if(tasks.length == 0) return (<h1>No tasks</h1>);

  return (
    <>
    
    <div id="layoutListTask">
        <div id="layoutListTask_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-6">TasksPage</h3></div>
                                <div className="card-body">
                               
                                <table className="table table-striped table-hover table-bordered">
                                  <thead className="table-dark">
                                    <tr>
                                      <th scope="col">#</th>
                                      <th scope="col">Title</th>
                                      <th scope="col">Description</th>
                                      <th scope="col">Date</th>
                                      <th scope="col"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tasks.map((task,index) => (
                                      // <div key={taks._id}>
                                      //   <h1>{taks.title}</h1>
                                      //   <p>{taks.description}</p>
                                      // </div>
                                      <tr key={task._id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td>{new Date(task.date).toLocaleDateString()}</td>
                                        <td className="text-center">
                                          <div className="btn-group" role="group">
                                          <button type="button" className="btn btn-danger"
                                            onClick={() => {
                                              deleteTask(task._id);
                                            }}>Delete</button>
                                          <Link to={`/tasks/${task._id}`} type="button" className="btn btn-warning">Edit</Link>
                                        </div>
                                        </td>
                                      </tr>
                                    
                                    ))}
                                  </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
  
    </>
  );
}

export default TasksPage