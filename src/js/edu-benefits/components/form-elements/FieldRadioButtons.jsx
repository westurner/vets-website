import React from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';
import { isNotBlank } from '../../../common/utils/validations';
import RadioButtons from './RadioButtons';

const isRequired = {
  validator: isNotBlank,
  message: 'Please provide a response'
};

export default class FieldRadioButtons extends React.Component {
  componentWillMount() {
    this.inputId = _.uniqueId('errorable-text-input-');
  }
  render() {
    const { required, options, name, label, validation, emptyDescription } = this.props;
    const validationList = required ? [isRequired, ...validation] : validation;
    const convertedValidations = validationList.map((val) => (...args) => {
      return !val.validator(...args) ? val.message : null;
    });

    return (
      <Field
          required={required}
          id={this.inputId}
          name={name}
          label={label}
          validate={convertedValidations}
          component={RadioButtons}
          options={options}
          emptyDescription={emptyDescription}/>
    );
  }
}

FieldRadioButtons.defaultProps = {
  validation: [],
  required: false
};

