PHONY=build docker-image docker-push

build:
	npm run build

docker-image:
	docker build -t usox/uxmp-ui .

docker-push: 
	docker push usox/uxmp-ui:latest

all:
