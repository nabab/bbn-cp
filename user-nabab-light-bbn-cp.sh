#!/bin/bash

rm -rf dist
npm run build
npm run pack
rm -rf ~/web/bbn-cp/v2/dist
rm -rf ~/web/bbn-cp/v2/test
cp -rf dist ~/web/bbn-cp/v2/
cp -rf test ~/web/bbn-cp/v2/
