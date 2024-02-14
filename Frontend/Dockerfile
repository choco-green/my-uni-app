# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Build the app for production
RUN npm run build

# The port your app will run on
EXPOSE 3000

# Command to run your app using Vite
CMD ["npm", "run", "serve"]
