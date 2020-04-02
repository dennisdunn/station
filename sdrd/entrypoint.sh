#!/bin/sh

#rtl_fm -f 102900000 |  socat -u - TCP-LISTEN:9001,fork
#rtl_fm -f 102900000 | sox -traw -r24k -es -b16 -c1 -V1 - -tmp3 - | socat -u - TCP-LISTEN:9001,fork
rtl_fm -f 89.9M -M wbfm | ices2 ices.xml
