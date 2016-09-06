#!/bin/bash
#
# This script is triggered by `./travis.yml` for TravisCI builds. It executes the
# proper test and build depending on the given $TRAVIS_BRANCH and $TEST_SUITE.
#
# `development` pushes and PR builds will use the development build type, and will
# run unit tests and e2e tests.
#
# `staging` pushes will use the production build type, and will run all test suites,
# including accessibility tests.
#
# `production` pushes will use the production build type, and will run unit tests
# and e2e tests.

set -e

# If we're running the security suite, do it and exit

if [[ $TEST_SUITE == 'security' ]]
then
  npm install -g nsp
  nsp check
  exit $?
fi

# Run lint and perform a build

npm run lint

if [[ $TRAVIS_BRANCH == 'staging' || $TRAVIS_BRANCH == 'production' ]]
then
  npm run build -- --buildtype production;
else
  npm run build;
fi

# And run the selected test suite

if [[ $TEST_SUITE == 'unit' ]]
then
  npm run test:unit;
fi

if [[ $TEST_SUITE == 'nightwatch' ]]
then
  npm run selenium:bootstrap;
  npm run test:e2e;
fi

# Add accessibility tests if we're on staging

if [[ $TEST_SUITE == 'nightwatch' && $TRAVIS_BRANCH == 'staging' ]]
then
  npm run test:accessibility;
fi

