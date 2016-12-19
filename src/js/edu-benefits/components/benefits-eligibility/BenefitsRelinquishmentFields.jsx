import React from 'react';
import _ from 'lodash/fp';
import moment from 'moment';

import { isValidRelinquishedDate } from '../../utils/validations';
import { relinquishableBenefits } from '../../utils/options-for-select';
import { showRelinquishedEffectiveDate } from '../../utils/helpers';

import FieldDate from '../form-elements/FieldDate';
import FieldRadioButtons from '../form-elements/FieldRadioButtons';

export default class BenefitsRelinquishmentFields extends React.Component {
  static formDataSelector(formState) {
    return {
      benefitsRelinquished: _.get('benefitsRelinquishment.values.benefitsRelinquished', formState),
      benefitsChosen: _.get('benefitsSelection.values.benefitsChosen', formState)
    };
  }
  static getInitialValues() {
    const today = moment();
    return {
      benefitsRelinquishedDate: JSON.stringify({
        month: (today.month() + 1).toString(),
        day: today.date().toString(),
        year: today.year().toString()
      })
    };
  }
  render() {
    const { benefitsRelinquished, benefitsChosen } = this.props;
    const choseChapter33 = benefitsChosen && benefitsChosen.some(ben => ben === 'chapter33');
    const dateFields = (
      <div>
        <FieldDate required={showRelinquishedEffectiveDate(benefitsRelinquished)}
            validation={[{
              validator: (field) => isValidRelinquishedDate(field, showRelinquishedEffectiveDate(benefitsRelinquished)),
              message: 'Date cannot be earlier than 2 years ago'
            }]}
            label="Effective date"
            name="benefitsRelinquishedDate"/>
        <div>
          <ul>
            <li>Use today’s date unless you aren’t going to use your Post 9/11 GI Bill benefits until later.</li>
            <li>If you pick a future date, you can’t get benefits until then.</li>
            <li>If your classes started less than 2 years ago, enter the date they began.</li>
          </ul>
        </div>
      </div>
    );

    // nest DateInputs inside radio buttons
    const options = relinquishableBenefits.map((benefit) => {
      const option = Object.assign({}, benefit);
      if (benefit.value !== 'unknown') {
        if (benefit.additional) {
          option.additional = (
            <div>
              <div className="usa-alert usa-alert-warning usa-content secondary">
                <div className="usa-alert-body">
                  <span>{benefit.additional}</span>
                </div>
              </div>
              {dateFields}
            </div>
          );
        } else {
          option.additional = dateFields;
        }
      }
      return option;
    });

    return (<fieldset>
      <legend>Benefits relinquishment</legend>
      <p><span className="form-required-span">*</span>Indicates a required field</p>
      <div className="input-section">
        <p>Because you chose to apply for your Post-9/11 benefit, you have to relinquish (give up) 1 other benefit you may be eligible for. <br/> <strong>Your decision is irrevocable</strong> (you can’t change your mind).</p>
        <fieldset className="edu-benefits-info-no-icon">
          <FieldRadioButtons
              required={choseChapter33}
              label="I choose to give up:"
              name="benefitsRelinquished"
              options={options}/>
        </fieldset>
        <p>If you have questions or don’t understand the choice, talk to a specialist at 1-888-442-4551 (1-888-GI-BILL-1) from 8:00 a.m. - 7:00 p.m. ET Mon - Fri.</p>
      </div>
    </fieldset>
    );
  }
}
