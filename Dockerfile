FROM node:10.15.0-alpine

COPY . .
EXPOSE 3000
RUN npm install
