FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .

EXPOSE 3000

CMD ["npm", "run", "start:debug"]
