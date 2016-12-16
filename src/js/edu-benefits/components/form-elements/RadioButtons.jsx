import React from 'react';
import _ from 'lodash';

import ExpandingGroup from '../../../common/components/form-elements/ExpandingGroup';

export default function RadioButtons({ id, required, options, input, label, meta: { error, touched } }) {
  let errorSpan = '';
  let errorSpanId = undefined;
  let isValid = true;
  if (error && touched) {
    isValid = false;
    errorSpanId = `${id}-error-message`;
    errorSpan = <span className="usa-input-error-message" id={`${errorSpanId}`}>{error}</span>;
  }

  // Calculate required.
  let requiredSpan = undefined;
  if (required) {
    requiredSpan = <span className="form-required-span">*</span>;
  }

  const value = input.value;
  const optionElements = options.map((obj, index) => {
    let optionLabel;
    let optionValue;
    let optionAdditional;
    if (_.isString(obj)) {
      optionLabel = obj;
      optionValue = obj;
    } else {
      optionLabel = obj.label;
      optionValue = obj.value;
      if (obj.additional) {
        optionAdditional = (<div>{obj.additional}</div>);
      }
    }
    const checked = value === optionValue;
    const radioButton = (
      <div key={optionAdditional ? undefined : index} className="form-radio-buttons">
        <input
            autoComplete="false"
            checked={checked}
            id={`${id}-${index}`}
            name={`${name}-${index}`}
            type="radio"
            value={optionValue}
            onChange={evt => input.onChange(evt.target.value)}/>
        <label htmlFor={`${id}-${index}`}>
          {optionLabel}
        </label>
      </div>
    );

    let output = radioButton;

    // Return an expanding group for buttons with additional content
    if (optionAdditional) {
      output = (
        <ExpandingGroup
            additionalClass="form-expanding-group-active-radio"
            open={checked}
            key={index}>
          {radioButton}
          <div>{optionAdditional}</div>
        </ExpandingGroup>
      );
    }

    return output;
  });

  return (
    <div className={!isValid ? 'usa-input-error' : ''}>
      <label
          className={!isValid ? 'usa-input-error-label' : undefined}
          htmlFor={id}>
          {label}
          {requiredSpan}
      </label>
      {errorSpan}
      {optionElements}
    </div>
  );
}
