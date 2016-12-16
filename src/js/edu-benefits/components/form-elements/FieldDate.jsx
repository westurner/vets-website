import React from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import DateInput from './DateInput';
import { isValidPartialDate } from '../../../common/utils/validations';

const isRequired = {
  validator: (date) => {
    if (date) {
      const dateObj = JSON.parse(date);
      return dateObj.month && dateObj.year && dateObj.day;
    }
    return false;
  },
  message: 'Please provide a response'
};

const isPartialDate = {
  validator: (date) => {
    if (date) {
      const dateObj = JSON.parse(date);
      return isValidPartialDate(dateObj.month, dateObj.day, dateObj.year);
    }
    return false;
  },
  message: 'Please provide a valid date'
};
export default class FieldDate extends React.Component {
  componentWillMount() {
    this.inputId = _.uniqueId('field-input-');
  }
  render() {
    const { required, name, label, validation } = this.props;
    const validationList = required ? [isRequired, isPartialDate].concat(validation) : [isPartialDate].concat(validation);
    const convertedValidations = validationList.map((val) => (...args) => {
      return !val.validator(...args) ? val.message : null;
    });

    return (
      <Field
          id={this.inputId}
          required={required}
          name={name}
          label={label}
          validate={convertedValidations}
          component={DateInput}/>
    );
  }
}

FieldDate.defaultProps = {
  validation: [],
  required: false,
  name: 'date'
};
