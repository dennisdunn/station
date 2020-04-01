FROM ezstream

WORKDIR /data

COPY 440Hz_44100Hz_16bit_05sec.mp3 .
COPY playlist.m3u .
COPY ezstream.xml .

RUN chmod 644 *; \
    chmod 640 *.xml

