import React, { useEffect, useState } from 'react';
import times from 'lodash/times';
import Marquee from 'react-marquee-slider';
import { withSize } from 'react-sizeme';
import { uuid } from 'uuidv4';
import { FullWidth, Photo } from './SlidePageElements';

import photo1 from '../../images/photo1.svg';
import photo2 from '../../images/photo2.svg';
import photo3 from '../../images/photo3.svg';
import photo4 from '../../images/photo4.svg';
import photo5 from '../../images/photo5.svg';
import photo6 from '../../images/photo6.svg';
import photo7 from '../../images/photo7.svg';
import photo8 from '../../images/photo8.svg';

const photos = [
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
  photo6,
  photo7,
  photo8,
];

function People({ size }) {
  const [key, setKey] = useState(uuid());

  useEffect(() => {
    setKey(uuid());
  }, [size, size.width]);

  let scale = 0.5;

  if (size && size.width > 800) {
    scale = 0.65;
  }

  if (size && size.width > 1100) {
    scale = 0.8;
  }

  if (size && size.width > 1400) {
    scale = 1;
  }

  return (
    <FullWidth>
      <div style={{ height: scale * 300 }}>
        <Marquee key={key} velocity={25}>
          {times(4, Number).map((id) => (
            <Photo src={photos[id]} alt="" key={`marquee-example-people-${id}`} scale={scale} />
          ))}
        </Marquee>
      </div>

      <div style={{ height: scale * 60 }} />

      <div style={{ height: scale * 300 }}>
        <Marquee key={key} velocity={25}>
          {times(4, Number).map((id) => (
            <Photo
              src={photos[id + 4]}
              alt=""
              key={`marquee-example-people-${id + 7}`}
              offset="true"
              scale={scale}
            />
          ))}
        </Marquee>
      </div>
    </FullWidth>
  );
}

export default withSize()(People);
