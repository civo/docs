FROM node:20-alpine3.19 as builder
WORKDIR /app
COPY package.json ./
RUN npm install

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM builder AS prerelease
COPY --from=builder /app/node_modules node_modules
COPY . .
RUN npm run build

# release with only production dependencies
FROM nginx:1.23.1-alpine
COPY nginx.conf /etc/nginx
RUN nginx -t
COPY --from=prerelease /app/dist /usr/share/nginx/html