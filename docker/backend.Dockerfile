FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

RUN npm ci --omit=dev

COPY apps/backend ./apps/backend

ENV NODE_ENV=production

WORKDIR /app/apps/backend

EXPOSE 4000

CMD ["npm", "start"]