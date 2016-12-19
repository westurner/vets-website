import React from 'react';
import Checkbox from './Checkbox';
import ExpandingGroup from '../../../common/components/form-elements/ExpandingGroup';

export default function CheckboxGroup(field) {
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

  const handleChange = (checked, value) => {
    if (checked) {
      field.input.onChange(field.input.value.concat(value));
    } else {
      field.input.onChange(field.input.value.filter(val => val !== value));
    }
  };

  return (
    <div className={inputErrorClass}>
      <label
          className={field.forceErrorLabel ? 'usa-input-error-label' : labelErrorClass}
          htmlFor={field.inputProps.id}>
            {field.label}
            {requiredSpan}
      </label>
      {errorSpan}
      {field.options.map((option, index) => {
        const checked = field.input.value.some(val => val === option.value);
        const checkbox = (<Checkbox
            key={option.expanded ? undefined : index}
            label={option.label}
            input={{
              checked,
              onChange: (event) => handleChange(event.target.checked, option.value)
            }}
            inputProps={{
              autoComplete: false,
              id: `${field.id}-${index}`
            }}
            meta={{}}/>
        );

        if (option.expanded) {
          return (
            <ExpandingGroup key={index} open={checked} additionalClass="edu-benefits-selection-group">
              {checkbox}
              {option.expanded}
            </ExpandingGroup>
          );
        }

        return checkbox;
      })}
    </div>
  );
}
