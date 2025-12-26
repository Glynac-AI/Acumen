# Strapi Development Dockerfile for Render
FROM node:20-alpine

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm ci

# Copy ALL source code (needed for development mode)
COPY . .

# Create data directory
RUN mkdir -p .tmp

# Set development environment with increased memory
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=5603
ENV NODE_OPTIONS="--max-old-space-size=1024"

# Expose port
EXPOSE 5603

# Start Strapi in development mode
CMD ["npm", "run", "develop"]
