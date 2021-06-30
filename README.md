# nodejs-api-crud-mongodb
nodejs + api + crud + mongodb on premise

https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/

# Start set up
$ npm init
$ npm install --save express mongoose body-parser nodemon

- GET => http://localhost:3000
- GET => http://localhost:3000/courses
- GET => http://localhost:3000/courses/[id]
- POST => http://localhost:3000/courses
- PUT => http://localhost:3000/courses/[id]
- DELETE => http://localhost:3000/courses/[id]

# Install npm
- Install np,
    $ npm instal

- Add start script nodemon on pckage.json
    "start" : "nodemon server.js"



# DB + UI Monitor
- Mongodb on Premise + MongoDB Compass
- install: https://shashank6341.medium.com/installing-mongodb-on-macos-catalina-big-sur-or-older-d47c18b0c57d

# MONGO DB INSTALL ON PREMISE
## MongoDB command ##

— Start Mongo
	$ brew services run mongodb-community

		Or but start will never stop better test for run 

	$ brew services start mongodb-community

— Stop Mongo
	$ brew services stop mongodb-community

— Restart Mongo
	$ brew services restart mongodb-community


— Check process
	$ ps aux | grep -v grep | grep mongodb



# Shell Command (Use command for  CRUD) #
- Shell start use
	$ mongo

-  show db
	$ show dbs

-  switched to db admin
	$ use admin

-  switched to db user  (if no person it will auto create db user)
	$ use user

-  switched to db  person (if no person it will auto create db person)
	$ use person

- check what is current db
	$ db

