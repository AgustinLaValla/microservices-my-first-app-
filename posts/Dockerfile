#Base image
FROM node:alpine 

#Directory
WORKDIR /app 

#Copy package and package-lock
COPY package.json ./

#Install dependencies 
RUN npm install

#Copy everything from post directory
COPY ./ ./

CMD ["npm", "start"]