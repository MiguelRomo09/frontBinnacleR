import { useAuth } from '../context/AuthContext'
import { useUsers } from '../context/UsersContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DataTable from 'react-data-table-component'

function RequestUsers() {
  const { 
    users,
    getUsersPending,
    acceptedUser,
    rejectedUser,
    filterUsers,
    } = useUsers();
  const {isAuthenticated } = useAuth();

  // var selectedRow = null; 
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/requests-users')
      getUsersPending()
    } 
    else {
      navigate('/login');
    }
  }, [isAuthenticated])
    // if(records.length == 0) return (<h1>No Records</h1>);
    const showSwalAccepted = (row) => {
      withReactContent(Swal).fire({
        icon: "question",
        title: '¿Estás seguro de aceptar este usuario?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        confirmButtonColor: "#3085d6",
        customClass: {
          actions: 'my-actions',
          confirmButton: 'order-1 right-gap',
          cancelButton: 'order-2',
          
        },
      }).then((result) => {
      if (result.isConfirmed) {
        console.log('row',row);
        acceptedUser(row.id,row);
      } 
    })
    };
    const showSwalRejected = (row) => {
      withReactContent(Swal).fire({
        icon: "question",
        title: '¿Estás seguro de rechazar este usuario?',
        showCancelButton: true,
        confirmButtonText: 'Si',
        confirmButtonColor: "#3085d6",
        customClass: {
          actions: 'my-actions',
          confirmButton: 'order-1 right-gap',
          cancelButton: 'order-2',
          
        },
      }).then((result) => {
      if (result.isConfirmed) {
        console.log('row',row);
        rejectedUser(row.id,row);
      } 
    })
    };
    const columns = [
      {
          name: '#',
          selector: row => row.id,
          sortable: true,
          format: row => row.id,
      },
      {
        name: 'Usuario',
        selector: (row) => row.user,
        sortable: true,
      },
      {
        name: 'Nombre',
        selector: (row) => row.name+' '+row.surname,
        sortable: true,
      },
      {
        name: 'Estado',
        selector: (row) => row.status,
        sortable: true,
        wrap: true,
        format: (row) => row.status == 0 ? 'Pendiente' : 'Activo',
      },
      {
        name: 'Fecha de creación',
        selector: (row) => row.createdAt,
        sortable: true,
        format: (row) => new Date(row.createdAt).toLocaleDateString(),
      },
      {
        name: '',
        button: true,
        cell: (row) => (
          <div className="btn-group" role="group">
              <button 
              type="button"
              className="btn btn-success"
              title="Aceptar"
              onClick={() => {{showSwalAccepted(row)}}}>
                <i className="fa-solid fa-user-check"></i>
              </button>
              
              

              <button 
              type="button"
              className="btn btn-danger"
              title="Rechazar"              
              onClick={() => {{showSwalRejected(row)}}}>
                <i className="fa-solid fa-user-xmark"></i>
              </button>
  
              
              
          </div>
        ),
      },
    ]
  
    const paginationComponentOptions = {
      rowsPerPageText: 'Filas por página',
      rangeSeparatorText: 'de',
      selectAllRowsItem: true,
      selectAllRowsItemText: 'Todos',
    }
  
    function handleFilter(event) {
      filterUsers(event.target.value.toLowerCase())
    }
    return (
      <>
        <div id="layoutListTask">
          <div id="layoutListTask_content">
            <main>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                      <div className="card-header">
                        <h3 className="text-center font-weight-light my-6">
                          Lista de solicitudes de usuarios
                        </h3>
                      </div>
                      <div className="card-body">
                        <div className="text-end">
                          <input type="text" onChange={handleFilter}></input>
                        </div>
                        <DataTable
                          columns={columns}
                          data={users}
                          direction="auto"
                          fixedHeaderScrollHeight="300px"
                          highlightOnHover
                          noHeader
                          pagination
                          persistTableHead
                          responsive
                          striped
                          fixedHeader
                          paginationComponentOptions={paginationComponentOptions}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
    )
  }


export default RequestUsers