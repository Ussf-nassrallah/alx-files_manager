# Files Manager Project README

## Overview

Welcome to the Files Manager project! This back-end trimester project serves as a comprehensive summary of various essential concepts, including authentication, NodeJS, MongoDB, Redis, pagination, and background processing. The primary objective is to create a user-friendly platform for uploading, managing, and viewing files.

## Project Features

1. **User Authentication via Token:**
   - Secure user authentication using token-based authorization.
   - Users must authenticate to access the files manager functionalities.

2. **List All Files:**
   - Retrieve a list of all uploaded files.
   - Display relevant information about each file, such as name, size, and permissions.

3. **Upload a New File:**
   - Seamlessly upload files to the platform.
   - Supported file types include documents, images, and more.

4. **Change Permission of a File:**
   - Users can modify the permissions of their uploaded files.
   - Permission options may include public, private, or custom settings.

5. **View a File:**
   - View the content of uploaded files directly within the platform.
   - Support for previewing images and documents.

6. **Generate Thumbnails for Images:**
   - Automatically generate thumbnails for uploaded images.
   - Thumbnails enhance the user experience by providing a visual preview.

## Technologies Used

The Files Manager project incorporates the following technologies:

- **NodeJS:**
  - Utilized for building a scalable and efficient server-side application.

- **MongoDB:**
  - The project employs MongoDB as the database for storing file metadata and related information.

- **Redis:**
  - Redis is used for caching and improving the overall performance of the application.

## Getting Started

To get started with the Files Manager project, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Set up a MongoDB database and configure the connection in the project.
4. Configure Redis for caching purposes.
5. Run the application using `npm start`.

## Project Structure

The project follows a modular and organized structure:

- **`src/`**
  - Contains the source code for the project.
  
- **`config/`**
  - Configuration files for connecting to MongoDB, Redis, and other settings.

- **`middlewares/`**
  - Middleware functions for authentication and other processing steps.

- **`services/`**
  - Services for handling file upload, permission changes, and thumbnail generation.

- **`controllers/`**
  - Controllers to handle HTTP requests and interact with the services.

- **`utils/`**
  - Utility functions and helpers used across the project.

## Documentation

For detailed information on how to use each endpoint and the project's functionality, refer to the API documentation provided in the `docs/` directory.

Feel free to explore, contribute, and make this Files Manager project even better! If you encounter any issues or have suggestions, please open an issue on the repository.

Happy coding!
