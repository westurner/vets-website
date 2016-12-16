import React from 'react';
import { FormSection } from 'redux-form';
import FieldInput from './FieldInput';
import FieldSelect from './FieldSelect';
import { suffixes } from '../../../common/utils/options-for-select';

export default function FullName({ name, required, validation }) {
  return (
    <FormSection name={name}>
      <FieldInput
          name="first"
          validation={validation.first}
          required={required}
          label="First name"
          inputProps={{
            maxLength: 30,
            autoComplete: 'given-name'
          }}/>
      <FieldInput
          name="middle"
          validation={validation.middle}
          label="Middle name"
          inputProps={{
            maxLength: 30,
            autoComplete: 'additional-name'
          }}/>
      <FieldInput
          name="last"
          validation={validation.last}
          required={required}
          label="Last name"
          inputProps={{
            maxLength: 30,
            autoComplete: 'family-name'
          }}/>
      <FieldSelect
          name="suffix"
          options={suffixes}
          validation={validation.suffix}
          label="Suffix"
          inputProps={{
            autoComplete: 'false',
            className: 'form-select-medium'
          }}/>
    </FormSection>
  );
}

FullName.defaultProps = {
  name: 'name',
  validation: {}
};
