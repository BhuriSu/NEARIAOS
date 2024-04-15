# Use a base image suitable for your backend application
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the application will run (if needed)
EXPOSE 5000

# Command to start the application
CMD ["npm", "start"]