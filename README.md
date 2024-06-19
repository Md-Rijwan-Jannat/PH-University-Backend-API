# Programming Hero University management ( University management Application API ) -

This is a Node.js application built with Express.js, MongoDB (using Mongoose), and TypeScript.

![Mongoose Model Diagram](https://i.ibb.co/BspVS2p/Screenshot-2024-06-19-104207.png)

<h1 align="center">
  PH University management diagram 🚀
</h1>
<p align="center">
  (NodeJs)
</p>

## Project Overview

The PH University Management System is designed to streamline the process of managing university operations, including student, faculty, and admin management. It provides users with an easy way to manage their profiles, view academic information, and handle administrative tasks. The system also allows administrators to manage departments, faculties, and student records.

### Features

- User authentication and authorization
- Role-based access control (admin, student, faculty)
- Profile creation, retrieval, and management
- Department and faculty management
- Real-time academic information access
- Secure password hashing

## Live URL

You can access the live version of the application [here](https://ph-university-management.vercel.app/).

## Projects model

# Data Model Overview

## User Model

- `_id`: Unique identifier (MongoDB ObjectId).
- `Id`: Auto-generated unique user ID.
- `password`: User password.
- `needsPasswordChange`: Boolean indicating if password change is required.
- `role`: User role (e.g., student, faculty, admin).
- `isDeleted`: Boolean indicating if the user is deleted.
- `createdAt`: Timestamp of user creation.
- `updatedAt`: Timestamp of last update.

## Student Model

- `_id`: Unique identifier (MongoDB ObjectId).
- `Id`: Auto-generated unique student ID.
- `semesterId`: ID of the current semester.
- `password`: Student password.
- `needsPasswordChange`: Boolean indicating if password change is required.
- `role`: User role (always student).
- `name`: Student's name.
- `Gender`: Student's gender.
- `email`: Student's email address.
- `dateOfBirth`: Student's date of birth.
- `contucNo`: Contact number.
- `emergencyNo`: Emergency contact number.
- `presentAddress`: Present address.
- `permanentAddress`: Permanent address.
- `guardian`: Guardian details.
- `localGuardian`: Local guardian details.
- `Status`: Student's status (e.g., active, inactive).
- `profileImage`: URL or path to profile image.
- `academicDepartment`: Associated academic department.
- `isDeleted`: Boolean indicating if the student is deleted.
- `createdAt`: Timestamp of student creation.
- `updatedAt`: Timestamp of last update.

## Faculty Model

- `_id`: Unique identifier (MongoDB ObjectId).
- `Id`: Auto-generated unique faculty ID.
- `password`: Faculty password.
- `needsPasswordChange`: Boolean indicating if password change is required.
- `role`: User role (always faculty).
- `name`: Faculty member's name.
- `Gender`: Faculty member's gender.
- `email`: Faculty member's email address.
- `dateOfBirth`: Faculty member's date of birth.
- `contucNo`: Contact number.
- `emergencyNo`: Emergency contact number.
- `designation`: Faculty member's designation.
- `presentAddress`: Present address.
- `permanentAddress`: Permanent address.
- `status`: Faculty member's status (e.g., active, inactive).
- `profileImage`: URL or path to profile image.
- `academicDepartment`: Associated academic department.
- `academicFaculty`: Associated academic faculty.
- `isDeleted`: Boolean indicating if the faculty member is deleted.
- `createdAt`: Timestamp of faculty creation.
- `updatedAt`: Timestamp of last update.

## AcademicFaculty Model

- `_id`: Unique identifier (MongoDB ObjectId).
- `name`: Name of the academic faculty.
- `isDeleted`: Boolean indicating if the faculty is deleted.
- `createdAt`: Timestamp of faculty creation.
- `updatedAt`: Timestamp of last update.

## AcademicDepartment Model

- `_id`: Unique identifier (MongoDB ObjectId).
- `name`: Name of the academic department.
- `academicFaculty`: Associated academic faculty.
- `isDeleted`: Boolean indicating if the department is deleted.
- `createdAt`: Timestamp of department creation.
- `updatedAt`: Timestamp of last update.

## Admin Model

- `_id`: Unique identifier (MongoDB ObjectId).
- `Id`: Auto-generated unique admin ID.
- `password`: Admin password.
- `needsPasswordChange`: Boolean indicating if password change is required.
- `role`: User role (always admin).
- `name`: Admin's name.
- `Gender`: Admin's gender.
- `email`: Admin's email address.
- `dateOfBirth`: Admin's date of birth.
- `contucNo`: Contact number.
- `emergencyNo`: Emergency contact number.
- `designation`: Admin's designation.
- `presentAddress`: Present address.
- `permanentAddress`: Permanent address.
- `status`: Admin's status (e.g., active, inactive).
- `profileImage`: URL or path to profile image.
- `managementDepartment`: Associated management department.
- `isDeleted`: Boolean indicating if the admin is deleted.
- `createdAt`: Timestamp of admin creation.
- `updatedAt`: Timestamp of last update.

## Semester Model

- `name`: Name of the semester.
- `year`: Year of the semester.
- `code`: Code of the semester.
- `startMonth`: Start month of the semester.
- `endMonth`: End month of the semester.
- `exam`: Exam details of the semester.
- `createdAt`: Timestamp of semester creation.
- `updatedAt`: Timestamp of last update.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Md-Rijwan-Jannat/PH-University-Backend-API.git
   ```

2. Navigate into the project directory:

   ```bash
   cd PH-University-Management-Backend--API
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

## Usage

### Development Mode

To run the application in development mode:

```bash
yarn start:dev
```

This will start the server using `ts-node-dev`, which enables live reloading on code changes.

### Production Mode

To build and run the application in production mode:

1. Build the TypeScript files:

   ```bash
   yarn build
   ```

2. Start the server:
   ```bash
   yarn start:prod
   ```

### Linting and Formatting

To lint the TypeScript files:

```bash
yarn lint
```

To automatically fix linting issues:

```bash
yarn lint:fix
```

To format the TypeScript files using Prettier:

```bash
yarn prettier:format
```

### Testing

This project doesn't have tests set up yet. You can add your own testing framework and write tests accordingly.

### Configuration

This project uses dotenv for environment variable configuration. Create a `.env` file in the root directory and add your environment variables there.

Example `.env` file:

```plaintext
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb+srv://PH-University:4OG0awIgFqZw3Xa8@cluster0.2vwmbn2.mongodb.net/ph-university?retryWrites=true&w=majority&appName=Cluster0
DEFAULT_PASSWORD=PHuniversity36@
PASSWORD_SALT=12
JWT_ACCESS_TOKEN=d484cb6052a25195085e97e243da18871547d990a84ddc7fd707f84aa893fb1d
JWT_REFRESH_TOKEN=64941522a557cddef71dd0930cbcf9e921ea3c78e19fc62ca641087157a906b7a1cad3757a92dcb665f93a466988a5b5851e917157e97d144643e8deaf13dbee
JWT_ACCESS_EXPIRE_IN=1h
JWT_REFRESH_EXPIRE_IN=365d

```

## Dependencies

- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS) with various options.
- **Dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **Zod**: TypeScript-first schema declaration and validation library.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Eslint**: Pluggable JavaScript linter.
- **Prettier**: Opinionated code formatter.

### Good Luck!
