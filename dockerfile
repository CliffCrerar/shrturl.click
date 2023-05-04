FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

EXPOSE 80
EXPOSE 3000

ENV PORT=80

CMD npm start