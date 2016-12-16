import React from 'react';
import FieldInput from './FieldInput';
import { isValidSSN } from '../../../common/utils/validations';

const ssnValidation = [{
  validator: isValidSSN,
  message: 'Please enter a valid SSN (nine digits, may include dashes)'
}];

export default function SocialSecurityNumber({ label, name, required, validation }) {
  return (
    <FieldInput
        name={name}
        validation={ssnValidation.concat(validation)}
        required={required}
        label={label}
        inputProps={{
          className: 'usa-input-medium'
        }}/>
  );
}

SocialSecurityNumber.defaultProps = {
  name: 'ssn',
  label: 'Social Security Number',
  validation: []
};
