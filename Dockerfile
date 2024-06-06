FROM node:22-alpine

RUN npm install -g pnpm

WORKDIR /nomi

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

COPY . .

CMD ["pnpm", "start"]
