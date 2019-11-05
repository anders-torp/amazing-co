FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsoa.json ./
ADD . /usr/src/app
RUN npm install
RUN npm run generate
RUN npm run build
COPY . .
EXPOSE 3010
CMD ["node", "."]
