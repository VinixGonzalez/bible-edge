# ---------- build ----------
  FROM node:22-alpine AS builder

  WORKDIR /app

  COPY package*.json ./
  COPY prisma ./prisma
  RUN npm install

  COPY . .
  RUN npm run build
  RUN npx prisma generate

  # ---------- runtime ----------
  FROM node:22-alpine

  WORKDIR /app

  ENV NODE_ENV=production

  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/build ./build
  COPY --from=builder /app/prisma ./prisma
  COPY package.json ./

  EXPOSE 3000

  CMD ["npm", "run", "start"]
