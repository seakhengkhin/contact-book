FROM node:18-alpine

WORKDIR /app
RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 10000

CMD ["npm", "run", "start"]