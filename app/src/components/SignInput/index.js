import React from 'react';

import {InputArea, Input} from './styles';

function SignInput({iconSvg: IconSvg, ...rest}) {
  return (
    <InputArea>
      <IconSvg widht="24" height="24" fill="#268596" />
      <Input placeholderTextColor="#238596" {...rest} />
    </InputArea>
  );
}

export {SignInput};
