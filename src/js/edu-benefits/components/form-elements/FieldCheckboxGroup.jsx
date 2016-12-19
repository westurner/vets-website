import React from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import CheckboxGroup from './CheckboxGroup';

const isRequired = {
  validator: val => val && val.length,
  message: 'Please check at least one option'
};

export default class FieldCheckboxGroup extends React.Component {
  componentWillMount() {
    this.inputId = _.uniqueId('errorable-text-input-');
  }
  render() {
    const { required, name, label, validation, options } = this.props;
    const validationList = required ? [isRequired, ...validation] : validation;
    const convertedValidations = validationList.map((val) => (...args) => {
      return !val.validator(...args) ? val.message : null;
    });
    const inputProps = _.assign({
      id: this.inputId,
      autoComplete: false
    }, this.props.inputProps);

    return (
      <Field
          type="select-multiple"
          required={required}
          inputProps={inputProps}
          name={name}
          label={label}
          options={options}
          validate={convertedValidations}
          component={CheckboxGroup}/>
    );
  }
}

FieldCheckboxGroup.defaultProps = {
  validation: [],
  required: false
};
