# CRUD to shop DB
## Synopsis
This project is an API to manipulate shop project database.
Including functionality to MYSQL DB with:
* Create
* Read
* Update
* Delete

## API reference
#### authenticateAdmin(headers, callback)
```
Checks if the username and the password sent in the headers are correc
and the user has admin privileges
```
#### authenticateUser(headers, callback)
```
Checks if the username and the password sent in the headers are correct
```
#### getCart(headers, callback)
```
Return an object with users's cart (user and password are sent in the headers)
User authentication needed, data sent in the headers
```
#### deleteProductCart(req, callback)
```
Delete the product with the id specified in the DELETE query url
User authentication needed, data sent in the headers
```
#### insertProductCart(req, callback)
```
Inserting a product to the cart receiving {product_id} in the POST body
User authentication needed, data sent in the headers
```
#### getCatgories(callback)
```
Return an object with 'total_products' for each category
```
#### getProducts(categorie_id, callback)
```
Return an object with all products of the category id specified in the query url
```
#### deleteProduct(req, callback)
```
Delete the product with the id specified in the query url
Admin authentication needed
```
#### insertProduct(req, callback)
```
Insert a product by receiving a product object in the POST body
Admin authentication needed
```
#### updateProduct(req, callback)
```
Update a product by receiving a product object in the PUT body
Admin authentication needed
```
#### insertUser(req, callback)
```
Insert a user by receiving its object in the POST body
No authentication needed
```
#### deleteUser(req, callback)
```
Delete a user with the id specified in the query url
Only the user can delete himself
```
#### updateUserPassword(req, callback)
```
Update the user password by receiving a user object in the PUT body
Only the user can update himself
```
### License

MIT
