FROM node

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm i

COPY . /app

CMD node ./app.js