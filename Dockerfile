FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8080
CMD ["node","index.js"]

#docker run --rm  --name nodejs-cloud -p 8080:8080 -it --entrypoint bash quay.io/pknezevich/node-cloudevent