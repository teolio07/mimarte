import { useState, useEffect } from "react";
import "../scss/CategoryHomeslider.scss";
import "../../GlobalStyles.scss";
import { Cardlabel } from "./ProductSectionCategoryCardSection";
import { getTop10MostSoldProducts, getTop10NewProducts } from "./ContextFilteringHelpers";
import React, { useCallback } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PropTypes from 'prop-types';

const API_URL = 'https://api-mimarte.azurewebsites.net/api/Product/Lista';

const CategoryhomeSlider = ({ categoryType, categoryTitle }) => {
  const [productList, setProductList] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      const productList = json.list[0];

      if (categoryType === 1) {
        setProductList(getTop10MostSoldProducts(productList));
      }

      if (categoryType === 2) {
        setProductList(getTop10NewProducts(productList));
      }
    } catch (error) {
      console.error('Error al llamar a la API:', error);
    }
  }, [categoryType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const carouselSettings = {
    additionalTransfrom: 0,
    arrows: true,
    autoPlay: false,
    autoPlaySpeed: 5000,
    centerMode: false,
    className: '',
    containerClass: 'home-category-carousel-container bg-A-W-50',
    dotListClass: 'home-category-carousel__dots',
    draggable: true,
    focusOnSelect: false,
    infinite: true,
    itemClass: '',
    keyBoardControl: true,
    minimumTouchDrag: 80,
    renderButtonGroupOutside: false,
    renderDotsOutside: false,
    responsive: {
      desktopL: {
        breakpoint: {
          max: 5000,
          min: 1600,
        },
        items: 6,
        transitionDuration: 250,
      },
      desktop: {
        breakpoint: {
          max: 1599,
          min: 1200,
        },
        items: 6,
        transitionDuration: 250,
      },
      laptop: {
        breakpoint: {
          max: 1199,
          min: 992,
        },
        items: 5,
        transitionDuration: 250,
      },
      tabletL: {
        breakpoint: {
          max: 991,
          min: 768,
        },
        items: 4,
        transitionDuration: 250,
      },
      tabletS: {
        breakpoint: {
          max: 767,
          min: 576,
        },
        items: 4,
        transitionDuration: 250,
      },
      mobileL: {
        breakpoint: {
          max: 575,
          min: 451,
        },
        items: 3,
        transitionDuration: 250,
      },
      mobileM: {
        breakpoint: {
          max: 450,
          min: 376,
        },
        items: 2,
        slidesToSlide:2,
        transitionDuration: 250,
      },
      mobileS: {
        breakpoint: {
          max: 375,
          min: 0,
        },
        items: 2,
        slidesToSlide:2,
        transitionDuration: 250,
      },
    },
    showDots: true,
    sliderClass: '',
    slidesToSlide: 1,
    swipeable: true,
  };

  return (
    <div className="category-home-slider__carousell-main-container bg-A-W-50 font-color-30 flex-column-center">
      <div className="category-home-slider-carousel-title-fix-container">
        <div className="category-home-slide__carousell-title-container ">
          <p className="category-home-slide__carousell-title bg-B-W-100 font-500 font-color-40">{categoryTitle}</p>
        </div>
      </div>
      <Carousel {...carouselSettings}>
        {productList.map((product, index) => <Cardlabel key={index} product={product} cardAnimated={false} />)}
      </Carousel>
    </div>
  );
};

CategoryhomeSlider.propTypes = {
  categoryType: PropTypes.number.isRequired,
  categoryTitle: PropTypes.string.isRequired,
};

export default CategoryhomeSlider;