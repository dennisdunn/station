.PHONY: all debian alpine ezstream run

all: debian alpine ezstream docker-compose.yml
	docker-compose build

debian: base/debian/Dockerfile
	docker build -t debian-builder base/debian

alpine: base/alpine/Dockerfile
	docker build -t alpine-builder base/alpine

ezstream: alpine base/ezstream/Dockerfile
	docker build -t ezstream base/ezstream
