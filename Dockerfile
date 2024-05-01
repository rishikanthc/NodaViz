# Build stage
FROM node:22-bookworm-slim AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Serve stage
FROM node:22-bookworm-slim

WORKDIR /app

# Installing serve to serve the build files
RUN npm install -g serve

# Copying the build files from the build stage to the serve stage
COPY --from=build /usr/src/app/build /app

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
