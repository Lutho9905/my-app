This is an API project: REST API, the API handles CRUD(Create, Read, Update, Delete) operations for a list of items.
it uses HTTP module to set up the server and FS module to manage data storage.
REST API endpoints
1 Get items: retrieve a list of items
2 POST items: Add a new item to the list.
3 PUT items/:id: Update an existing item.
4 DELETE items/:id: Remove an item from the list.
Use the FS module to store and retrieve data from a JSON file that acts as your database.
Implement Error Handling:

Use try-catch blocks to handle errors gracefully.
Send appropriate HTTP status codes (e.g., 200 for success, 404 for not found, 500 for server errors).
