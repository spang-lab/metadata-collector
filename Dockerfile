
FROM node:15-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json package.json
RUN npm install
ADD . /usr/src/app

WORKDIR /usr/src/app/client
RUN npm install
RUN ./node_modules/.bin/webpack --mode=production --profile

WORKDIR /usr/src/app

EXPOSE 80
CMD ["node", "app.js"]
