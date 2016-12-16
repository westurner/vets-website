import React from 'react';
import Scroll from 'react-scroll';

import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import NavButtons from '../components/form-elements/NavButtons.jsx';

import { focusElement } from '../../common/utils/helpers';

function focusForm() {
  const legend = document.querySelector('.form-panel legend');
  if (legend && legend.getBoundingClientRect().height > 0) {
    focusElement(legend);
  } else {
    focusElement('.nav-header');
  }
}

const scrollToFirstError = () => {
  setTimeout(() => {
    const errorEl = document.querySelector('.usa-input-error, .input-error-date');
    if (errorEl) {
      const position = errorEl.getBoundingClientRect().top + document.body.scrollTop;
      Scroll.animateScroll.scrollTo(position - 10, {
        duration: 500,
        delay: 0,
        smooth: true
      });
      focusElement(errorEl);
    }
  }, 100);
};

class FormPage extends React.Component {
  componentDidMount() {
    focusForm();
  }
  componentDidUpdate(prevProps) {
    if (this.props.route.Fields !== prevProps.route.Fields) {
      focusForm();
    }
  }
  render() {
    const name = this.props.route.name;
    const Fields = this.props.route.fieldsComponent;
    const router = this.props.router;
    const formPage = (props) => {
      return (
        <div>
          <div className="form-panel">
            <Fields/>
          </div>
          <NavButtons
              onForward={props.handleSubmit}
              onBack={() => router.push(this.findNeighbor)}/>
        </div>
      );
    };

    const ConnectedPage = reduxForm({
      form: name,
      destroyOnUnmount: false,
      onSubmitFail: scrollToFirstError,
      onSubmit: () => router.push('/benefits-eligibility/benefits-selection')
    })(formPage);
    return <ConnectedPage/>;
  }
}

export default withRouter(FormPage);
