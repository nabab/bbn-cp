#!/bin/bash

npm run build
npm run pack
git stage ./*
git stage -f ./dist/*
git commit -m "Latest changes"
npm version patch
git stage ./package.json
git commit -m "Latest changes"
git push
npm publish

