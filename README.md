# disney_plus

## How to Run

1. configure your local databse

* Check ./db/config.js:

```js
const config = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'xxxxx',
    database: 'disney'
}
```

*change 'user', 'password' into your own and create schema 'disney' in your own database

2. Run nodejs server
* Install dependencies: `npm install`
* Run the server: `npm start`
* The server will be running at: "localhost:3000" (visit this url in your browser)



