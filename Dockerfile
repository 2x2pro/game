FROM nginx:latest
# Copy custom HTML content into the default directory for Nginx
COPY . /usr/share/nginx/html

# Optionally, copy a custom nginx.conf (if you have one)
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]