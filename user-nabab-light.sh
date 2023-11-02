#!/bin/bash

rm -rf dist
npm run build
npm run pack
rm -rf ~/web/bbn-cp/v2/dist
cp -rf dist ~/web/bbn-cp/v2/


