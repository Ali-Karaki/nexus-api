FROM node:19-alpine

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3001

CMD ["npm", "start"]