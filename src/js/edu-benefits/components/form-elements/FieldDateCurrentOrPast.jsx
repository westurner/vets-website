import React from 'react';
import { isValidDate } from '../../../common/utils/validations';
import FieldDate from './FieldDate';

const validations = [{
  validator: (date) => {
    if (date) {
      const { month, day, year } = JSON.parse(date);
      return isValidDate(month, day, year);
    }
    return true;
  },
  message: 'Please enter a valid date in the past'
}];

export default function FieldDateCurrentOrPast(props) {
  const validationList = props.validations ? validations.concat(props.validations) : validations;
  return (
    <FieldDate
        {...props}
        validation={validationList}/>
  );
}
