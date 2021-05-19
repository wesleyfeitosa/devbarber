import React from 'react';

import StarFull from '../../assets/star.svg';
import StarHalf from '../../assets/star_half.svg';
import StarEmpty from '../../assets/star_empty.svg';

import {StarArea, StarView, StarText} from './styles';

function Stars({stars, showNumber}) {
  let starsArray = [0, 0, 0, 0, 0];

  starsArray = starsArray.map((_, index) =>
    index < stars ? (stars - index >= 1 ? 2 : 1) : 0,
  );

  return (
    <StarArea>
      {starsArray.map((star, index) => (
        <StarView key={index}>
          {star === 0 && <StarEmpty width="18" height="18" fill="#ff9200" />}

          {star === 1 && <StarHalf width="18" height="18" fill="#ff9200" />}

          {star === 2 && <StarFull width="18" height="18" fill="#ff9200" />}
        </StarView>
      ))}
      {showNumber && <StarText>{stars}</StarText>}
    </StarArea>
  );
}

export {Stars};
