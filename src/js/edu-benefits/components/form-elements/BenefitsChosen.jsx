import React from 'react';
import FieldCheckboxGroup from './FieldCheckboxGroup';

const options = [
  {
    label: <p>Post-9/11 GI Bill (Chapter 33)<br/><a href="/education/gi-bill/post-9-11/" target="_blank">Learn more</a></p>,
    value: 'chapter33',
    expanded: (
      <div className="edu-benefits-chapter33-extra">
        <p>When you choose to apply for your Post-9/11 benefit, you have to relinquish (give up) 1 other benefit you may be eligible for. You’ll make this decision on the next page.</p>
      </div>
    )
  },
  {
    label: <p>Montgomery GI Bill (MGIB-AD, Chapter 30)<br/><a href="/education/gi-bill/montgomery-active-duty/" target="_blank">Learn more</a></p>,
    value: 'chapter30'
  },
  {
    label: <p>Montgomery GI Bill Selected Reserve (MGIB-SR, Chapter 1606)<br/><a href="/education/gi-bill/montgomery-selected-reserve/" target="_blank">Learn more</a></p>,
    value: 'chapter1606'
  },
  {
    label: <p>Post-Vietnam Era Veterans' Educational Assistance Program<br/>(VEAP, Chapter 32)<br/><a href="/education/other-educational-assistance-programs/veap/" target="_blank">Learn more</a></p>,
    value: 'chapter32'
  }
];

export default function BenefitsChosen({ name, required }) {
  return (
    <FieldCheckboxGroup
        required={required}
        options={options}
        name={name}
        label="Select the benefit that is the best match for you."/>
  );
}

BenefitsChosen.defaultProps = {
  required: false,
  name: 'benefitsChosen'
};
