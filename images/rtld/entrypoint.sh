#!/bin/sh

rtl_fm -f 102900000 | sox -traw -r24k -es -b16 -c1 -V1 - -tmp3 - | socat -u - TCP-LISTEN:9001,fork
