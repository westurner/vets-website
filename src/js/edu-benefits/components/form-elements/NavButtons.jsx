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
    this.handleContinue = this.handleContinue.bind(this);
    this.findNeighbor = this.findNeighbor.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }
  handleContinue(data) {
    const nextPath = this.findNeighbor(data, 1);
    this.props.onNavigate(nextPath);
    scrollToTop();
    // scrollToFirstError();
  }
  goBack() {
    this.props.onNavigate(this.findNeighbor(-1));
    scrollToTop();
  }
  goForward() {
    this.props.onForward();
  }
  findNeighbor(data, increment) {
    const { pages, path } = this.props;
    const filtered = getActivePages(pages, data);
    const currentIndex = filtered.map(page => page.name).indexOf(path);
    const index = currentIndex + increment;
    return filtered[index].name;
  }
  render() {
    const backButton = (
      <ProgressButton
          onButtonClick={this.goBack}
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

