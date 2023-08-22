import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import "../scss/HeaderNavbarPortal.scss"

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
    <nav className="mobile-navbar">
      <ul className="nav-list">
        <li className="nav-item">Inicio</li>
        <li className="nav-item">Acerca de</li>
        <li className="nav-item">Servicios</li>
        <li className="nav-item">Contacto</li>
      </ul>
    </nav>,
    document.getElementById('portal-root')
  );
};

export default HeaderNavbarPortal;
