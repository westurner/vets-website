#!/bin/bash

set -e

echo $0
echo $1

if [[ $1 == "build" ]]
then
  time npm run build -- --buildtype $BUILDTYPE;
elif [[ $1 == "check" ]]
then
  time nsp check
else
  time npm run $1;
fi

echo "Done ($1)."
