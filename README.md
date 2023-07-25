# Image Comparison Project
Built using laravel 8.
## Installation Procedure
### The prerequisites needed are as follows:
1. Local server (Apache2),
2. A database (MySQL),
3. PHPUnit,
4. [NodeJS](https://nodejs.org/).
5. [Composer](https://getcomposer.org/),
### Installation steps:
1. Clone project from [this](https://github.com/Dzyfhuba/image-comparison-histogram.git) github repository
```shell
git clone https://github.com/Dzyfhuba/image-comparison-histogram.git
```
2. Change directory
```shell
cd image-comparison-histogram
```
3. Install Composer Dependencies
```shell
composer install
```
4. Install NPM Dependencies
```shell
npm install && npm run build
```
5. Create a copy of your .env file
```shell
cp .env.example .env
```
6. Generate an app encryption key
```shell
php artisan key:generate
```
7. Create an empty database for our application
8. In the .env file, add database information to allow Laravel to connect to the database
9. Migrate the database
```shell
php artisan migrate
```
10. [Optional]: Seed the database
```shell
php artisan db:seed
```
11. Run Laravel project
```shell
php artisan serve
```
