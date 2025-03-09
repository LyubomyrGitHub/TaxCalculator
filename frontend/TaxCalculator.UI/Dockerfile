# Stage 1: Build the Angular app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build || exit 1
RUN ls -la /app/dist || echo "Dist directory missing"
RUN ls -la /app/dist/tax-calculator-ui || echo "tax-calculator-ui directory missing"
RUN ls -la /app/dist/tax-calculator-ui/browser || echo "Browser directory missing"

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/tax-calculator-ui/browser /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html || echo "Nginx dir empty"
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]