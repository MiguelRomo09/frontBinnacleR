import { useEffect } from "react";
// import { useTasks } from "../context/TasksContext"
import { useRecords } from "../context/RecordsContext"
import { Link } from "react-router-dom";

function RecordsPage() {
  const { getRecords,records, deleteRecord } = useRecords();

  useEffect(() =>{
    getRecords()
  },[]);

  if(records.length == 0) return (<h1>No Records</h1>);

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
                                      <th scope="col">Content</th>
                                      <th scope="col">Date</th>
                                      <th scope="col"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {records.map((record,index) => (
                                      // <div key={taks.id}>
                                      //   <h1>{taks.title}</h1>
                                      //   <p>{taks.content}</p>
                                      // </div>
                                      <tr key={record.id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{record.title}</td>
                                        <td>{record.content}</td>
                                        <td>{new Date(record.date).toLocaleDateString()}</td>
                                        <td className="text-center">
                                          <div className="btn-group" role="group">
                                          <button type="button" className="btn btn-danger"
                                            onClick={() => {
                                              deleteRecord(record.id);
                                            }}>Delete</button>
                                          <Link to={`/records/${record.id}`} type="button" className="btn btn-warning">Edit</Link>
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

export default RecordsPage