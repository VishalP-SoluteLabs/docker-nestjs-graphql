FROM node:16    

# Create app directory, thiis is in our container or in our image
WORKDIR /vishal/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "node", "dist/main" ]