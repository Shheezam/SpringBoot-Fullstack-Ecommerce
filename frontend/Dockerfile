FROM node:latest AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -f

COPY . .

EXPOSE 3000

CMD ["npm", "start"]