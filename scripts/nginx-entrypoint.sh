#!/bin/sh
set -e

# Substitute environment variables in nginx.conf template
envsubst '${SERVER_NAME}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Test nginx configuration
nginx -t

# Start nginx in foreground
exec nginx -g 'daemon off;'
