FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]

# docker build . -t sniki19/node_server
# docker run -p 49160:5000 -d sniki19/node_server