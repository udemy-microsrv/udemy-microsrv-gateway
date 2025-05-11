FROM node:22-alpine3.21

ENV PORT=3000
ENV NATS_SERVERS="nats://localhost:4222"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
