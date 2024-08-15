import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css/skyblue';
import './styles/sliderBanners.css';
import bannersImg from '../../utils/banners.json';
import { Link } from 'react-router-dom';

const SliderBanners = () => {

  return (
    <div className='sliderbanners'>
        <Splide
        options={ {
          type: 'loop',
          autoplay: true,
          interval: 5000,
        } }
      >
        {
          bannersImg.map(image => (
            <SplideSlide key={image.id}>
              <Link to={`/category/${image.id}`}>
                <picture className='sliderbanners__img'>
                    <source media="(width > 850px)" srcset={image.desktop}/>
                    <source srcset={image.mobile}/>
                    <img src={image.desktop} alt="Banner image" />
                </picture>
              </Link>
            </SplideSlide>
          ))
        }
      </Splide>
    </div>
  )
}

export default SliderBanners;

/* <picture>
    <source media="(width > 900px)" srcset="grande.png"/>
    <source media="(width > 550px)" srcset="media.png"/>
    <source srcset="peque.png"/>
    <img src="predeterminado.png" alt="" />
</picture> */