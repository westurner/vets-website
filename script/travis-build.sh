#!/bin/bash
#
# This script is triggered by `./travis.yml` for TravisCI builds. It executes the
# proper test and build depending on the given $TRAVIS_BRANCH.
#
# Since there are minor differences between the production and development build
# types, both types are built and tested with unit and e2e tests. The accessibility
# test suite will run over master, staging and production branches, but will only
# prevent merges to staging and production.

set -e

# Set source timestamps equal to their git modified dates
# This is necessary for hard-source-plugin to work.
for FILE in $(git ls-files)
do
    TIME=$(git log --pretty=format:%cd -n 1 --date=iso $FILE)
    TIME=$(date -j -f '%Y-%m-%d %H:%M:%S %z' "$TIME" +%Y%m%d%H%M.%S)
    touch -m -t $TIME $FILE
done

# Run package security checks
npm install -g nsp
nsp check

# Run lint and perform a build
npm run lint;
npm run build -- --buildtype $BUILDTYPE;

# Run unit tests
npm run test:unit;

# Bootstrap selenium for all nightwatch-based tests
# npm run selenium:bootstrap;

# Run end to end tests
# npm run test:e2e;

# Run accessibility tests for master, staging, and production
if [[ $TRAVIS_BRANCH == 'staging' ||
      $TRAVIS_BRANCH == 'production' ]]
then
  npm run test:accessibility;
fi
