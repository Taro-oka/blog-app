FROM php:8.3-fpm AS base

# Common system packages and PHP extensions
RUN apt-get update && apt-get install -y \
    zip unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    curl gnupg nginx \
    && docker-php-ext-install pdo_pgsql pgsql mbstring exif pcntl bcmath gd \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

# Build stage: install dependencies, build assets, warm caches, fix perms
FROM base AS builder

# Node.js for frontend build and git for composer installs
RUN apt-get update && apt-get install -y git \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# App source
COPY ./src/ /var/www/html

# Production installs/builds
RUN composer install --no-dev --optimize-autoloader \
 && npm ci \
 && npm run build \
 && chmod -R 775 storage bootstrap/cache

# Runtime stage: lean image with built artifacts
FROM base AS runtime

COPY --from=builder /var/www/html /var/www/html
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -f /etc/nginx/sites-enabled/default /etc/nginx/conf.d/default.conf.default 2>/dev/null || true

# Drop Node modules to keep runtime slim (artifacts are already built)
RUN rm -rf /var/www/html/node_modules

COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]
