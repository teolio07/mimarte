import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

import "../scss/HeaderNavbarPortal.scss"
import "../../GlobalStyles.scss"

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
  
      
      <nav className="mobile-navbar shadow-A ">
        <ul className="nav-list">
          <Link to="/" className="nav-item bg-A-W-50 font-color-40 decoration-none" >Inicio</Link>
          <Link to="/products" className="nav-item bg-A-W-50 font-color-40 decoration-none">Productos</Link>
          <Link className="nav-item bg-A-W-50 font-color-40 decoration-none">Buscador</Link>
          <Link  className="bg-A-W-50 nav-item  font-color-40 decoration-none">Contacto</Link>
        </ul>
      </nav>,
    
    document.getElementById('portal-root')
  );
};

export default HeaderNavbarPortal;
