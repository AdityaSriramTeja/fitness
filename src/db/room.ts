import { sql } from "drizzle-orm";
import db from "./drizzle";

export type RoomType = {
  id: number;
  name: string;
};

export type RoomBookingType = {
  room_id: number;
  room_name: string;
  trainer_username: string;
  class_name: string;
  day: string;
  time: string;
};

export async function getRoom(): Promise<RoomType[]> {
  const room = await db.execute(sql`select * from Room`);
  return room as unknown as RoomType[];
}

export async function getAvailableRooms(start_time: string): Promise<RoomType[]> {
  const room = await db.execute(
    sql`select distinct r.id,  r.name from Room r  join Class c on r.id = c.room_id WHERE r.id NOT IN (
    SELECT r.id
    FROM Room r
    JOIN Class c ON r.id = c.room_id
    WHERE c.starting_time = ${start_time}
 ) order by r.name asc`
  );
  return room as unknown as RoomType[];
}

export async function getRoomBookings() {
  const bookings = await db.execute(
    sql`SELECT Class.room_id, Room.name as room_name, Class.trainer_username as trainer_username, Class.name as class_name, Class.day, Class.starting_time as time
    FROM Class
    JOIN Room ON Class.room_id = Room.id
    WHERE Class.room_id IS NOT NULL
    ORDER BY room_id, trainer_username, day, time;`
  );
  return bookings as unknown as RoomBookingType[];
}
