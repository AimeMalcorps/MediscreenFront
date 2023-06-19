#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:1.17.1-alpine
COPY --from=node /app/dist/mediscreen-front /usr/share/nginx/html
# RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY /default.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200