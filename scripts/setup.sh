#!/usr/bin/env bash

set -e
set -o pipefail

echo 'Running npm install'
npm install

echo 'Starting service on production environment'
npm run start
