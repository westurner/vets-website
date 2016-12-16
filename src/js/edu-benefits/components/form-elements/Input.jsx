import React from 'react';

export default function Input(field) {
  let errorSpan = '';
  let errorSpanId = undefined;
  let inputErrorClass = undefined;
  let labelErrorClass = undefined;
  let maxCharacters = null;
  if (field.meta.error && field.meta.touched) {
    errorSpanId = `${field.input.id}-error-message`;
    errorSpan = <span className="usa-input-error-message" id={`${errorSpanId}`}>{field.meta.error}</span>;
    inputErrorClass = 'usa-input-error';
    labelErrorClass = 'usa-input-error-label';
  }

  // Calculate max characters and display '(Max. XX characters)' when max is hit.
  if (field.input.value && field.inputProps.maxLength) {
    if (field.inputProps.maxLength === field.input.value.length) {
      maxCharacters = (<small>(Max. {field.inputProps.maxLength} characters)</small>);
    }
  }

  // Calculate required.
  let requiredSpan = undefined;
  if (field.required) {
    requiredSpan = <span className="form-required-span">*</span>;
  }
  return (
    <div className={inputErrorClass}>
      <label
          className={field.forceErrorLabel ? 'usa-input-error-label' : labelErrorClass}
          htmlFor={field.inputProps.id}>
            {field.label}
            {requiredSpan}
      </label>
      {errorSpan}
      <input
          {...field.inputProps}
          {...field.input}/>
      {maxCharacters}
    </div>
  );
}
