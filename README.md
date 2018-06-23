# Clique Project - Development Build
Clique Project is a university final project for Web Programming course. The main project requirement is using CodeIgniter.

## Author
 - Owen Yuwono ([owenyuwono@gmail.com](mailto:owenyuwono@gmail.com))
 - Heri Adinegoro Soeparno ([herisoeparno@gmail.com](mailto:herisoeparno@gmail.com))
 - Adjie Wahyu Wicaksono ([adjie.wahyuw@gmail.com](mailto:adjie.wahyuw@gmail.com))
 
 
## To-Do List
### Homepage
##### Sidebar : 
 - UI nya di rapikan
    - Scrollable
    - Tulisannya/Box di tipisin
 - url ke clique/kategori yang di pilih
##### Profile Page :
 - Benerin tampilan link saat pencet di feeds/profile
 - Upload File
##### Profile Bar :
 - Logout
 - Tampilin username
 - link ke Profile Page
 - Edit Password 
 ##### Notification :
 - UI dibenerin = popup list notif
 ### Main Requirements
 - CodeIgniter :heavy_check_mark:
 - MVC :heavy_check_mark:
 - CRUD with MySQL Database (Tinggal Delete)
 - Login Feature with Session Class :heavy_check_mark:
 - File Upload
 - Send Email
 - XSS & SQL Injection Prevention :heavy_check_mark:
 - Well-designed UI/UX :heavy_check_mark:

## Development Stack
This project is created using :
  - [React.js](https://reactjs.org/) using [WebStorm](https://www.jetbrains.com/webstorm/?fromMenu)
  - [CodeIgniter](https://codeigniter.com/download) using [PhpStorm](https://www.jetbrains.com/phpstorm/)
  
## Installation (Development Mode)
 - [WebStorm](https://www.jetbrains.com/webstorm/download/#section=windows)
 - [PhpStorm](https://www.jetbrains.com/phpstorm/download/#section=windows)
 - [PostgreSQL 10.4](https://www.postgresql.org/)


## Running (Development Mode)
##### Front-end
 - Open Project in WebStorm
 - Right click project root directory and Open Terminal
 - Type `npm install` if running for the first time
 - Type `npm start` to run the project
##### Back-end
 - Open Project in PhpStorm
 - Right click project root directory and Open Terminal
 - Type `php -S localhost:8000` to run the project

#### Credits
 - Built on top of [CoreUI](https://coreui.io/react/) for React
 - [reactstrap](https://reactstrap.github.io/)
 - [react-bootstrap](https://react-bootstrap.github.io/)
 - [react-timeago](https://www.npmjs.com/package/react-timeago)
 - [react-google-login](https://www.npmjs.com/package/react-google-login)
 - [react-facebook-login](https://www.npmjs.com/package/react-facebook-login)
 - [react-select](https://github.com/JedWatson/react-select)
 - [slatejs](https://www.slatejs.org)
 - [material-icons](https://material.io/tools/icons/?style=baseline)
 - [material-design](https://material.io/) web components
 - [rmwc](https://github.com/jamesmfriedman/rmwc) a React Wrapper for Material Design (Web) Components
 - [axios](https://github.com/axios/axios) for HTTP REQUESTS
 
#### Frequently Asked Questions
 > - Q : My PHP is not recognized in my command prompt
 > - A : Add your PHP path to windows system environment variables
 
 > - Q : PostgreSQL Driver not found
 > - A : Go To your PHP directory find a file named php.ini, open and find `;extension=postgres` and delete the `;`
