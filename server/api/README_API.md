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
#### Get All Products By Owner Id
````js
/api/product/owner/id/:id
````
#### Get All Product Id's By Email
````

````
### POST
Adding a new product can be done through a POST request on the following endpoint
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
    "ownerId":"4",
    "name":"exampleProduct",
    "price":"5.5",
    "description":"This is an exampleproduct, Look! The price can be a decimal",
    "imageUrl":"https://www.example.io/image.webp",
    "category":"Examples"
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
/api/delete/:id
```
On success the API will return the deleted product to you in JSON format. The product will no longer be available in the database. This action can not be reversed.

~~On success this endpoint will respond with a JSON stringified version of the deleted object. You can use JSON.parse(string) on the string to restructure the JSON object on receival. This product is permanently deleted from the database and can not be restored!~~
***
**Happy Coding!**