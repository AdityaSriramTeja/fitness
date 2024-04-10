import { sql } from "drizzle-orm";
import db from "./drizzle";

export type TrainerAvailabilityType = {
  username: string;
  password: string;
  name: string;
};

export async function getTrainerAvailabilities(): Promise<TrainerAvailabilityType[]> {
  const slot = await db.execute(sql`select * from Trainer_Availability`);
  return slot as unknown as TrainerAvailabilityType[];
}
