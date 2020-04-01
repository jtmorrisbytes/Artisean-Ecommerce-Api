FROM node:13.10.1-slim as builder


COPY package.json .
COPY package.json .
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

FROM nginx AS serve

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./build /usr/share/nginx/html
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'