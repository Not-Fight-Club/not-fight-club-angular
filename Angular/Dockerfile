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

# Stage 2: Run tests while building image
FROM build as test
RUN apt-get update && apt-get install -y \
    fonts-liberation \
    gconf-service \
    libappindicator1 \
    libasound2 \
    libatk1.0-0 \
    libcairo2 \
    libcups2 \
    libfontconfig1 \
    libgbm-dev \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libicu-dev \
    libjpeg-dev \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libpng-dev \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    xdg-utils
RUN npm install puppeteer --save-dev
COPY ./src .
RUN npm ci
RUN npm run test


# Stage 3: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/dist/Angular /usr/share/nginx/html

# Expose port 80
EXPOSE 80
