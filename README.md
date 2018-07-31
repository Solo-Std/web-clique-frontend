# Clique Project - Development Build
Clique Project is a university final project for Web Programming course. The main project requirement is using CodeIgniter.

## Author
 - Owen Yuwono ([owenyuwono@gmail.com](mailto:owenyuwono@gmail.com))
 - Heri Adinegoro Soeparno ([herisoeparno@gmail.com](mailto:herisoeparno@gmail.com))
 - Adjie Wahyu Wicaksono ([adjie.wahyuw@gmail.com](mailto:adjie.wahyuw@gmail.com))
 - Silvin ([silvin@student.umn.ac.id](mailto:silvin@student.umn.ac.id))

## Development Stack
This project is created using :

  - [React.js](https://reactjs.org/) using [WebStorm](https://www.jetbrains.com/webstorm/)
  - [CodeIgniter](https://codeigniter.com/download) using [PhpStorm](https://www.jetbrains.com/phpstorm/)
  - [Python Flask](http://flask.pocoo.org/) using [PyCharm](https://www.jetbrains.com/pycharm/)
  
Deployed using [Heroku](https://heroku.com)

  - Front-End Link -> [frontend-clique.herokuapp.com](https://frontend-clique.herokuapp.com)
  - Back-End Link -> [project-clique.herokuapp.com](https://project-clique.herokuapp.com)
  - Websocket Server Link -> [websocket-clique.herokuapp.com](wss://websocket-clique.herokuapp.com)
  
## Prerequisites (Development)
  - PHP >= 7.1.14
  - [Composer](https://getcomposer.org/download/)
  - [Node Package Manager (npm)](https://www.npmjs.com/get-npm) *(Webstorm Installation already includes npm)*
  - [python pip](https://pip.pypa.io/en/stable/installing/) *(PyCharm Installation already includes npm)*

## Features
  -  User Relationship (Add Friend, Remove Friend)
  -  Create PostComponent, Read PostComponent
  -  Comment, Reply
  -  Subscribe, Unsubscribe Clique (Thread)
  -  Global Live Chat
  -  Registration (Welcome Email), Login
  -  Edit Profile Picture
 
 
## Installation (Development Mode)
 - [WebStorm](https://www.jetbrains.com/webstorm/download/#section=windows)
 - [PhpStorm](https://www.jetbrains.com/phpstorm/download/#section=windows)
 - [PyCharm](https://www.jetbrains.com/pycharm/download/#section=windows)
 - [PostgreSQL 10.4](https://www.postgresql.org/)


## Running (Development Mode)
##### Database
 - Open SQLShell
 - type `CREATE DATABASE cliquedb;`
 - import `sql.sql` in this project's root directory to the database
##### Front-end
 - Open Project in WebStorm
 - Right click project root directory and Open Terminal
 - Change `BASE_URL` in `api.js` from a heroku link to `http://localhost:8000`
 - Change `WEBSOCKET_URL` in `ChatConnection.js` from a heroku link to `ws://localhost:5000`
 - Type `npm install` if running for the first time
 - Type `npm start` to run the project
##### Back-end
 - Open Project in PhpStorm
 - Right click project root directory and Open Terminal
 - Type `composer install` if running for the first time
 - Type `php -S localhost:8000` to run the project
##### Websocket Server
 - Open Project in PyCharm
 - Right click project root directory and Open Terminal
 - Type `pip install` or `python -m pip install` if running for the first time
 - Type `python chat.py` to run the project
## Running (Deployment Mode)
 - Open Heroku [link](https://frontend-clique.herokuapp.com)


## Credits
 - Built on top of [CoreUI](https://coreui.io/react/) for React
 - [reactstrap](https://reactstrap.github.io/)
 - [react-bootstrap](https://react-bootstrap.github.io/)
 - [react-timeago](https://www.npmjs.com/package/react-timeago)
 - [react-google-login](https://www.npmjs.com/package/react-google-login) *(implementation removed)*
 - [react-facebook-login](https://www.npmjs.com/package/react-facebook-login) *(implementation removed)*
 - [react-select](https://github.com/JedWatson/react-select)
 - [slatejs](https://www.slatejs.org)
 - [material-icons](https://material.io/tools/icons/?style=baseline)
 - [material-design](https://material.io/) web components
 - [rmwc](https://github.com/jamesmfriedman/rmwc) a React Wrapper for Material Design (Web) Components
 - [axios](https://github.com/axios/axios) for HTTP REQUESTS
 - [Reconnecting WebSocket](https://github.com/pladaria/reconnecting-websocket)
 - [SendGrid](https://github.com/sendgrid/sendgrid-php) for sending email via SMTP
 - [react-chat-window](https://www.npmjs.com/package/react-chat-window) for Live Chat UI
 
#### Frequently Asked Questions (Development)
  Q : My NPM is not recognized in my command prompt
 > A : Add your NPM path to windows system environment variables

  Q : My PHP is not recognized in my command prompt
 > A : Add your PHP path to windows system environment variables

  Q : PostgreSQL Driver not found
 > A : Go To your PHP directory find a file named php.ini, open and find `;extension=pdo_mysql` and `extension=pdo_pgsql` and delete the `;`

#### Frequently Asked Questions (Deployment)
  Q : Live chat sometimes working, sometimes not working
 > A : Websocket system will close if it's open for too long, our live chat can reopen the connection but not instantly, so when the connection is closed and not opened yet, you cannot access chat system. This is a known issue

