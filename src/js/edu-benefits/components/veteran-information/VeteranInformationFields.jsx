import React from 'react';

import FullName from '../form-elements/FullName';
import Gender from '../form-elements/Gender';
import DateOfBirth from '../form-elements/DateOfBirth';
import SocialSecurityNumber from '../form-elements/SocialSecurityNumber';

export default class PersonalInformationFields extends React.Component {
  render() {
    return (
      <fieldset>
        <p>You aren’t required to fill in <strong>all</strong> fields, but VA can evaluate your claim faster if you provide more information.</p>
        <p><span className="form-required-span">*</span>Indicates a required field</p>
        <legend className="hide-for-small-only">Veteran information</legend>
        <div className="input-section">
          <FullName name="veteranFullName" required/>
          <SocialSecurityNumber name="veteranSocialSecurityNumber" required/>
          <DateOfBirth name="veteranDateOfBirth" required/>
          <Gender name="gender"/>
        </div>
      </fieldset>
    );
  }
}
