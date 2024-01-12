import { useEffect,useState  } from 'react'
import { useRecords } from '../context/RecordsContext'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function RecordsPage() {
  const { getRecords, records, deleteRecord, filterRecord, filterRecordsDate } = useRecords();
  const { isAuthenticated } = useAuth();
  // const [swalProps, setSwalProps] = useState({});

  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/login')
      } else{   
        getRecords();
        // window.location.reload();
      }
  }, [])

    // Obtener la fecha actual
  // var dateNow = new Date().toISOString().split('T')[0];

  // Obtener la fecha de una semana atrás
  // var dateWeek.setDate(dateNow.getDate() - 7);


    // Función para formatear la fecha como 'YYYY-MM-DD'
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    // Función para formatear la fecha como 'DD-MM-YYYY'
    const formatDateInverted = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}/${month}/${year}`;
    };
    
  const getDateWeek = () => {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - 7);
    return fecha;
  };

  
  const [from, setInputFrom] = useState(formatDate(getDateWeek()));
  const [to, setInputTo] = useState(formatDate(new Date()));

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
      deleteRecord(row.id);
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
      name: 'Titulo',
      selector: (row) => row.title,
      sortable: true,
      width: "20%" 
    },
    {
      name: 'Contenido',
      width: "45%",
      selector: (row) => row.content,
      sortable: true,
      wrap: true,
      format: (row) => `${row.content.slice(0, 50)}...`,
    },
    {
      name: 'Fecha',
      selector: (row) => row.date,
      sortable: true,
      width: "20%",
      format: (row) => formatDateInverted(new Date(row.date)),
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
            to={`/records/${row.id}/1`}
            type="button"
            className="btn btn-warning"
            title="Editar"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
          <Link
            to={`/records/${row.id}/2`}
            type="button"
            className="btn btn-secondary"
            title="Ver"
          >
            <i className="fa-solid fa-book-open-reader"></i>
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
    filterRecord(event.target.value.toLowerCase())
  }
  
  function handleFilterDateFrom(event) {
    setInputFrom(event.target.value);
    filterRecordsDate(from,to);
  }
  
  function handleFilterDateTo(event) {
    setInputTo(event.target.value)
    filterRecordsDate(from,to);
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
                        Lista de registros
                      </h3>
                    </div>
                    <div className="card-body">
                      <div className="text-end row">
                        {/* <input type="text" onChange={handleFilter}></input> */}
                        <div className="col-md-4">
                          <div className="form-floating">
                            <input
                              className="form-control"
                              id="search"
                              onChange={handleFilter}
                              type="text"
                              autoComplete="off"                              
                            />
                            <label htmlFor="search">Buscar</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-floating">
                            <input
                              className="form-control"
                              id="searchFrom"
                              value={from}
                              onChange={handleFilterDateFrom}
                              type="date"
                              autoComplete="off"                              
                            />
                            <label htmlFor="searchFrom">De</label>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-floating">
                            <input
                              className="form-control"
                              id="searchTo"
                              value={to}
                              onChange={handleFilterDateTo}
                              type="date"
                              autoComplete="off"                              
                            />
                            <label htmlFor="searchTo">Hasta</label>
                          </div>
                        </div>
                      </div>
                      <DataTable
                        columns={columns}
                        data={records}
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
                        noDataComponent="No hay registros para mostrar"
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

export default RecordsPage
