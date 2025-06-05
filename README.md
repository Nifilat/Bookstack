# Book Recommendation System

A full-stack web application that provides personalized book recommendations to users. The system combines a modern Next.js frontend with a robust Django backend to deliver an engaging book discovery experience.

## 🚀 Technology Stack

### Frontend
- **Next.js** - React framework with TypeScript support
- **TypeScript** - For type-safe code
- **Tailwind CSS** - For styling (based on configuration files present)

### Backend
- **Django** - Python web framework
- **SQLite** - Database (currently used in development)
- **Pipenv** - Python dependency management

## 📋 Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- Pipenv

## 🛠️ Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pipenv install
   ```

3. Activate the virtual environment:
   ```bash
   pipenv shell
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with necessary environment variables (if not already present)

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Access the Application

- Frontend: [https://bookstack-cyan.vercel.app/](https://bookstack-cyan.vercel.app/)
- Backend API: [https://bookstack-be.vercel.app/](https://bookstack-be.vercel.app/)

## 📁 Project Structure

```
book-recommendation/
├── frontend/           # Next.js frontend application
│   ├── src/           # Source code
│   ├── public/        # Static files
│   └── types/         # TypeScript type definitions
│
└── backend/           # Django backend application
    ├── books/         # Books app
    └── backend/       # Project configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details. 