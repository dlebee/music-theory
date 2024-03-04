# Stage 1: Build the Angular application
FROM node:20.11.1-alpine as build-stage

WORKDIR /app

COPY . .

RUN npm install -g @angular/cli
RUN npm install
RUN ng build

FROM nginx:alpine

COPY --from=build-stage /app/dist/music-theory/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
