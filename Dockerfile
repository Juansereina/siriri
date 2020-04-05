FROM node:13.12.0

# Optimizes the installation
COPY ["package.json", "package-lock.json", "/usr/siriri-19/"]

WORKDIR /usr/siriri-19

RUN npm install

COPY [".", "/usr/siriri-19/"]

EXPOSE 8080

# Default command for production mode
CMD ["node", "index.js"]
