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

# App/Vite envs (build-time). VITE_APP_NAME falls back to APP_NAME.
ARG APP_NAME=Devlog
ARG VITE_APP_NAME

# Node.js for frontend build and git for composer installs
RUN apt-get update && apt-get install -y git \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# App source
COPY ./src/ /var/www/html

# Ensure env vars are available to the build steps
ENV APP_NAME=${APP_NAME}
ENV VITE_APP_NAME=${VITE_APP_NAME:-${APP_NAME}}

# Production installs/builds
RUN composer install --no-dev --optimize-autoloader \
 && npm ci \
 && VITE_APP_NAME=$VITE_APP_NAME npm run build \
 && chmod -R 775 storage bootstrap/cache

# Runtime stage: lean image with built artifacts
FROM base AS runtime

COPY --from=builder /var/www/html /var/www/html

# Remove distro default site so our vhost is always used
RUN rm -f /etc/nginx/sites-enabled/default /etc/nginx/sites-available/default /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.default 2>/dev/null || true \
 && rm -rf /usr/share/nginx/html

COPY docker/prod/nginx/default.conf /etc/nginx/conf.d/default.conf

# Drop Node modules to keep runtime slim (artifacts are already built)
RUN rm -rf /var/www/html/node_modules

COPY docker/prod/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["php-fpm"]
