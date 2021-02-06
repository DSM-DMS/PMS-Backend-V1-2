FROM node:15.8.0-alpine3.10
WORKDIR /home/node/app
COPY ./package*.json .
RUN npm install
COPY . .
RUN npx tsc
CMD ["npm", "run", "start:prod"]