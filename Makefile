PHONY=build docker-image docker-push lint

build:lint
	npm run build

docker-image:build
	docker build -t usox/uxmp-ui .

docker-push: 
	docker push usox/uxmp-ui:latest

lint:
	npx eslint --fix

all:
