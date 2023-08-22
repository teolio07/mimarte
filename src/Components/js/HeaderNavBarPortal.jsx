import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

import "../scss/HeaderNavbarPortal.scss"

//import aimation library
import { Slide } from "react-awesome-reveal";

const HeaderNavbarPortal = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Define tu propia breakpoint para móviles
    };

    // Agregar el listener de cambio de tamaño de ventana
    window.addEventListener('resize', handleResize);
    handleResize(); // Verificar inicialmente al cargar el componente

    // Remover el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobile) {
    return null; // No renderizar nada en tamaños de pantalla mayores a móviles
  }

  // Renderizar la barra de navegación en el portal
  return ReactDOM.createPortal(
    <Slide className='header-navbar-slide-ul-container'
    cascade="true" delay={70} duration={1000} >
      
      <nav className="mobile-navbar shadow-A ">
        <ul className="nav-list">
          <Link to="/mimarte" className="nav-item bg-A-W-50" >Inicio</Link>
          <Link to="/mimarte/products" className="nav-item bg-A-W-50">Productos</Link>
          <Link className="nav-item bg-A-W-50">Buscador</Link>
          <Link to="" className="nav-item bg-A-W-50">Contacto</Link>
        </ul>
      </nav>
    </Slide>,
    document.getElementById('portal-root')
  );
};

export default HeaderNavbarPortal;
