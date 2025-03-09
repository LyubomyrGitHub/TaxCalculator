# Stage 1: Build the Angular app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build  # Use the corrected script
RUN ls -la /app/dist
RUN ls -la /app/dist/tax-calculator-ui

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/tax-calculator-ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]