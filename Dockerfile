FROM nginx
COPY dist/itportal-web /root/itprotal-web
COPY pdfjs /root/itportal-web/pdfjs
COPY nginx.conf /etc/nginx/nginx.conf