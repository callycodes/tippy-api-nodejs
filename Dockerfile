FROM node:12.17.0-alpine
WORKDIR /usr
COPY . .
RUN ls -a
RUN npm install
## this is stage two , where the app actually runs
FROM node:12.17.0-alpine
WORKDIR /usr
COPY ./package.json ./
RUN npm install --only=production
COPY --from=0 /usr/dist .
RUN npm install pm2 -g
EXPOSE 80
CMD ["pm2-runtime","app.js"]