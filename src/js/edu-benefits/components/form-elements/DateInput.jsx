import React from 'react';
import moment from 'moment';
import _ from 'lodash/fp';
import { months, days } from '../../../common/utils/options-for-select.js';
import Select from './Select';
import Input from './Input';

function parseDate(date) {
  if (date) {
    return JSON.parse(date);
  }
  return {
    month: '',
    day: '',
    year: ''
  };
}

function serializeDate(date) {
  return JSON.stringify(date);
}

export default class DateInput extends React.Component {
  constructor() {
    super();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.touched = { month: false, year: false, day: false };
  }
  handleBlur(field) {
    this.touched[field] = true;
    if (this.touched.month && this.touched.day && this.touched.year) {
      this.props.input.onBlur(this.props.input.value);
    }
  }
  handleChange(field, event) {
    this.touched[field] = true;
    const dateField = parseDate(this.props.input.value);
    this.props.input.onChange(serializeDate(_.set(field, event.target.value, dateField)));
  }
  render() {
    const field = this.props;
    const value = parseDate(this.props.input.value);
    let errorSpan;
    let isValid = true;
    if (field.meta.error && field.meta.touched) {
      isValid = false;
      const errorSpanId = `${field.id}-error-message`;
      errorSpan = <span className="usa-input-error-message" id={`${errorSpanId}`}>{field.meta.error}</span>;
    }

    let daysForSelectedMonth = [];
    if (value.month) {
      daysForSelectedMonth = days[value.month];
    }

    return (
      <div className={!isValid && 'input-error-date'}>
        <label>
          {field.label || 'Date of birth'}
          {field.required && <span className="form-required-span">*</span>}
        </label>
        {errorSpan}
        <div className={isValid ? undefined : 'usa-input-error form-error-date'}>
          <div className="usa-date-of-birth row">
            <div className="form-datefield-month">
              <Select
                  label="Month"
                  name="month"
                  options={months}
                  forceErrorLabel={!isValid}
                  inputProps={{
                    id: `${field.id}-mont`,
                    autoComplete: 'false',
                  }}
                  input={{
                    value: value.month,
                    onBlur: () => this.handleBlur('month'),
                    onChange: (val) => this.handleChange('month', val)
                  }}
                  meta={{}}/>
            </div>
            <div className="form-datefield-day">
              <Select
                  label="Day"
                  name="day"
                  forceErrorLabel={!isValid}
                  inputProps={{
                    id: `${field.id}-day`,
                    autoComplete: 'false',
                  }}
                  input={{
                    value: value.day,
                    onBlur: () => this.handleBlur('day'),
                    onChange: (val) => this.handleChange('day', val)
                  }}
                  options={daysForSelectedMonth}
                  meta={{}}/>
            </div>
            <div className="usa-datefield usa-form-group usa-form-group-year">
              <Input
                  label="Year"
                  name="year"
                  forceErrorLabel={!isValid}
                  inputProps={{
                    id: `${field.id}-year`,
                    type: 'number',
                    autoComplete: 'false',
                    max: moment().add(100, 'year').year(),
                    min: '1900',
                    pattern: '[0-9]{4}',
                  }}
                  input={{
                    value: value.year,
                    onBlur: () => this.handleBlur('year'),
                    onChange: (val) => this.handleChange('year', val)
                  }}
                  meta={{}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
