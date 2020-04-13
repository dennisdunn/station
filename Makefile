.PHONY: all factory station

all: factory 
	docker-compose build

factory:
	docker build -t alpine-builder -f images/alpine.Dockerfile ./images
	docker build -t debian-builder -f images/debian.Dockerfile ./images
