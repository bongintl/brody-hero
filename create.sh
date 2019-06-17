#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "What?"
    read name
  else
    name=$1
fi

git clone https://github.com/simonsweeney/second_base.git _"$name"
cd _"$name"
pnpm install