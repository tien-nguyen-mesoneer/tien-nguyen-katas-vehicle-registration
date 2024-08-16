# STAGE: Prepare base image
FROM node:20.16-slim AS base-image
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm cache clean --force
RUN npm ci
RUN npm run build


# STAGE: prepare production

FROM node:20.16-slim AS prepare-production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=base-image /app/dist dist
COPY --from=base-image /app/package*.json ./
RUN npm ci --production

# STAGE: production

FROM node:20.16-slim AS prod

ENV DB_CONNECTION_URL=

WORKDIR /app
COPY --from=prepare-production /app/node_modules ./node_modules
COPY --from=prepare-production /app/dist ./dist
CMD ["node", "./dist"]
EXPOSE 3000