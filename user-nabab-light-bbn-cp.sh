#!/bin/bash

rm -rf dist
npm run build
npm run build2
npm run pack
