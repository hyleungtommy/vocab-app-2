FROM node:lts-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY . .

EXPOSE 4000
RUN npm run build
CMD [ "node", "dist/index.js" ]

#docker cmd:
# docker ps -a
# docker image build . -t hyleungtommy/vocab-server:0.0.1
# docker run -i -p 4000:4000 hyleungtommy/vocab-server:0.0.1
# docker kill <cont id>
# docker system prune