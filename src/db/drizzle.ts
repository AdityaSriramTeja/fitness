import { drizzle } from "drizzle-orm/postgres-js";
// import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const queryClient = postgres(`postgres://${process.env.POSTGRES_USERNAME}@127.0.0.1:5432/postgres`);
const db = drizzle(queryClient);

export default db;
