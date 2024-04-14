## Clone the Repository

Clone the GitHub repository to your local machine using the following command:
`git clone https://github.com/AdityaSriramTeja/fitness.git`

## Navigate to the Project Directory

Navigate into the project directory using the `cd` command: `cd fitness`

## Create the database

Using pgAdmin, create a database, ours is named ```fitness```

## Set up ```.env.local```

Create a copy of ```.env.local.example``` named ```.env.local```

Fill in the 5 fields of the file, for example:

```
PG_USERNAME=postgres
PG_PASSWORD=postgres
PG_URL=127.0.0.1
PG_PORT=5432
PG_DB=fitness
```

## Install Dependencies

Install the project dependencies using npm: `npm install`

## Start the Development Server

Start the Next.js development server using the following command: `npm run dev`

The development server will start, and your Next.js application will be accessible at `http://localhost:3000` by default.

## The DDL, DML, ER Diagram and Relational Schema files are found in the sql directory in root

[VIDEO](https://youtu.be/kRWql9wfKlQ)

[GENERAL REPORT](https://docs.google.com/document/d/1cOtS9KjjumOrKlYP0c_vBwFqMQnBVLeq3WdrlG3lBU8/edit?usp=sharing)
