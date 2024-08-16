# STAGE: Prepare base image
FROM node:20.16.0-bullseye AS base-image
WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
COPY ./src ./src

RUN npm cache clean --force
RUN npm ci
RUN npm run build


# STAGE: prepare production

FROM base-image AS prepare-production
ENV DB_CONNECTION_URL=
COPY --from=base-image /app .
RUN npm ci --only=production

# STAGE: production

FROM node:20.16.0-bullseye AS prod
WORKDIR /app
ENV DB_CONNECTION_URL=
COPY --from=prepare-production /app/node_modules ./node_modules
COPY --from=prepare-production /app/dist ./dist


CMD ["node", "./dist"]
EXPOSE 3000

