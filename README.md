# Contact Book

Contact Book is a full-stack web application for managing personal or professional contacts. It includes a React-based frontend and a Node.js backend powered by Express and Prisma ORM. The application supports user authentication, contact management, and file uploads.

---

## Features

- **User Authentication**: Secure registration and login using JWT.
- **Contact Management**: Add, edit, delete, and view contacts.
- **File Uploads**: Upload profile images for contacts.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **API Integration**: RESTful API for backend communication.
- **Database**: SQLite database with Prisma ORM for schema management.

---

## Project Structure

```
contact-book/
├── contact-book/ (Frontend)
│   ├── src/
│   │   ├── apis/
│   │   ├── components/
│   │   ├── enums/
│   │   ├── models/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
├── contact-book-api/ (Backend)
│   ├── src/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── service/
│   │   ├── validator/
│   │   ├── interface/
│   │   ├── helper/
│   │   └── router/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── dev.db
│   ├── package.json
│   ├── Dockerfile
│   └── index.ts
├── docker-compose.yml
└── README.md
```

---

## Installation

### Prerequisites

- Node.js (v18 or higher)
- Docker (optional for containerized deployment)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd contact-book-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npx prisma migrate dev --name initialize
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd contact-book
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

1. Open the frontend in your browser at `http://localhost:5173`.
2. Register a new account or log in with existing credentials.
3. Add, edit, or delete contacts.
4. Upload profile images for contacts.

---

## Deployment

### Using Docker

1. Build and run the containers:
   ```bash
   docker-compose up --build
   ```
2. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:10000`

---

## Environment Variables

### Backend (`contact-book-api/.env`)

- `DATABASE_URL`: URL for the SQLite database.
- `JWT_SECRET`: Secret key for JWT authentication.

### Frontend (`contact-book/.env`)

- `VITE_API_URL`: Backend API URL.
- `VITE_IMAGE_URL`: Base URL for CDN images.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

---

## Authors

- **[seakhengkhin](https://github.com/seakhengkhin)** - Initial work

Feel free to reach out for any questions or suggestions!
