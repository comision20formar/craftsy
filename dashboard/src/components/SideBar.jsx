import { Link, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';

export const SideBar = ({show, setShow}) => {

const location = useLocation()

  return (
    <ul
    className="navbar-nav bg-gradient-secondary sidebar sidebar-dark p-3"
    id="accordionSidebar"
    style={{position:"absolute","zIndex":1000, height:"100%", width:"250px", "left":show,}}
  >
    <div className="d-flex justify-content-end">
    <button onClick={() => setShow(-250)} className="btn btn-outline-light border-0" style={{"width":"40px"}}><i className="fas fa-times"></i></button>
    </div>
    
      <div className="p-4">
        <img
          className="w-100"
          src="/images/logo.png"
          alt="Logo Craftsy"
        />
      </div>

    <hr className="sidebar-divider my-0" />

    <li className="nav-item">
      <a className="nav-link" href="/">
        <i className="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard - Craftsy</span>
      </a>
    </li>

    <hr className="sidebar-divider" />

    <div className="sidebar-heading">Actions</div>

    <li className={`nav-item ${location.pathname === '/' && 'active'}`} >
      <Link className="nav-link collapsed d-flex align-items-center" to="/"  onClick={() => setShow(-250)}>
      <i className="fas fa-fw fa-home fa-lg"></i>
        <span style={{fontSize:"1.2rem"}} className="ml-2"> Inicio</span>
      </Link>
    </li>

    <li className={`nav-item ${location.pathname === '/products' && 'active'}`}>
      <Link className="nav-link  d-flex align-items-center" to="/products"  onClick={() => setShow(-250)}>
        <i className="fas fa-fw fa-film fa-lg"></i>
        <span style={{fontSize:"1.2rem"}} className="ml-2">Productos</span>
      </Link>
    </li>

    <hr className="sidebar-divider d-none d-md-block" />
  </ul>
  )
}

SideBar.propTypes = {
  setShow : PropTypes.func,
  show : PropTypes.number
}