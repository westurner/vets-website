import React from 'react';

export default function Select(field) {
  let errorSpan = '';
  let errorSpanId = undefined;
  let inputErrorClass = undefined;
  let labelErrorClass = undefined;
  if (field.meta.error && field.meta.touched) {
    errorSpanId = `${field.input.id}-error-message`;
    errorSpan = <span className="usa-input-error-message" id={`${errorSpanId}`}>{field.meta.error}</span>;
    inputErrorClass = 'usa-input-error';
    labelErrorClass = 'usa-input-error-label';
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
          htmlFor={field.id}>
            {field.label}
            {requiredSpan}
      </label>
      {errorSpan}
      <select
          {...field.inputProps}
          {...field.input}>
        <option value="">{field.emptyDescription}</option>
        {field.options.map(option => {
          return typeof option === 'string'
            ? <option key={option} value={option}>{option}</option>
            : <option key={option.value} value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
}
