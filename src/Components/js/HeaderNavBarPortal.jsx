import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

import {
  Fade,
  JackInTheBox,
  Hinge,
  Slide,
  Zoom,
  Roll,
  Bounce,
} from "react-awesome-reveal";

import "../scss/HeaderNavbarPortal.scss"
import "../../GlobalStyles.scss"



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
  
      
     <div className='navbar-index'>
       
    
      <nav className="mobile-navbar shadow-A ">
        <ul className="nav-list">
          <Fade className='nav-list-animated-container' direction='right' delay={200} duration={200}><Link to="/" className="nav-item bg-A-W-50 font-color-40 decoration-none" >Inicio</Link></Fade>
          <Fade className='nav-list-animated-container'  direction='right' delay={200} duration={200}><Link to="/products" className="nav-item bg-A-W-50 font-color-40 decoration-none" >Productos</Link></Fade>
          <Fade className='nav-list-animated-container'  direction='right' delay={200} duration={200}>  <Link className="nav-item bg-A-W-50 font-color-40 decoration-none">Buscador</Link></Fade>
          <Fade className='nav-list-animated-container'  direction='right' delay={200} duration={200}>
          <Link  className="bg-A-W-50 nav-item  font-color-40 decoration-none">Contacto</Link></Fade>
          
        
        </ul>
      </nav>
      
    
     </div>,
    
    document.getElementById('portal-root')
  );
};

export default HeaderNavbarPortal;
