# SCNG services

Repository for SCNG (Solski Center Nova Gorica) API service and 
native mobile application.

### Project setup
1. Clone repo locally `git clone https://github.com/bartolomej/scng-api.git`
2. Install external node modules `npm i`
3. Configure `ormconfig.env` file with database credentials
4. Run application with `npm start`
5. Run all tests with `jest test`


### Enviroment variables

```
// .env file in root

NAME = scng
PORT = <port>
NODE_ENV = <development/production>
CONNECTION = mysql
HOST = localhost
USERNAME = <user>
PASSWORD = <password>
DATABASE = scng
DATABASE_PORT = 3306
LOGGING = false
```


### School object examples
```json
{
  "id": "0",
  "name": "SCNG",
  "fullName": "Šolski center Nova Gorica",
  "homeUrl": "https://www.scng.si",
  "timetableUrl": "",
  "siteVersion": "v1",
  "logo": "/news/logo/scng.png"
}
```

```json
{
  "id": "224",
  "name": "ERS",
  "fullName": "Elektrotehniška in računalniška šola",
  "homeUrl": "http://ers.scng.si",
  "timetableUrl": "https://www.easistent.com/urniki/e29aeb36cd1efde89c2b2c28e33209813ec32756",
  "siteVersion": "v1",
  "logo": "/news/logo/ers-scng.png"
}
```



## TODO LIST
- [ ] refactor to simpler non-module structure
- [ ] implement 'solska malica' module
- [ ] implement logging endpoints for front end system (for analytics purposes)
- [ ] add code guides
- [ ] add git workflow guides
- [ ] add admin (analytics) endpoints
- [ ] add website module (download page, guides,..)
- [ ] load test server - [artillery](https://artillery.io/)
