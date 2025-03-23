#!/bin/bash

npm run build
npm run pack
npm run minify
npm run minify2
git stage ./*
git stage -f ./dist/*
git commit -m "Latest changes"
npm version patch
git stage ./package.json
git commit -m "Latest changes"
git push
npm publish

