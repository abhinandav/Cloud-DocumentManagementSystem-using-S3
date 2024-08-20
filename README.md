# Document Management System (DMS)


## Overview

This project is a basic Document Management System (DMS) developed using Django as the backend framework and React for the frontend. The application allows users to upload, view, download, and manage their files in a cloud storage environment. Users can only see and manage their files, ensuring privacy and security.

## Live

https://clouderstorage.vercel.app

## Features

- **User Authentication & Authorization**: Users can sign up, log in, and manage their files securely.
- **File Upload**: Users can upload files of any type. Files can be organized into folders.
- **File Listing**: View a list of uploaded files, organized by folders.
- **File Viewing**: Open and view the contents of uploaded files directly in the app.
- **File Deletion**: Delete files as needed.
- **File Download**: Download files from cloud storage to the local directory.

## Technologies Used

- **Backend**: Django (Python)
- **Frontend**: React (JavaScript)
- **Database**: PostgreSQL
- **Deployment**: AWS
- **Authentication**: Django Allauth / Django Rest Framework JWT

## Installation

### Prerequisites

- Python 3.x
- Node.js and npm
- PostgreSQL database

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/abhinandav/DocumentManagement
   cd DocumentManagement
   ```

2. **Create a virtual environment and activate it:**
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install the required packages:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**
   Create a `.env` file in the project root and add the necessary environment variables (e.g., AWS credentials, database credentials, secret key).

5. **Apply migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```

### Deployment

- Follow the deployment instructions specific to the platform you're using (e.g., Heroku, AWS).
- Ensure all environment variables are correctly set in the production environment.
- Configure static and media file handling for production.

## Usage

1. **Sign Up**: Create an account to start using the document management system.
2. **Upload Files**: Use the file upload feature to upload files into the system.
3. **Manage Files**: Organize files into folders, view them, delete them, or download them as needed.

## Project Structure

- `backend/` - Contains the Django project files.
- `frontend/` - Contains the frontend application files.
- `media/` - Stores uploaded files locally (if not using AWS S3).
- `static/` - Static files for the project.
- `templates/` - Django templates (if applicable).

## Contributing

If you wish to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a Pull Request.

## Contact

If you have any questions or feedback, feel free to reach out at abhinandorg3@gmail.com.

