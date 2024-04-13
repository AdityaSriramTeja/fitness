
-- getAvailableRooms() : /db/room.ts
-- This statement queries for all of the available rooms so that the admin can assign a room to the trainer, based on the
-- trainer class' start time. There is an edge case we need to consider:
-- let's assume that these are the available slots: Monday 10:00AM (trainer1), Monday 10:00AM (trainer2), Monday 5:00PM (trainer1), and room1 is booked for monday 10:00AM for tainer1.
-- If trainer2 is being assigned a room for Monday 10:00AM, Room1 will still be displayed as an option (since it's available for Monday 5:00PM)
-- This query fixes those edge cases, since we completely exclude the rooms that start at a given start time.
-- It first selects all the rooms which are a part of the given start_time, and then we are essentially doing a
-- natural join, to query the remaining rooms which are not in that start time by removing the room_ids with the start time (so Room1 is completely removed, even if it's available at 5pm).
-- This prevents the trainer2 from being assigned Room1 which is available for the Monday 5:00PM time slot in the Monday 10:00AM, since it was already booked at Monday 10:00AM for another user.
SELECT DISTINCT r.id,  r.name FROM Room r JOIN Class c ON r.id = c.room_id WHERE r.id NOT IN (
    SELECT r.id
    FROM Room r
    JOIN Class c ON r.id = c.room_id
    WHERE c.starting_time = ${start_time}
 ) order by r.name asc

-- getRoomBookings() : /db/room.ts
-- this query the Class has a room_id, which is a reference to the room's id. A room can only be booked if the Class's room_id is not null.
-- Therefore, to get the details of the class and the rooms, we would have to join both the tables, and only query for classes which have a
-- room id.
SELECT Class.room_id, Room.name as room_name, Class.trainer_username as trainer_username, Class.name as class_name, Class.day, Class.starting_time as time
    FROM Class
    JOIN Room ON Class.room_id = Room.id
    WHERE Class.room_id IS NOT NULL
    ORDER BY room_id, trainer_username, day, time;

--  getClassByDays(days: string[]) : /db/class.ts
-- In our OMR we used drizzle chunks for querying classes that are bookable during the selected days, the purpose of that is to handle SQL injections.
-- After getting all of the classes from all of the days, we then filter out the classes that are not group classes and have only one member (this removes all of the personal classes),
-- since there can only be 1 participant in a personal class. After that, we get the classes which are group classes and have more than 1 member (all the classes that the members can join).
SELECT Class.* FROM Class
LEFT JOIN (SELECT enrolled_class_id,
COUNT(*) AS num_members FROM Member
GROUP BY enrolled_class_id) m ON Class.id = m.enrolled_class_id
 WHERE Class.day IN (
  )  AND NOT (Class.is_group_class = FALSE AND m.num_members = 1) ORDER BY id
  -- If a class is not a group class and has 1 member, it is a personal class and should not be bookable for any other users.
