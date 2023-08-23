import "../scss/Header.scss";
import "../../GlobalStyles.scss";
import mimarteLogo from "../../Icons/mimarteLogo.jpg";
import { RiHome6Line } from "react-icons/ri"
import { AiOutlineSearch } from "react-icons/ai"

import { Link } from 'react-router-dom';


import { BsTelephone } from "react-icons/bs"


import { CgShoppingBag } from "react-icons/cg"


import instaIcon from "../../Icons/instagram.png";
import facebookIcon from "../../Icons/facebook.png";
import whatsappIcon from "../../Icons/whatsapp.png";




import React, { useState, useContext} from "react";
import { PopupProductContext } from "./PopupProductModalContext";
import HeaderNavbarPortal from "./HeaderNavBarPortal";


export default function Header() {


  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  

  const { setBrowserModalState } = useContext(PopupProductContext);

  return (
    <header>
      {isNavbarOpen && <HeaderNavbarPortal />}
      <div className="header__banner-text-container flex-column-center">
        <p id="header-text" className="header__banner-text__text font-mobile-small-B font-color-40 font-500">
          <span className="header__banner-text__text__span">Envíos a Toda Colombia!</span>
         
        </p>
      </div>
      <div className="header__navbar-container bg-B-W-100">
        <div className="header__navbar__hamburguer-container ">
          <label htmlFor="check">
            <input
              type="checkbox"
              id="check"
              checked={isNavbarOpen}
              onChange={() => setIsNavbarOpen(!isNavbarOpen)}
            />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
        <div className="header__navbar__social-media-links-container ">
          <img
            className="header__navbar__social-media__icons font-color-40"
            src={instaIcon}
            alt="instaIcon"
          />
          <img
            className="header__navbar__social-media__icons font-color-40"
            src={facebookIcon}
            alt="instaIcon"
          />
          <img
            className="header__navbar__social-media__icons font-color-40"
            src={whatsappIcon}
            alt="instaIcon"
          />
        </div>
        <div className="header__navbar__logo-container">
          <img
            className="header__navbar__logo-img shadow-A border-b "
            alt="mimarteLogo"
            src={mimarteLogo}
          />
        </div>
        <div className="header__navbar__icon-container font-mobile-small-C font-color-40 ">
          <Link to="/" className="flex-row-center decoration-none">
            <p className="header__navbar__icon-tag header__navbar__icon-tag-inicio font-color-40">
              Inicio
            </p>
            <RiHome6Line className="header__navbar__icons font-color-40 header__navbar__icon-home" />
          </Link>
          <div onClick={() => setBrowserModalState(true)} className="flex-row-center">
            <p className="header__navbar__icon-tag font-color-40 font-600">Buscador</p>
            <AiOutlineSearch className=" font-500  header__navbar__icons font-color-40" />
          </div>
          <Link to="/products" className="flex-row-center header__navbar__pestana-container decoration-none">
            <p className="decoration-none header__navbar__icon-tag font-color-40">Productos</p>
            <CgShoppingBag className="header__navbar__icons font-color-40" />
          </Link>
          <Link className="flex-row-center decoration-none">
            <p className="header__navbar__icon-tag font-color-40">Contacto</p>
            <BsTelephone className="header__navbar__icons font-color-40" />
          </Link>
        </div>
      </div>
      <div className="header__navbar__pestana__icon-container"></div>
    </header>
  );

  }