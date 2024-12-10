# Base image
FROM node:18-bullseye

# Set up necessary packages
RUN apt-get update && \
    apt-get install -y wget gnupg libnss3 libatk1.0-0 libatk-bridge2.0-0 libx11-xcb1 libxcomposite1 \
    libxdamage1 libxrandr2 libgbm1 libasound2 libpangocairo-1.0-0 libxss1 libgtk-3-0 libxshmfence1 libglu1 libegl1 \
    default-jre && apt-get clean

ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Set up working directory
WORKDIR /app

# Copy from package.json to package-lock.json
COPY package.json package-lock.json ./ 

# Install dependency
RUN npm install

# Install Allure Commandline
RUN npm install -g allure-commandline --save-dev

# Set rules for Playwright running
RUN npx playwright install --with-deps

# Copy all project
COPY . .

# Open porn for Allure-reports
EXPOSE 4040

# set defaul command
CMD ["npm", "run", "test"]