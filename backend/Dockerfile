FROM node:20 as base-installer

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --immutable

FROM base-installer as ts-compiler

WORKDIR /app

COPY --from=base-installer /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM node:20 as ts-remover

WORKDIR /app

COPY --from=ts-compiler /app /app

RUN yarn install --immutable --prod=true

FROM gcr.io/distroless/nodejs20

WORKDIR /app

COPY --from=ts-remover /app/dist ./
COPY --from=ts-remover /app/node_modules ./node_modules

USER 1000

CMD ["main.js"]
