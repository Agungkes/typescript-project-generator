FROM node:lts

WORKDIR /app

COPY package.json ./

RUN yarn install --prod

COPY dist /app/dist

CMD [ "yarn", "start" ]
