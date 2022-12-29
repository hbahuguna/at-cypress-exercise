FROM cypress/included:10.2.0

WORKDIR /app
COPY ./cypress ./cypress
COPY ./cypress.config.js ./cypress.config.js
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install
RUN $(npm bin)/cypress verify
RUN $(npm bin)/cypress
