import React from 'react';
import TabNav from '../components/TabNav';
import AskVAQuestions from '../components/AskVAQuestions';
import Loading from '../components/Loading';

export default class ClaimDetailLayout extends React.Component {
  render() {
    const { claim, loading, message } = this.props;

    let content;
    if (!loading) {
      content = (
        <div className="claim-container">
          {message}
          <div className="claim-conditions">
            <h1>Your {"Compensation"} Claim</h1>
            <h6>Your Claimed Conditions:</h6>
            <p className="list">
              {claim.attributes.contentionList
                ? claim.attributes.contentionList.join(', ')
                : null}
            </p>
          </div>
          <TabNav id={this.props.claim.id}/>
          <div className="va-tab-content">
            {this.props.children}
          </div>
        </div>
      );
    } else {
      content = <Loading/>;
    }

    return (
      <div className="row">
        <div className="small-12 medium-8 columns usa-content">
          <div name="topScrollElement"></div>
          {content}
        </div>
        <AskVAQuestions/>
      </div>
    );
  }
}

ClaimDetailLayout.propTypes = {
  claim: React.PropTypes.object,
  loading: React.PropTypes.bool,
  message: React.PropTypes.node
};
