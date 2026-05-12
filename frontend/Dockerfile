FROM python:3.11-slim

WORKDIR /srv/app

# Copy static frontend assets
COPY . /srv/app

EXPOSE 80

CMD ["python", "-m", "http.server", "80"]
