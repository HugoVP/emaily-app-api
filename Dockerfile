FROM node:10.11.0-alpine
WORKDIR /app
COPY ./ ./
RUN npm install --production
CMD [ "npm", "run", "start" ]
