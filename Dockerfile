FRom node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

ENV NODE_ENV=production
ENV DB_HOST=my--host
ENV DB_NAME=my-db
ENV DB_USER=my-user
ENV DB_PASSWORD=password123

EXPOSE 8080

CMD [ "npm", "start" ]
