import React from 'react';
import Scroll from 'react-scroll';

import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import NavButtons from '../components/form-elements/NavButtons.jsx';

import { focusElement, getNextPage, getPreviousPage } from '../../common/utils/helpers';
import { pages } from '../routes';

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

const formPage = (fieldsComponent, getState, path, router) => (props) => {
  const Fields = fieldsComponent;
  return (
    <div>
      <div className="form-panel">
        <Fields/>
      </div>
      <NavButtons
          onForward={props.handleSubmit}
          onBack={() => router.push(getPreviousPage(getState().form, path, pages))}/>
    </div>
  );
};

class FormPage extends React.Component {
  componentDidMount() {
    focusForm();
  }
  componentWillReceiveProps(newProps) {
    if (this.props.route.name !== newProps.route.name) {
      this.connectedPage = null;
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.route.Fields !== prevProps.route.Fields) {
      focusForm();
    }
  }
  render() {
    // Yes, this is hack
    const getState = this.context.store.getState;
    const formName = this.props.route.form;
    const router = this.props.router;
    // Doing this to cache the component so it doesn't re-render too much
    if (!this.connectedPage) {
      this.connectedPage = reduxForm({
        form: formName,
        destroyOnUnmount: false,
        onSubmitFail: scrollToFirstError,
        onSubmit: () => router.push(getNextPage(getState().form, this.props.route.path, pages))
      })(formPage(this.props.route.fieldsComponent, getState, this.props.route.path, router));
    }
    const ConnectedPage = this.connectedPage;
    return <ConnectedPage/>;
  }
}

FormPage.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default withRouter(FormPage);
