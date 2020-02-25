import React from 'react';
import { FormattedMessage } from 'react-intl';

import ButtonStyle from './button-style';

const Button = ({ className, buttonText, clicked }) => (
    <ButtonStyle className = {className} onClick={clicked} >
        <FormattedMessage {...buttonText} />
    </ButtonStyle>
);

export default Button;