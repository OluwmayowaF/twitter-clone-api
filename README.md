# Twitter-clone-api
[![Build Status](https://travis-ci.com/OluwmayowaF/twitter-clone-api.svg?branch=master)](https://travis-ci.com/OluwmayowaF/twitter-clone-api) <a href="https://codeclimate.com/github/OluwmayowaF/twitter-clone-api/maintainability"><img src="https://api.codeclimate.com/v1/badges/55ba530f9dd8f21a49e5/maintainability" /></a> [![Coverage Status](https://coveralls.io/repos/github/OluwmayowaF/twitter-clone-api/badge.svg?branch=master)](https://coveralls.io/github/OluwmayowaF/twitter-clone-api?branch=master)



As the project title suggests this is a RESTFul API that mimics some twitter features such as - User registration, User login, tweets post, reply to tweets, follow other users, view own timeline and search.  

- <a href ='https://twitterclone-api.herokuapp.com/'>API Link</a> 

- <a href='https://documenter.getpostman.com/view/9048286/SzYbzHbW?version=latest'>Postman API Documentation</a> 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project was built with NodeJs on MongoDB database. Ensure you have <a href='https://nodejs.org/en/'>Node</a> installed on your local machine to proceed. A local mongo db database or a cloud account on <a href='https://cloud.mongodb.com'>Atlas - MongoDB cloud</a> is required.

Fork this repo to your repo and clone to download using 
```
~ git clone `https://github.com/<your_github_username>/twitter-clone-api.git`
```

### Installing
All the required dependencies are in the package.json file, to get a copy on your local machine simply run 
```
 ~ npm install 
```
The project uses a .env file to store some variables see the .envExample file for the structure and create a copy in the root directory. 

At this point to get the server running all is required is to use 
```
~ npm run dev 
```
Note that nodemon is installed, and it watches for file changes and refreshes the server automatically on every file change.

## Approach to the project 

I would briefly walk you through the approach adopted in building this project by breaking the project into Five parts - Authorization, Tweets, Reply, Search and Relationships(Followers). 

- Authorization 
 - Username, email and Password are required field for registration, the password(which must be atleast 8 characters long) is encrypted using bcrypt before storing in the database. The Username and Email are unique fields on the schema hence no two users can register with the same credentials. 
 - Username and password are required fields to login. Bcrypt is used to decrypt and compare the passwords before granting access to the user. On successfull login a jsonwebtoken is generated for the user to be used to access other routes.
 - A validate token middleware is used to check the token before the user is given access to other resources. The middleware checks that the token is available, was signed from the server and is still within the validity period(not expired) eith the appropraite response returned to the user 

 - Tweet 
  - Only logged in users authorized by the auth middleware are allowed to access this route to create a tweet. A reference to the user via thier id is saved in the tweet model as ownerId(foreign key)
  - Logged in users can view thier own tweets and every other tweet on the system but thier timeline is only populated with thier tweet and that of users they have a relationship(following/ followers) with. 

  - Reply 
   - Only logged in users auth authorized by the auth middleware are allowed to access this route to reply to a tweet. The tweet Id is passed as a paramater when replying to a tweet 

  - Search
    - Logged in users can search for tweets, users, or replies using this route. 

   - Followers 
    -  Only logged in users auth authorized by the auth middleware are allowed to access this route to follow a user and follow users back.
    - Followers and following are used to filter a users timeline to tweets from this group 
    

## Running the tests

The tests have been written using Jest and Supertest. The test script can be triggered with 
```
~ npm run test
```
Test files are stored in the /__tests__/ folder in the same directory as the controller being tested. 

This <a href='https://documenter.getpostman.com/view/9048286/SzYbzHbW?version=latest'>Postman API Documentation</a> contains all the routes, a short description and examples to show response codes for each route. 


## Deployment

Travis CI is used for Continous Integration and Delivery - ensuring that the all tests are successful before deploying to the Heroku server. 
This api has been deployed to heroku server and can be accessed via this <a href ='https://twitterclone-api.herokuapp.com/'>link</a> 


## Authors

* **Oluwamayowa Fadairo** - *Initial work* - [OluwmayowaF](https://github.com/OluwmayowaF)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
