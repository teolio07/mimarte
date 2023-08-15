import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PopupContextProvider from './Components/js/PopupProductModalContext';
import PopupProductModal from './Components/js/PopupProductModalContent';
import BrowserPopUpContent from './Components/js/BrowserPopupContent';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <React.StrictMode>
            <PopupContextProvider> 
                <PopupProductModal/>
                
                <App/>
            </PopupContextProvider>
        
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
