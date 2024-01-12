import { useAuth } from '../context/AuthContext'
import { useUsers } from '../context/UsersContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function AdminUsers() {
  const { 
    users,
    getUsers,
    deleteUser,
    filterUsers,
    } = useUsers();
  const {user,isAuthenticated } = useAuth();
  // const [swalProps, setSwalProps] = useState({});

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      console.log('type user',user);
      if(user.userType == 1){
        navigate('/admin-users');
        getUsers();
      }else{
        navigate('/records');
      }
    } 
    else {
      navigate('/login');
    }
  }, [isAuthenticated])
    // if(records.length == 0) return (<h1>No Records</h1>);
    const showSwal = (row) => {
      withReactContent(Swal).fire({
        icon: "question",
        title: '¿Estas seguro de eliminar este registro?',
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
        deleteUser(row.id);
      } 
    })
    };
    const columns = [
      // {
      //     name: '#',
      //     selector: row => row.title,
      //     sortable: true,
      //     format: row => row.id,
      // },
      {
        name: 'usuario',
        selector: (row) => row.user,
        sortable: true,
      },
      {
        name: 'Nombre',
        selector: (row) => row.name +' '+row.surname,
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
              className="btn btn-danger"
              title="Eliminar"
              onClick={() => {{showSwal(row)}}}>
                <i className="fa-solid fa-trash"></i>
              </button>
              
            <Link
              to={`/admin-users/${row.id}`}
              type="button"
              className="btn btn-warning"
              title="Editar"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
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
                          Usuarios
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


export default AdminUsers