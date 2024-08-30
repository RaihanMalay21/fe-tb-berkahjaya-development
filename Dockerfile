# Build stage
FROM node:22-alpine3.19 AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

# Serve stage
FROM node:22-alpine3.19
WORKDIR /app
COPY --from=builder /app/build /app
RUN npm install -g serve
CMD ["sh", "-c", "serve -s /app -l $PORT"]
