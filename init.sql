-- NOT FINAL YET

CREATE TABLE User_Profile(
  user_id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_account_created DATE NOT NULL,
  phone_number TEXT,
  address TEXT,
  email TEXT NOT NULL,
);

CREATE TABLE Member(
  member_id SERIAL PRIMARY KEY,
  outstanding_fees TEXT NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES User_Profile(user_id),
  enrolled_class_ids INT[],
);

CREATE TABLE Exercise_Routine(
  exercise_routine_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  frequency_per_week INT NOT NULL,
  member_id INT,
  FOREIGN KEY (member_id) REFERENCES Member(member_id),
);

CREATE TABLE Achievement(
  achievement_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  member_id INT,
  FOREIGN KEY (member_id) REFERENCES Member(member_id),
);

CREATE TABLE Fitness_goal(
  fitness_goal_id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  member_id INT,
  FOREIGN KEY (member_id) REFERENCES Member(member_id),
);

CREATE TABLE Health_Profile(
  health_profile_id SERIAL PRIMARY KEY,
  weight INT NOT NULL,
  average_sleep INT NOT NULL,
  average_calories_burnt INT NOT NULL,
  average_calories_intake INT NOT NULL,
  gender TEXT NOT NULL,
  age INT NOT NULL,
  member_id INT,
  FOREIGN KEY (member_id) REFERENCES Member(member_id),
);

CREATE TABLE Admin(
  admin_id SERIAL PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES User_Profile(user_id),
);

CREATE TABLE Class(
  class_id SERIAL PRIMARY KEY,
  size INT NOT NULL,
  exercise_type TEXT NOT NULL,
  name TEXT NOT NULL,
  is_group_class BOOLEAN NOT NULL,
  schedule_slot_id INT,
  room_id INT,
  trainer_id INT,
  FOREIGN KEY (schedule_slot_id) REFERENCES Schedule_Slot(schedule_slot_id),
  FOREIGN KEY (room_id) REFERENCES Room(room_id),
  FOREIGN KEY (trainer_id) REFERENCES Trainer(trainer_id),
  student_ids INT[],
);

CREATE TABLE Payment(
  payment_id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  amount INT NOT NULL,
  status TEXT NOT NULL,
  member_id INT,
  class_id INT,
  FOREIGN KEY (member_id) REFERENCES Member(member_id),
  FOREIGN KEY (class_id) REFERENCES Class(class_id),
);

CREATE TABLE Trainer(
  trainer_id SERIAL PRIMARY KEY,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES User_Profile(user_id),
);

CREATE TABLE Room(
  room_id SERIAL PRIMARY KEY,
  booked_schedule_ids INT[],
);

CREATE TABLE Schedule_Slot(
  schedule_slot_id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  starting_time TIME NOT NULL,
  class_id INT,
  FOREIGN KEY (class_id) REFERENCES Class(class_id),
  available_trainer_ids INT[],
);

CREATE TABLE Equipment(
  equipment_id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  needs_maintenance BOOLEAN NOT NULL,
  room_id INT,
  FOREIGN KEY (room_id) REFERENCES Room(room_id),
);

-- INSERT INTO Students (first_name, last_name, email, enrollment_date) VALUES
--   ('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
--   ('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
--   ('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');