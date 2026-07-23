# Use .http files

- Creates and updates `.http` files.
- Sends HTTP requests.
- Displays the responses.

# Requests
The format for an HTTP request.

```
METHOD URL HTTPVersion
```

A file can contain multiple request by using lines with `###` as delimiters.

```http request
GET http://localhost:5000/foo

###

GET http://localhost:5000/bar
```

# Request Headers

To add one or more headers, add each header on its own line after the request line

```http request
GET http://localhost:5000/foo
Cache-Control: max-age=600000
Age: 100
```

> Important
> Do not commit the request with the authenticate header or any secretes

# Request body

Add the request body after a blank line.

```http request
POST http://localhost:5000/foo
Content-Type: application/json

{
    "name": "bar"
}
```

# Comments

Comment lines start with `//`

# Variables

The syntax is `@VariableName=Value`

Use the variable by using `{{VariableName}}`

# Environment files

Create the `http-client.env.json` in same dir of the http file or in parent folder.

See `http-client.env.json` for more detail.

# 

