import React from 'react';
import Scroll from 'react-scroll';

import { getActivePages } from '../../../common/utils/helpers';

import ProgressButton from '../../../common/components/form-elements/ProgressButton';

const scroller = Scroll.scroller;

const scrollToTop = () => {
  scroller.scrollTo('topScrollElement', {
    duration: 500,
    delay: 0,
    smooth: true,
  });
};

export default class NavButtons extends React.Component {
  constructor(props) {
    super(props);
    this.goForward = this.goForward.bind(this);
  }
  goForward() {
    this.props.onForward();
  }
  render() {
    const backButton = (
      <ProgressButton
          onButtonClick={this.props.onBack}
          buttonText="Back"
          buttonClass="usa-button-outline"
          beforeText="«"/>
    );

    const nextButton = (
      <ProgressButton
          onButtonClick={this.goForward}
          buttonText="Continue"
          buttonClass="usa-button-primary"
          afterText="»"/>
    );

    const buttons = (
      <div className="row form-progress-buttons">
        <div className="small-6 medium-5 columns">
          {backButton}
        </div>
        <div className="small-6 medium-5 end columns">
          {nextButton}
        </div>
      </div>
    );

    return buttons;
  }
}

