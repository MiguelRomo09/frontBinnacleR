import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout, isAdmin } = useAuth();

  return (
    <div className="sb-nav-fixed pb-4">
        <nav className="sb-topnav navbar navbar-expand  " style={{"backgroundColor" : '#e6c621'}}>
            <Link className="navbar-brand ps-3" to={'/records'}>Bitácora</Link>
            {isAuthenticated ? (
                
                <>
                 {isAdmin ? (
                    <div className="position-absolute top-50 end-0 translate-middle-y">
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/admin-users'}>Administrar usuarios</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/requests-users'}>Solicitudes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/add-record'}>Agregar registro</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() =>{logout();}} to={'/login'}>Cerrar sesión</Link>
                            </li>
        
                        </ul>
                      </div>
                 ): (
                    <div className="position-absolute top-50 end-0 translate-middle-y">
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <Link className="nav-link" to={'/add-record'}>Agregar registro</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={() =>{logout();}} to={'/login'}>Cerrar sesión</Link>
                            </li>

                        </ul>
                    </div>
                 )}   
                
                </>
            ) : (
                
                <ul className="navbar-nav position-absolute top-50 end-0 translate-middle-y">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/login'}>Iniciar sesión</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/register'}>Registrarse</Link>
                    </li>
                   
                </ul>
            )}
            {/* </div> */}
        </nav>
       
    </div>
  )
}

export default Navbar