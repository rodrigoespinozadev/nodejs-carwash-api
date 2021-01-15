FROM node:alpine

RUN apk update \ 
		&& apk add --no-cache --virtual builds-deps build-base python

ARG DATABASE_CONNECTION=""
ENV DATABASE_CONNECTION=$DATABASE_CONNECTION
ENV GOOGLE_CLOUD_PROJECT=
ENV GOOGLE_APPLICATION_CREDENTIALS=
ENV ONESIGNAL_APP_ID=""
ENV ONESIGNAL_API_KEY=""

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm rebuild bcrypt --build-from-source
EXPOSE 3000
CMD [ "npm", "run", "start" ]