FROM node:16.20.2

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

# Chạy ứng dụng với npm
CMD ["npm", "run", "dev"]
