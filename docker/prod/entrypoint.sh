#!/bin/bash
set -e

cd /var/www/html

# Cache configs/routes/views at runtime when env vars are available.
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM in background, then run nginx in foreground
php-fpm -D
exec nginx -g "daemon off;"
