FROM node:22-alpine

WORKDIR /home/nomi

RUN git pull https://github.com/ari-party/nomi.git

RUN pnpm install

COPY . .

CMD ["pnpm", "start"]
