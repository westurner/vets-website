import React from 'react';

class IntroductionPage extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="small-12 columns">
            <h3>Apply online for education benefits</h3>
          </div>
        </div>

        <div className="row">
          <div className="small-12 columns">
            <p>Fill out as many blocks in the application as you can. Please be as specific as possible. VA uses this information to determine whether you are eligible for education benefits.</p>
            <p>You will not be able to save your work or come back later to finish, so have this information handy when you begin:</p>
            <ul className="edu-benefits-list">
              <li>Paperwork related to your military, education, and employment history (such as your DD214)</li>
              <li>Whether you are eligible for the specific education program you are applying for</li>
              <li>Which school you want to attend and what you want to study</li>
            </ul>
            <p>This online application is based on VA Form 22-1990.</p>
            <div className="usa-alert usa-alert-info">
              <div className="usa-alert-body">
                <strong>Note:</strong> According to federal law, there are criminal penalties, including a fine and/or imprisonment for up to 5 years, for withholding information or for providing incorrect information. (See 18 U.S.C. 1001)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default IntroductionPage;
