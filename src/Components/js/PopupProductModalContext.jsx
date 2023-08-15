// PopupProductContext.js
import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
export const PopupProductContext = createContext();

// Hook personalizado para acceder al contexto
export const usePopupProductContext = () => {
  return useContext(PopupProductContext);
};

// Creamos el componente proveedor del estado global
const PopupContextProvider = ({ children }) => {
  
  const [popupState, setPopupState] = useState(false);
  //estado para el producto que vamos a mostrar
  const [productModalInfo, setProductModalInfo] = useState({});

  //estado encargado de la popup del buscador de productos
  const [browserModalState, setBrowserModalState] = useState(false);


  return (
    <PopupProductContext.Provider value={{ popupState, setPopupState, productModalInfo , setProductModalInfo, browserModalState, setBrowserModalState}}>
      {children}
    </PopupProductContext.Provider>
  );
};

export default PopupContextProvider;
