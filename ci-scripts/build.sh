#!/bin/bash
set -e

echo "awd-ng lib build: started"
npm run build:awd-ng-lib --prefix ./awd/awd-ng/
echo "awd-ng lib build: completed"


echo "awd-ng learners-point-app build: started"
npm run build:learners-point-app --prefix ./awd/awd-ng/
echo "awd-ng learners-point-app build: completed"



if [ $? -ne 0 ]
then
    exit 1
fi

echo "creating the awd-ng-lib folder"
mkdir ./awd/awd-ng-lib/
echo "moving lib into awd-ng-lib"
cp -r ./awd/awd-ng/dist/awd-ng-lib/* ./awd/awd-ng-lib/




echo "creating learners-point (wsmgtcns) destination folder"
mkdir ./awd/wsmgtcns
echo "moving management-console dist folder to destination(wsmgtcns) folder"
cp -r ./awd/awd-ng/dist/learners-point-app/* ./awd/wsmgtcns/