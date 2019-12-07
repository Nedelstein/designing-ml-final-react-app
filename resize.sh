#!/bin/bash

for i in resized/president_imgs/*.jpg;
do convert $i -resize "64x64>" resized/"${i////_}";
done;