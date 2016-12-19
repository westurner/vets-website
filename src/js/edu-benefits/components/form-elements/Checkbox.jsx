import React from 'react';
import _ from 'lodash';

export default function Checkbox(field) {
  let errorSpan = '';
  let errorSpanId = undefined;
  let labelErrorClass = undefined;
  let isValid = true;
  if (field.meta.error && field.meta.touched) {
    isValid = false;
    errorSpanId = `${field.input.id}-error-message`;
    errorSpan = <span className="usa-input-error-message" id={`${errorSpanId}`}>{field.meta.error}</span>;
    labelErrorClass = 'usa-input-error-label';
  }

  // Calculate required.
  let requiredSpan = undefined;
  if (field.required) {
    requiredSpan = <span className="form-required-span">*</span>;
  }

  let className = `form-checkbox${!isValid ? ' usa-input-error' : ''}`;
  if (!_.isUndefined(field.className)) {
    className = `${className} ${field.className}`;
  }

  return (
    <div className={className}>
      <input
          aria-describedby={errorSpanId}
          type="checkbox"
          {...field.inputProps}
          {...field.input}/>
      <label
          className={field.forceErrorLabel ? 'usa-input-error-label' : labelErrorClass}
          htmlFor={field.inputProps.id}>
            {field.label}
            {requiredSpan}
      </label>
      {errorSpan}
    </div>
  );
}
