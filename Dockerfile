FROM node:22-alpine

WORKDIR /home/nomi

RUN pnpm install

COPY . .

CMD ["pnpm", "start"]
