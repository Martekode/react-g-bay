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
    - Unhandled get requests not caught by our errorHandler will route you to the homepage of the app
- ERRORS:
    - If any error occurs. The api will return an errormessage. The first value of this error message will always be a boolean called _error_ set to true!
        - ERROR:400 Bad Request
            - When encountering this error something went wrong in the request, usually more info will be provided in the response.
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
#### Get All Products By Email
````js
api/product/all/owner/email/:email
````
### POST
#### Add a product with Owner-ID
Adding a new product can be done trough a POST request on the following endpoint
```js
/api/product/new
```
The request will only be accepted if it contains a body with:
```json
"ownerId","name","price","description","imageUrl","category"
```
The category can only be one of following string values: On any other value the product wil not be added to the database and you will receive an error (this check is not case sensitive as any entered value will be transformed to a lower case string)
```js
['cards', 'miniatures', 'gaming', 'anime', 'boardgames', 'comics', 'dungeons and dragons', 'other']
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
!!!! THE PRODUCT RETURNED HERE WILL BE REMOVED IN PRODUCTION DO NOT RELY ON THIS AS THIS REQUIRES MULTIPLE FETCHES SERVER SIDE EVEN IF ITS NOT USED
Example:
```json
{
    "AddedProductId:": "47",
    "AddedProduct: ": {
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
#### ADD a product using user email as identifier!
Just like above you can add a new product, but avoid fetching the user's ID in case you don't have it already by just using the user's email.
- Endpoint:
```js
/api/product/newbyemail
```
- Expected body consists of the same as above but instead you will supply an email instead of the owner_id
- Example of an accepted body:
```json
{
    "email":"Brian@gbay.org",
    "name":"Product added using email as user identifier",
    "price":900,
    "description":"This query broke my brain, but it works.",
    "image_url":"https://c.tenor.com/w-PCA2wkMQEAAAAM/mind-blown-shocked.gif",
    "category":"other"
}
```
- In the response you will receive the ID of the newly added product in case you need it!
```json
{
    "AddedProductId": "72"
}
- If the email does not exist you  will get an error telling you you provided a bad email, if you get another error please let us know!
```
#### Get all products for a user by User Email
This endpoint accepts an email and returns all the products for the user associated with that email. (If you want to keep the user's email private we suggest using this endpoint to make this request instead of passing it trough a url) - Tough this may be slower than the Get method(WIP)
```js
/api/product/all/owner/email
```
- This endpoint expects you to provide an email
- If the email is not found in the database you will not be provided an error since this is not possible without overloading the database. It will return an empty array tough
    - If you want to check if an email exists you can use one of the User endpoints

- Example of the expected Body for this endpoint in JSON!
```json
{
    "email":"Michael@gbay.org"
}
```
- Example of the response you can get when using this endpoint:
```json
[
    {
        "id": 4,
        "owner_id": 3,
        "name": "Strawberry",
        "price": "2",
        "description": "Fresh Strawberry",
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Aardbei_Karina.jpg?uselang=nl",
        "category": "Fruit"
    },
    {
        "id": 32,
        "owner_id": 3,
        "name": "tessdftio",
        "price": "586",
        "description": "OverffffRated",
        "image_url": "https://assets.pokemon.com/assets/cms2/img/lalaland.png",
        "category": "APItest"
    }
]
```
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
/api/user/new
```
This endpoint returns the newly created user ID and the complete user object in the db
- Example of expected body:
```json
{
    "username":"Example",
    "email":"example@email.com",
    "image_url":"IF_THIS_URL_IS_NOT_VALID_I_WILL_GET_DEFAULT_IMAGE"
}
```
**!!!REQUESTS WITHOUT IMAGE_URL WILL RESOLVE TO A DEFAULT IMAGE!!!**
```
- Example of a response:
```json
{
    "DbId:": "32",
    "UserObject:": {
        "id": 32,
        "name": "Example",
        "email": "example@email.com",
        "image_url": "IF THIS IS NO VALID URL YOU WILL GET DEFAULT IMAGING"
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
        "image_url": "default_image"
    }
}
```
#### CHECK IF EMAIL EXISTS TROUGH POST - SAFER FOR USER INFORMATION
this endpoint returns true/false based on wether the user exists in the database. make sure to have an email value in the body of your http POST request :) 
```
/api/user/check/email
```
- Example of expected body
```json
{
    "email":"tdsdfest@test.com"
}
```
***
### PUT
#### Update username by ID
This endpoint will allow you to change a user's name by providing the userid and the newname 
```js
/api/user/update/byid/name
```
this endpoint returns the updated user object
- Example of expected body:
```json
{
    "userid":"5",
    "newname":"Example"
}
```
#### Update username by Email
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
#### UPDATE USER IMAGE BY ID
this endpoint allows you to change a user's image_url by providing the user's id and the new image url. This url still has to be valid!
```js
/api/user/update/byid/image
```
- Example of expected body: 
```json
{
    "userid":"5",
    "image_url":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
}
```

#### UPDDATE USER IMAGE BY EMAIL
This does the same as above but you can use the user's email
```js
/api/user/update/byid/image
```
- Example of expected body:
```json
{
    "email":"test@test.com",
    "image_url":"https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
}
```
#### CONCLUDING A SALE
this endpoint will conclude a sale, it expects the seller's id, product's id and buyer's id and will do a couple things in following steps:
1. See if all id's are valid
    - Maybe the product was just sold ? -> BadId error
2. Send an email to the buyer confirming their order
3. Send an email to the seller informing them their product was sold
4. Remove the traded product from the database
```js
/api/product/sale
```
Since I couldn't find a way to actually send emails without a budget, I used a suggested online free service purposed for testing. if the customer would like to invest in a mailing system dependant on spoken scale it can be implemented
    - Startign prices are affordable, but if the site scales prices go up quickly.
- Example of expected body:
```json
{
    "seller_Id":2,
    "buyer_Id":1,
    "product_Id":4
}
```
In the response you will receive:
```json
{
    "salecompleted": true,
    "MailSentToBuyer": "https://ethereal.email/message/Ywf1IqO0.rMF3SjhYwf1IsVsBJHclD.XAAAAASHxVKO1Oc8JdEhxtKpB8Ls",
    "MailSentToSeller": "https://ethereal.email/message/Ywf1IqO0.rMF3SjhYwf1I0R08nemO63RAAAAAqxANxCNWbu09ubXJL3v-b8",
    "SoldProduct": {
        "id": 75,
        "owner_id": 4,
        "name": "Product added using email as user identifier",
        "price": "900",
        "description": "This query broke my brain, but it works. Altough you might get SQL errors when providing a bad email!",
        "image_url": "https://c.tenor.com/w-PCA2wkMQEAAAAM/mind-blown-shocked.gif",
        "category": "other"
    }
}
```
- This product is destroyed when this request is completed, it will not be fetchable anymore once this request is made

- The url's will show you the email that could be sent to the seller/buyer

- This request takes a while, as it's pretty sketchy to send the emails :p

###
### DELETE
**Happy Coding!**