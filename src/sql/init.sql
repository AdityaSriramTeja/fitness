CREATE TABLE Admin(
  username TEXT UNIQUE NOT NULL PRIMARY KEY,
  password TEXT NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE Trainer(
  username TEXT UNIQUE NOT NULL PRIMARY KEY,
  password TEXT NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE Room(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE Schedule_Slot(
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  starting_time TIME NOT NULL,
  ending_time TIME NOT NULL
);

CREATE TABLE Class(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  is_group_class BOOLEAN NOT NULL,
  room_id INT,
  schedule_slot_id INT,
  trainer_username TEXT,
  FOREIGN KEY (schedule_slot_id) REFERENCES Schedule_Slot(id),
  FOREIGN KEY (room_id) REFERENCES Room(id),
  FOREIGN KEY (trainer_username) REFERENCES Trainer(username)
);

CREATE TABLE Member(
  username TEXT UNIQUE NOT NULL PRIMARY KEY,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  outstanding_balance INT NOT NULL,
  enrolled_class_id INT, -- NULL if not enrolled
  FOREIGN KEY (enrolled_class_id) REFERENCES Class(id)
);

CREATE TABLE Achievements_Log(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  username TEXT,
  FOREIGN KEY (username) REFERENCES Member(username)
);

CREATE TABLE Health_Profile(
  health_profile_id SERIAL PRIMARY KEY,
  weight INT NOT NULL,
  average_sleep INT NOT NULL,
  average_calories_burnt INT NOT NULL,
  gender TEXT NOT NULL,
  age INT NOT NULL,
  username TEXT,
  FOREIGN KEY (username) REFERENCES Member(username)
);

CREATE TABLE Equipment(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  needs_maintenance BOOLEAN NOT NULL,
  room_id INT,
  FOREIGN KEY (room_id) REFERENCES Room(id)
);

CREATE TABLE Exercise_Routine_Log(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  num_reps INT NOT NULL,
  username TEXT,
  FOREIGN KEY (username) REFERENCES Member(username)
);

CREATE TABLE Fitness_Goal(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  username TEXT,
  FOREIGN KEY (username) REFERENCES Member(username)
);


-- INSERT INTO Students (first_name, last_name, email, enrollment_date) VALUES
--   ('John', 'Doe', 'john.doe@example.com', '2023-09-01'),
--   ('Jane', 'Smith', 'jane.smith@example.com', '2023-09-01'),
--   ('Jim', 'Beam', 'jim.beam@example.com', '2023-09-02');