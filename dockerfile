FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app /app
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "run", "start"]