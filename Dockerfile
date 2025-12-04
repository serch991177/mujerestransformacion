# Imagen base con PHP 8.2 y Apache
FROM php:8.2-apache

# Instalar extensiones necesarias de PHP y Composer
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_mysql zip

# Instalar Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Copiar archivos del proyecto al contenedor
WORKDIR /var/www/html
COPY . .

# Instalar dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Generar APP_KEY automáticamente si no existe
RUN php artisan key:generate || true

# Dar permisos a storage y bootstrap
RUN chmod -R 775 storage bootstrap/cache

# Exponer puerto
EXPOSE 80

# Comando para ejecutar Laravel con Apache
CMD ["apache2-foreground"]