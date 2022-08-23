# This Readme contains notes on how to use the backend API for our webapp
A BeCode project. With an ExpressJS nodeJS restful API - MariaDB relational database
## SQL DATABASE
- In the SQL folder you'll find the queries you can run to create both the user and product table to work with this API
NOTE: Since every product needs an owner you will have to add the user_table first!
***
## .ENV
- For the API to work you will have to configure a ```.env``` file.
    - Add this file to the root of the project.
        - In this file you can set the dev server port to any port you like by adding:

```js
PORT=9999
```

    - Use following structure to configure your mariadb database.

```js
DB_HOST=hostname
DB_USER=username
DB_PASSWORD=userpassword
DB_NAME=databasename
```
***
## API
This section contains general information about the API
- RESPONSES:
    - All responses will have a JSON formatted body
    - Unhandled get requests not caught by our errohandler will route you to the homepage of the app
- ERRORS:
    - If any error occurs. The api will return an errormessage. The first value of this error message will always be a boolean called _error_ set to true!
        - ERROR:400 Bad Request
            - When enountering this error somethign went wrong in the request, usually more info will be provided in the response.
            - If you would like another endpoint to suite your request's needs please feel free to contact us!
        - ERROR:500 Internal Server Error
            - There is an error on our end. We are sorry. please provide us with the error message sent in the response!
        - ERROR EXCEPTIONS:
            - When deleting the same product twice. you will get an error 400 bad request, since the product no longer exists.
        - When an error persists. please contact us to enforce a solution!
- ERROR EXAMPLE 400 : Bad Request
```json
{
    "Error": true,
    "Message from DevTeam: ": "One or more parameters were undefined/missing",
    "Error Message:": "undefined",
    "Error:": "Error: undefined"
}
```
- ERROR EXAMPLE 500 : Internal Server Error
```json
{
    "Error": true,
    "Message from DevTeam: ": "Please provide following information when creating a support ticket.",
    "Error Message: ": "responfse is not defined",
    "Error: ": "ReferenceError: responfse is not defined"
}
```
***
## PRODUCT
In this section you will find most info you need to use the ```/api/product/``` endpoint.
### GETTERS
This section contains most info you will need to get data from the product_table!
_To specify query parameters replace :parameter with your parameter, for example localhost:9000/api/product/id/5 will return the product with 5_
#### Get All products
Following endpoint will return all the products in the database with all of their attributes.
```js
/api/product/all
```
#### Get Product By ID 
Returns the unique product that matches the received ID
```js
/api/product/id/:id
```
#### Get Product By Name
Returns all products that match the received name
```js
/api/product/name/:name
```
#### Get Product(s) by category
returns all products belonging to the received category
```js
/api/product/category/:category
```
#### Get All Categories
Returns all categories currently available in the product database
```js
/api/product/categories
```
### POST
Adding a new product can be done trough a POST request on the following endpoint
```js
/api/product/new
```
The request will only be accepted if it contains a body with:
```json
"ownerId","name","price","description","imageUrl","category"
```
Example of a valid and accepted body at this endpoint:
```json
{
    "owner_id":"4",
    "name":"Michael's Childhood Toy Collection",
    "price":"90",
    "description":"Epic toys bruf",
    "image_url":"myimage.webp",
    "category":"Toys"
}
```
**EXTRA**
- The API will respond with a json object containing:
    - The Added product's ID
    - The total Added product as it is stored in the database
Example:
```json
{
    "Added product id:": "47",
    "Added product: ": {
        "id": 47,
        "owner_id": 1,
        "name": "tesdddsdftio",
        "price": "586",
        "description": "OverffffRated",
        "image_url": "https://assets.pokemon.com/assets/cms2/img/lalaland.png",
        "category": "APItest"
    }
}
```
**KNOWN ERRORS- W.I.P**
- Currently Any Category will be accepted, since the set of useable categories has not been defined yet.
- Currently specifying the ID of a non existant used will return a server error - since the user endpoint is still in development

~~**!IMPORTANT!**~~
~~Extra: This request's response will always provide you with the ID of the newly added product.~~

### DELETE
Deleting a product from the database
#### Delete a product by ID
Currently the API only supports deleting products by ID.

```js
/api/product/delete/:id
```
On success the API will return the deleted product to you in JSON format. The product will no longer be available in the database. This action can not be reversed.

~~On success this endpoint will respond with a JSON stringified version of the deleted object. You can use JSON.parse(string) on the string to restructure the JSON object on receival. This product is permanently deleted from the database and can not be restored!~~
***
## USERS
### GET
#### Get User by ID
This getter allows you to retrieve a user object by the user's ID and will return a userobject with it's ID, name, Email, imag_url
```js
/api/user/id/:id
```
- Example response:
```json
{
    "id": 11,
    "name": "teffsffsft",
    "email": "tesfstd@teffst.com",
    "image_url": "ww.image.png"
}
```
#### Get User by Email
This getter allows you to retrieve a user object by the user's Email and will return a user object just like when retrieving it trough ID
```js
/api/user/email/:email
```
#### Get all usernames
This getter will return an array with all usernames currently in the database(Adding the userID here is not hard. if it's usefull please do let us know!)
```js
/api/user/name/all
```
#### Get BOOLEAN - Does this username exist in the database ? 
This getter returns true/false depending if the given username exists in the database
```js
/api/user/name/check/:name
```
#### Get BOOLEAN - Does this email exist in the database ? 
This getter returns true/false depending if the given email exists in the database
```js
/api/user/email/check/:email
```
### POST
#### Create a new User
Here you can create a new user, this endpoint expects a body with a username,email and image_url. The image_url is optional!. 
```
/api/user/api/new
```
This endpoint returns the newly created user ID and the complete user object in the db
- Example of expected body:
```json
{
    "username":"Example",
    "email":"example@email.com",
    "image_url":"this.url.is.optional.png"
}
```
- Also Valid:
```json
{
    "username":"Example",
    "email":"example@email.com",
}
```
- Example of a response:
```json
{
    "DbId:": "32",
    "UserObject:": {
        "id": 32,
        "name": "Example",
        "email": "example@email.com",
        "image_url": "this.url.is.optional.png"
    }
}
```
- Note: EMAIL = Unique in our database. if with any method to create a new user an email already exists you will be greeted with an error. As usual the first value of this error will be the Error boolean, set to true for easier handling.
- Example of Error:
```json
{
    "Error": true,
    "Message from DevTeam: ": "This Email already exists in the database",
    "Error Message:": "mailAlreadyInDB",
    "Error:": "Error: mailAlreadyInDB"
}
```

#### Create a new user by just an email
This endpoint accepts an email and creates a new user just based on the email. IF the email does not exist! The username will be a randomly generated string, the user's picture will be empty
```js
/api/user/newbyemail
```
This endpoint returns the newly created user ID and the complete user object in the db
- Example of expected body:
```json
{
    "email":"example@email.com"
}
```
- Example of what you may receive when creating a user like this
```json
{
    "DbId:": "33",
    "UserObject:": {
        "id": 33,
        "name": "VVXIKEHP",
        "email": "example@emfail.com",
        "image_url": ""
    }
}
```
### PUT
#### Update by ID
This endpoint will allow you to change a user's name by providing the userid and the newname 
```js
/api/user/update/name
```
this endpoint returns the updated user object
- Example of expected body:
```json
{
    "userid":"5",
    "newname":"Example"
}
```
#### Update by Email
This endpoiunt will allow you to change a user's name by proviiding the user's email and the new name
```js
/api/user/update/bymail/name
```
It wil return the updated user object to you
- Example of expected body:
```json
{
    "email":"example@email.com",
    "newname":"Example"
}
```

### DELETE
**Happy Coding!**