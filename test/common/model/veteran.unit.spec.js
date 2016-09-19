const chai = require('chai');
chai.should();

const veteran = require('../../../src/js/common/model/veteran');
const applicationSchema = require('../../../src/js/hca/schema/application');
const validate = require('../../../src/js/common/model/schema/validator').compile(applicationSchema);
const fakeApplication = require('../../../src/hca-migrate/test/data/fake-application.json');

// This is a trivial test that shows the CI system is sane.
describe('Veteran model', () => {
  describe('veteranToApplication', () => {
    it('completeVeteran translates exactly to fake-application.json.', () => {
      const application = JSON.parse(veteran.veteranToApplication(veteran.completeVeteran));
      const valid = validate(application);
      chai.assert.isTrue(valid, JSON.stringify([validate.errors, application], null, 2));
      application.should.deep.eql(fakeApplication);
    });
  });
});
