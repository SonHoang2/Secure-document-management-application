# Secure Document Management System

## Overview
The Secure Document Management System is a powerful and secure app designed to efficiently manage, store, and share documents. It ensures the confidentiality, integrity, and availability of documents through advanced security measures.

## Technologies
- Frontend: React Native
- Backend: NodeJS, Express
- Database: Redis, PortgresSQL, Sequelize

## Features
- **User Authentication**: Provides a secure system for login, registration, logout, password resets, and forgotten password recovery.
- **Role-Based Access Control**: Implements access levels tailored to user roles, ensuring appropriate permissions for each role.
- **Document Management**: Supports full CRUD operations for documents, including uploading, searching, and efficient management.
- **User Management**: Allows CRUD operations for user profiles and account details.
- **Audit Logs**: Accessible only to administrators, providing detailed logs of user activities for monitoring and compliance.
- **Document and User Insights**: Enables retrieval of a user's recently accessed documents and lists documents owned by the user.

## Security Measures
- **Password Hashing**: Uses bcrypt to securely hash passwords, preventing unauthorized access to user accounts.
- **Password Policy**: Enforces strong password requirements, ensuring passwords are 12-20 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
- **JWT Authentication**: Implements JSON Web Tokens for secure user authentication and authorization.
- **XSS Protection**: Guards against Cross-Site Scripting attacks by sanitizing user input and output.
- **Rate Limiting**: Limits the number of requests per user to prevent abuse and protect against DDoS attacks.
- **Secure Cookies**: Sets the `Secure`, `HttpOnly`, and `SameSite` flags on cookies to prevent session hijacking and cookie theft.
- **CORS Protection**: Prevents unauthorized access to resources by enforcing strict CORS policies.
- **SQL Injection Prevention**: Uses Sequelize ORM to prevent SQL injection attacks and ensure secure database operations.
- **File Upload Security**: Validates file types and sizes to prevent malicious file uploads.
- **Document Encryption**: Encrypts all documents with AES-256 encryption to ensure confidentiality and data protection.

## Author
Hi, I'm the creator and maintainer of this project. I'm passionate about software development and always eager to improve. If you find this project helpful, please consider giving it a star ⭐ – your support means a lot!  

If you encounter any bugs or issues, feel free to report them via email. I appreciate your feedback!  

📧 **Email:** naruto3285@gmail.com
