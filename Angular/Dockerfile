# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/src/app

# Add the source code to app
COPY package.json package-lock.json ./

# Install all the dependencies
# line 15 needed because of error 'The package-lock.json file was created with an old version of npm'
# error message recommended to 'Run `npm install -g npm@7.24.2` to update!'
RUN npm install -g npm@7.24.2
RUN npm clean-install

COPY . .

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/dist/Angular /usr/share/nginx/html

# Expose port 80
EXPOSE 80
