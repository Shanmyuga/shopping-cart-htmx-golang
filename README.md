# Shopping Cart - HTMX and Golang

This project is a shopping cart application built with HTMX for the frontend, a Golang backend, and MongoDB as the database.

## Project Structure

```
.
├── frontend         # Contains HTMX-based frontend
│   └── index.html   # Starter HTML file
├── backend          # Contains Go-based backend
│   ├── main.go      # Entry point for the server
│   └── database.go  # MongoDB connection setup
├── .gitignore       # Git ignore file
└── README.md        # Project documentation
```

## Setup

### Backend
1. Install Go from [official site](https://golang.org/).
2. Run the application:
    ```sh
    go run backend/main.go
    ```

### Frontend
Simply open the `frontend/index.html` file in your browser.

### MongoDB
1. Install and run MongoDB locally.
2. Modify the connection URI in `backend/database.go` if necessary.

---
"Start simple. Dream big."