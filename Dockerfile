FROM node:20.9.0

RUN apt-get update && apt-get install -qq -y --no-install-recommends

ENV INSTALL_PATH /one_bit_exchange_front

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY package*.json ./

RUN npm install

COPY . .