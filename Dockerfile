FROM node:18.17.1-bookworm as build
WORKDIR /src
COPY . .
RUN npm install -g npm@9.6.7
RUN chmod u+x ./scripts/gen-env.sh
RUN sh ./scripts/gen-env.sh
RUN npm run init-project
RUN npm run build
EXPOSE 80
COPY . .
ENTRYPOINT [ "node", "./backend/server/index.js" ]