import React from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import DateInput from './DateInput';
import { isValidPartialDate } from '../../../common/utils/validations';

function parseDate(date) {
  if (date) {
    return JSON.parse(date);
  }

  return {
    month: '',
    day: '',
    year: ''
  };
}

const isRequired = {
  validator: ({ month, day, year }) => !!month && !!day && !!year,
  message: 'Please provide a response'
};

const isPartialDate = {
  validator: ({ month, day, year }) => isValidPartialDate(month, day, year),
  message: 'Please provide a valid date'
};

export default class FieldDate extends React.Component {
  componentWillMount() {
    this.inputId = _.uniqueId('field-input-');
  }
  render() {
    const { required, name, label, validation } = this.props;
    const validationList = required ? [isRequired, isPartialDate].concat(validation) : [isPartialDate].concat(validation);
    const convertedValidations = validationList.map((val) => (field, ...args) => {
      return !val.validator(parseDate(field), ...args) ? val.message : null;
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
