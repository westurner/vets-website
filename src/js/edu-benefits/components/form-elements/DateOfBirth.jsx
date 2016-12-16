import React from 'react';
import FieldDateCurrentOrPast from '../form-elements/FieldDateCurrentOrPast';

import { isValidDateOver17 } from '../../../common/utils/validations';
import { withParsedDate } from '../../utils/validations';

export default function DateOfBirth(props) {
  return (
    <FieldDateCurrentOrPast
        {...props}
        validations={[{
          validator: withParsedDate(isValidDateOver17),
          message: props.ageMessage
        }]}/>
  );
}

DateOfBirth.defaultProps = {
  name: 'veteranDateOfBirth',
  label: 'Date of birth',
  ageMessage: 'You must be at least 17 to apply for benefits'
};
