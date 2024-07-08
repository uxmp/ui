FROM nginx:mainline-alpine-slim

WORKDIR /usr/share/nginx/html
ADD dist/ .
ADD ./resource/docker/nginx.conf /etc/nginx/conf.d/default.conf
