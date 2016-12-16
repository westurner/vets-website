import React from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import { isNotBlank } from '../../../common/utils/validations';
import Select from './Select';

const isRequired = {
  validator: isNotBlank,
  message: 'Please provide a response'
};

export default class FieldSelect extends React.Component {
  componentWillMount() {
    this.inputId = _.uniqueId('errorable-text-input-');
  }
  render() {
    const { required, options, name, label, validation, emptyDescription } = this.props;
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
          required={required}
          name={name}
          label={label}
          validate={convertedValidations}
          component={Select}
          options={options}
          inputProps={inputProps}
          emptyDescription={emptyDescription}/>
    );
  }
}

FieldSelect.defaultProps = {
  validation: [],
  required: false
};

