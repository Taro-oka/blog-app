#!/bin/bash
set -e

cd /var/www/html

# Ensure any distro default site is gone (defensive in case of cached layers)
rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-available/default /etc/nginx/conf.d/default.conf.default 2>/dev/null || true

# Cache configs/routes/views at runtime when env vars are available.
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start PHP-FPM in background, then run nginx in foreground
php-fpm -D
exec nginx -g "daemon off;"
