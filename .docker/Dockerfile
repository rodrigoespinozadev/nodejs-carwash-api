FROM node:alpine
RUN apk update
RUN apk --no-cache add --virtual builds-deps build-base python
WORKDIR /usr/src/app
EXPOSE 3000
CMD [ "node" ]