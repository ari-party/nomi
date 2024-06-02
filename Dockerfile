FROM node: 22-alpine

WORKDIR /home/nomi

RUN git pull https://github.com/ari-party/nomi.git

RUN npm install

COPY . .

CMD ["npm", "run", "start"]
