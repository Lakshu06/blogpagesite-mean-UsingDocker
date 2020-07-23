# Create image based on the official Node 10 image from dockerhub
FROM node:12.11.1-alpine AS build

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package.json /app/



# Install dependecies
RUN npm install 

# Get all the code needed to run the app
COPY . /app/

RUN npm link @angular/cli
RUN npm run build --prod
# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ng serve --host 0.0.0.0


