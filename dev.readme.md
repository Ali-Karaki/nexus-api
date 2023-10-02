# Auth

`POST http://localhost:3001/auth/signup`  
`POST http://localhost:3001/auth/signin`

- input
```json
{
    "email": "admin@nexus.com",
    "password": "admin@nexus.com"
}
```

- output if success: 
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```
- output if error:
```json
{
    "statusCode": 401,
    "message": "Invalid credentials",
    "error": "Unauthorized"
}
// or message array
{
    "statusCode": 400,
    "message": [
        "password should not be empty",
        "password must be a string"
    ],
    "error": "Bad Request"
}
```