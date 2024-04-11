import { sql } from "drizzle-orm";
import db from "./drizzle";

export type TrainerAvailabilityType = {
  id: string;
  day: string;
  starting_time: string;
  trainer_username: string;
};

export async function getTrainerAvailabilities(trainer_username: string): Promise<TrainerAvailabilityType[]> {
  const slot = await db.execute(sql`select * from Trainer_Availability where trainer_username = ${trainer_username}`);
  return slot as unknown as TrainerAvailabilityType[];
}

export async function getTrainerAvailabilitiesByDay(
  day: string
): Promise<TrainerAvailabilityType[]> {
  const slot = await db.execute(
    sql`select * from Trainer_Availability where day = ${day}`
  );
  return slot as unknown as TrainerAvailabilityType[];
}


export async function createTrainerAvailability(trainer_username: string, day: string, starting_time: string): Promise<void> {
  await db.execute(sql`insert into Trainer_Availability (trainer_username, day, starting_time) values (${trainer_username}, ${day}, ${starting_time})`);
}

export async function deleteTrainerAvailability(trainer_username: string, day: string, starting_time: string): Promise<void> {
  await db.execute(sql`delete from Trainer_Availability where trainer_username = ${trainer_username} and day = ${day} and starting_time = ${starting_time}`);
}
