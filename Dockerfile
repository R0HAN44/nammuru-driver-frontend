
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port Vite runs on (default is 5173)
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev", "--", "--host"]
