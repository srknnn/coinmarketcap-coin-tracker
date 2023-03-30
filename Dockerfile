FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install \
  && mv node_modules /node_modules

RUN npm install -g @nestjs/cli

COPY . .

COPY .env .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
