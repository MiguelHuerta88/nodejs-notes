ARG NODE_IMAGE=node:16.17.1-alpine
FROM $NODE_IMAGE AS base
ARG ENVIRONMENT=dev
ENV ENVIRONMENT=$ENVIRONMENT
WORKDIR /var/www/notes

RUN apk --no-cache add dumb-init sqlite
RUN apk update && apk add bash

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN npm run build

FROM base as production
ENV NODE_ENV=production
ENV PORT=3000


COPY --chown=node:node --from=build /var/www/notes/dist .
COPY --chown=node:node --from=dependencies /var/www/notes/node_modules ./node_modules
COPY --chown=node:node ./env/${ENVIRONMENT}.env ./.env

EXPOSE $PORT

CMD [ "dumb-init", "node", "main.js" ]