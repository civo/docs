FROM node:18-alpine3.15 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.1-alpine
COPY nginx.conf /etc/nginx
COPY --from=builder /app/build /usr/share/nginx/html/docs
RUN touch /usr/share/nginx/html/index.html