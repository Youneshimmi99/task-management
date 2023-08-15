# Task Management App with JWT Authentication

This project is a simple task management application with integrated JWT authentication. It uses Vue.js for the frontend, Laravel for the backend, and MongoDB for the database.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js v14 or higher](https://nodejs.org/en)
- [Composer](https://getcomposer.org/)
- [MongoDB v6.0](https://www.mongodb.com/try/download/community)
- [PHP 8.1](https://windows.php.net/download)

## Setup MongoDB on Windows

1. Create a new directory named 'data' inside your MongoDB directory.

2. Set up the environment variable for MongoDB:
   - Open the system variables.
   - Locate the `PATH` variable and click on edit.
   - Add a new variable with the path to the 'bin' directory of MongoDB.

3. Start the MongoDB server:
   - Open a command prompt.
   - Run the following command (replace 'E:\mongodb\data' with your path):
    ```sh
    mongod --dbpath E:\mongodb\data
    ```

## Setup PHP on and mongodb extension on Windows

1. Set up PHP:
   - Download PHP 8.1 from [here](https://windows.php.net/download).
   - Open the system variables.
   - Locate the `PATH` variable and click on edit.
   - Add a new variable with the path to the 'php' directory.

2. Configure PHP extensions:
   - Rename `php.ini-development` to `php.ini`.
   - Open `php.ini` and uncomment the following extensions by removing the ';' before them:
     ```
     extension=openssl
     extension=fileinfo
     extension=curl
     ```

3. Download MongoDB extension since it doesn't come with php installation:
   - Download the MongoDB extension v1.13 from [here](https://pecl.php.net/package/mongodb/1.13.0/windows). Make sure to download the same version of your PHP taking into consideration the TS and NTS versions.
   - Extract the downloaded archive and copy `php_mongodb.dll`.

4. Add MongoDB extension:
   - Paste `php_mongodb.dll` into the 'php/ext' directory.
   - Open `php.ini` and add the following line under the extensions:
     ```
     extension=mongodb
     ```

5. Note about MongoDB extension version:
   - Ensure that you download the exact same version of the MongoDB extension as your PHP version. For example, if you downloaded PHP 8.1 from [here](https://windows.php.net/download#php-8.1-nts-vs16-x64), you should download the corresponding MongoDB extension `php_mongodb-1.13.0-8.1-nts-vs16-x64.zip` from [here](https://windows.php.net/downloads/pecl/releases/mongodb/1.13.0). This step is important to ensure compatibility with the `jenssegers\mongodb` package.

## Installation

1. Clone the project repository:
    ```sh
    git clone https://github.com/Youneshimmi99/task-management.git
    ```

2. Change directory to `laravel-backend`:
    ```sh
    cd laravel-backend
    ```

3. Install backend dependencies:
    ```sh
    composer install
    ```

4. Copy `.env.example` to `.env`:
    ```sh
    cp .env.example .env
    ```

5. Generate the JWT secret key::
    ```sh
    php artisan jwt:secret
    ```

6. Start the Laravel server:
    ```sh
    php artisan serve
    ```

7. Change directory to `vuejs-frontend`:
    ```sh
    cd vuejs-frontend
    ```

8. Install frontend dependencies::
    ```sh
    npm install
    ```

9. Start the Vue.js development server:
    ```sh
    npm run serve
    ```

10. Note about Laravel port:
    - If you are using a port other than `http://localhost:8000` for Laravel, please update the `baseURL` in `vuejs-frontend/src/axios.js` to match your Laravel's API endpoint.

## Access the App

Open your browser and visit: http://localhost:8080/

## Usage

- Manage tasks using the interactive interface.
- Register an account.
- Logout to end your session.
- Log in with your registered account using the login modal.
