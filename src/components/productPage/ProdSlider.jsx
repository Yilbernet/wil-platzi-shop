import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Intersection } from "@splidejs/splide-extension-intersection";
import '@splidejs/react-splide/css/skyblue';
import './styles/prodSlider.css';

const ProdSlider = ({product}) => {

  return (
    <div className='prodslider'>
      <Splide
        options={ {
          type: 'loop',
          autoplay: true,
          interval: 5000,
          intersection: {
            inView: {
              autoplay: true,
            },
          },
        } }
        extensions={{ Intersection }}
      >
        {
          product?.images.map(image => (
            <SplideSlide key={image}>
              <img src={
                image.endsWith(']') ?
                image.slice(2, -2) : 
                image.startsWith('[') ?
                image.slice(2, -1) : 
                image
              } alt="Product image"/>
            </SplideSlide>
          ))
        }
      </Splide>
    </div>
  )
}

export default ProdSlider;