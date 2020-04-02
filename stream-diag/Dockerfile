FROM ezstream

WORKDIR /data

COPY 440Hz_44100Hz_16bit_05sec.mp3 .
COPY playlist.txt .
COPY ezstream.xml .

RUN chmod 600 /data/ezstream.xml

CMD [ "ezstream", "-c","/data/ezstream.xml" ]
