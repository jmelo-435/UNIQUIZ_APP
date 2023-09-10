FROM node:14

WORKDIR /user/src/react_app

COPY ./react_app/package.json ./

COPY ./react_app/package-lock.json ./
RUN npm install
RUN npm i -D express axios parcel-bundler react react-dom
RUN npm install @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material
RUN npm install react-router-dom
RUN npm install bx24-api
RUN npm install @mui/x-data-grid

COPY ./react_app ./
COPY ./compose/local/react/config.json ./src
COPY ./compose/local/react/server.js .

#Importações relativas à interface de usuário

RUN npm init -y


EXPOSE 3000

CMD npm run watch & npm start
