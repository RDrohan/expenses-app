# Expenses Tracking App

This is a simple Expenses Tracking application built with Next.js, TypeScript, Prisma, Formik, and Tailwind CSS.

## Features

- Add, update, and delete expenses.
- View a list of expenses.

## Technologies Used

- Next.js: React framework for building web applications.
- TypeScript: A superset of JavaScript that adds static types to the language.
- Prisma: Database toolkit for TypeScript and Node.js.
- Formik: Form library for React applications.
- Tailwind CSS: Utility-first CSS framework for building custom designs quickly.

## Getting Started

To get a local copy up and running, follow these steps:

### Clone the repository:

```bash
git clone https://github.com/yourusername/expenses-app.git
```

### Install dependencies:

```bash
cd expenses-app
npm install
```

### Set up the PostgreSQL database:

To set up a PostgreSQL connection for your Next.js app, you'll typically need to follow these steps:

* Install PostgreSQL:
Make sure PostgreSQL is installed on your system. You can download and install it from the [official PostgreSQL website](https://www.postgresql.org/download/).

* Create a Database:
Open your PostgreSQL command-line interface (CLI) or use a GUI tool like pgAdmin, and create a new database for your Next.js app:

```sql
CREATE DATABASE your_database_name;
```

* Configure Prisma:
You'll need to configure Prisma to connect to your PostgreSQL database. In your schema.prisma file, update the datasource block with your PostgreSQL connection URL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // Update this with your PostgreSQL connection URL
}
```

* Environment Variables:
It's good practice to use environment variables for sensitive information like database credentials. Create a .env file in your project's root directory and add your PostgreSQL connection URL:

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
```

Replace username, password, and your_database_name with your actual PostgreSQL credentials and database name.

* Prisma Client Generation:
Generate the Prisma client by running the following command in your terminal:

```bash
npx prisma generate
```

This will generate the necessary TypeScript types and Prisma client for interacting with your PostgreSQL database.

* Test the Connection:
You can now test your PostgreSQL connection by running your Next.js app. If everything is configured correctly, your app should be able to connect to the PostgreSQL database and perform CRUD operations using Prisma.

### Run migrations:

```bash
npx prisma migrate dev --name init
```

### Start the development server:

```bash
npm run dev
```
The application should now be running on [http://localhost:3000](http://localhost:3000).
