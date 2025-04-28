FROM php:8.3-fpm

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    zip unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composer インストール
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer