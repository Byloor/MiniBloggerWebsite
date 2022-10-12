# MINI BLOGGER

## Frontend Project setup
```
npm install
npm start
```

frontend is served at localhost:8080 if available -> url opens login page of MiniBlogger website
### Lints and fixes files
```
npm run lint
```

### Compiles and minifies for production
```
npm run build
```


### Vue Cli Config help
See [Configuration Reference](https://cli.vuejs.org/config/).

## Backend Project setup
In another terminal.
```
cd backend
npm install
npm start
```
npm start -> starts the server and opens a database connection

1. after server is connected, backend is served at localhost:3000. 
2. frontend uses the url as proxyServer to communicate with backend for DB operations (see vue.config)


## Working of MiniBlogger Website:

Two users are created :
1. User: Admin , pw: admin
2. User: Vaishali , pw: test

If you would like to register a new account, 
1. navigate to the register page via Register at top right corner
2. Register with new username and password. (do not repeat usernames)




