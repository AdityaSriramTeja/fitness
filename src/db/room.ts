import { sql } from "drizzle-orm";
import db from "./drizzle";

export type RoomType = {
  id: number;
  name: string;
};

export async function getRoom(): Promise<RoomType[]> {
  const room = await db.execute(sql`select * from Room`);
  return room as unknown as RoomType[];
}

export async function getAvailableRooms(
  start_time: string
): Promise<RoomType[]> {
  const room = await db.execute(
    sql`select distinct r.id,  r.name from Room r left join Class c on r.id = c.room_id WHERE r.id NOT IN (
    SELECT r.id
    FROM Room r
    JOIN Class c ON r.id = c.room_id
    WHERE c.starting_time = ${start_time}
 ) order by r.name asc`
  );
  return room as unknown as RoomType[];
}

export async function updateRoomBooked(
  id: number,
  booked: boolean
): Promise<void> {
  await db.execute(
    sql`update Room set available = ${!booked} where id = ${id}`
  );
}