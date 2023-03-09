FROM node:18-alpine3.15 as builder
RUN apk add --no-cache git
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ARG GTAG_MANAGER_ID
RUN npm run build
WORKDIR /app/build
RUN grep -rl "assets/" . | xargs sed -i 's;assets/;docusaurus/;g'
RUN cp -r assets/* docusaurus/ && rm -rf assets

FROM nginx:1.23.1-alpine
COPY nginx.conf /etc/nginx
RUN nginx -t
COPY --from=builder /app/build /usr/share/nginx/html