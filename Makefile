.PHONY: all factory station

all: factory 
	docker-compose build

factory:
	docker build -t alpine-builder -f build/alpine.Dockerfile ./build
	docker build -t debian-builder -f build/debian.Dockerfile ./build
