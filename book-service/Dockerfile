# Use official lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency list and install
COPY package*.json ./
RUN npm install

# Copy project source code
COPY . .

# Expose port (default for Express)
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
