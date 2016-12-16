import React from 'react';
import { binaryGenders } from '../../utils/options-for-select';
import FieldRadioButtons from './FieldRadioButtons';

export default function Gender(props) {
  return (
    <FieldRadioButtons
        {...props}/>
  );
}

Gender.defaultProps = {
  name: 'gender',
  label: 'Gender',
  options: binaryGenders
};
