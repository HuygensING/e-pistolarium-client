FROM nginx:1.11.8-alpine

RUN apk update
RUN apk add nodejs

COPY package.json /usr/share/nginx/html/package.json
COPY webpack.config.js /usr/share/nginx/html/webpack.config.js
COPY tsconfig.json /usr/share/nginx/html/tsconfig.json
COPY index.html /usr/share/nginx/html/index.html
COPY src /usr/share/nginx/html/src

WORKDIR /usr/share/nginx/html

RUN npm install
RUN npm run build

COPY docker/nginx.conf /etc/nginx/nginx.conf

# Clean up
RUN rm -rf \
	package.json \
	webpack.config.js \
	tsconfig.json \
	src
RUN apk del nodejs

EXPOSE 80