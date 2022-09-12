FROM node:14-alpine

WORKDIR /web

COPY package.json /web

RUN npm install --prod

COPY . /web

ENV WEB_PORT=8080

EXPOSE $API_PORT

CMD ["npm", "start"]