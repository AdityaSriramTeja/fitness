import { drizzle } from "drizzle-orm/postgres-js";
// import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const queryClient = postgres(`postgres://${process.env.PG_USERNAME}@${process.env.PG_URL}:${process.env.PG_PORT}/${process.env.PG_DB}`);
const db = drizzle(queryClient);

export default db;
