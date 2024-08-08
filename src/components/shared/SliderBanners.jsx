import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Intersection } from "@splidejs/splide-extension-intersection";
import '@splidejs/react-splide/css/skyblue';
import './styles/sliderBanners.css';
import bannersImg from '../../utils/banners.json';

const SliderBanners = () => {

  return (
    <div className='sliderbanners'>
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
          bannersImg.map(image => (
            <SplideSlide key={image.id}>
                <picture className='sliderbanners__img'>
                    <source media="(width >= 850px)" srcset={image.desktop}/>
                    <source srcset={image.mobile}/>
                    <img src={image.desktop} alt="Banner image" />
                </picture>
            </SplideSlide>
          ))
        }
      </Splide>
    </div>
  )
}

export default SliderBanners;

/* <picture>
    <source media="(min-width: 900px)" srcset="grande.png"/>
    <source media="(min-width: 550px)" srcset="media.png"/>
    <source srcset="peque.png"/>
    <img src="predeterminado.png" alt="" />
</picture> */