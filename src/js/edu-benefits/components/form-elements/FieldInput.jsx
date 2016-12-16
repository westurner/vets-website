import React from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import Input from './Input';

const isRequired = {
  validator: val => !!val,
  message: 'Please provide a response'
};

export default class FieldInput extends React.Component {
  componentWillMount() {
    this.inputId = _.uniqueId('errorable-text-input-');
  }
  render() {
    const { required, name, label, validation } = this.props;
    const validationList = required ? [isRequired, ...validation] : validation;
    const convertedValidations = validationList.map((val) => (...args) => {
      return !val.validator(...args) ? val.message : null;
    });
    const inputProps = _.assign({
      id: this.inputId,
      autoComplete: false,
      type: 'text'
    }, this.props.inputProps);

    return (
      <Field
          required={required}
          inputProps={inputProps}
          name={name}
          label={label}
          validate={convertedValidations}
          component={Input}/>
    );
  }
}

FieldInput.defaultProps = {
  validation: [],
  required: false
};
