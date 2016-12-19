import React from 'react';

import BenefitsChosen from '../form-elements/BenefitsChosen';

export default class BenefitsSelectionFields extends React.Component {
  render() {
    return (<fieldset>
      <legend className="hide-for-small-only">Benefits eligibility</legend>
      <p><span className="form-required-span">*</span>Indicates a required field</p>
      <div className="input-section">
        <div className="usa-alert usa-alert-info">
          <div className="usa-alert-body">
            <ul>
              <li>You may be eligible for more than 1 education benefit program.</li>
              <li>You can only get payments from 1 program at a time.</li>
              <li>You can’t get more than 48 months of benefits under any combination of VA education programs.</li>
            </ul>
          </div>
        </div>
        <BenefitsChosen name="benefitsChosen" required/>
      </div>
    </fieldset>
    );
  }
}
