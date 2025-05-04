# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx tsc

# Stage 2: Minimal run image
FROM node:20-alpine

WORKDIR /app

# Copy dist and only package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

CMD ["node", "dist/ingest.js"]

