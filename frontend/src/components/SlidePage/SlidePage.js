import React from 'react';
import Marquee from 'react-fast-marquee';
import img1 from '../../images/photo1.svg';
import img2 from '../../images/photo2.svg';
import img3 from '../../images/photo3.svg';
import img4 from '../../images/photo4.svg';
import img5 from '../../images/photo5.svg';
import img6 from '../../images/photo6.svg';
import img7 from '../../images/photo7.svg';
import img8 from '../../images/photo8.svg';

import './SlidePage.css';

function SlidePage() {
  return (
    <div className="slide">

      <div>
        <Marquee direction="right" speed={70} delay={1}>
          <div className="image_wrapper">
            <img src={img1} alt="" />
          </div>
          <div className="image_wrapper">
            <img src={img2} alt="" />
          </div>
          <div className="image_wrapper">
            <img src={img3} alt="" />
          </div>
          <div className="image_wrapper">
            <img src={img4} alt="" />
          </div>
          <div className="image_wrapper">
            <img src={img5} alt="" />
          </div>
          <div className="image_wrapper">
            <img src={img6} alt="" />
          </div>
          <div className="image_wrapper">
            <img src={img7} alt="" />
          </div>
          <div className="image_wrapper">
            <img src={img8} alt="" />
          </div>
        </Marquee>
      </div>
    </div>
  );
}

export default SlidePage;