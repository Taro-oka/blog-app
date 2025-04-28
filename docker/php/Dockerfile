FROM php:8.3-fpm

# 必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    zip unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    curl gnupg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Node.jsとnpmをインストール
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Nodeとnpmのバージョン確認 (ビルドログに出るので安心)
RUN node -v && npm -v

# Composer インストール
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer