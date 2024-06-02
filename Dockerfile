FROM node:22-alpine

WORKDIR /home/nomi

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
