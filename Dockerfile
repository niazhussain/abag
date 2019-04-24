FROM node:10-alpine

RUN apk add git

WORKDIR /app

ARG NEXT_STATIC_BACKEND_URL
ENV NEXT_STATIC_BACKEND_URL=$NEXT_STATIC_BACKEND_URL

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY next.config.js ./next.config.js
COPY .babelrc.js ./.babelrc.js
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]

# Run this command to make new image
# >> docker image build -t abag .

# To make image run as container use command below
# >> docker run -p 3000:80 -d abag