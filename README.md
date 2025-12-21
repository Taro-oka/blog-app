# Blog App

A simple Laravel blog environment running via Docker.

## Resources

- Project note: https://note.com/kiamotomonic/n/n4236e7cbc76c

## Prerequisites

- Docker
- Docker Compose

## First-time setup

1. docker compose up --build
2. docker exec -it laravel-app bash
3. Inside the container run:

```bash
composer install
mkdir -p storage/framework/{cache,data,sessions,views}
mkdir -p bootstrap/cache
chmod -R 777 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
npm run dev
```

4. Open http://localhost.

## Subsequent runs

1. docker compose up -d
2. docker exec -it laravel-app bash
3. npm run dev
4. Open http://localhost.

## Notes

- Storage directories are not synced between the container and the host, so create them manually on the first run to avoid errors.
- The database is configured to connect to Supabase; ensure credentials are available in the environment.

## Testing(backend)

```bash
1. docker compose up -d
2. docker exec -it laravel-app bash
3. npm run dev
4. php artisan test //use another terminal
```

## Testing(frontend)

```bash
1. docker compose up -d
2. docker exec -it laravel-app bash
3. npm run test
```
