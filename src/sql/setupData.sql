INSERT INTO Admin (username, password, name) VALUES
  ('admin1', 'admin1', 'Quinlan'),
  ('admin2', 'admin2', 'Chibuzo');

INSERT INTO Trainer (username, password, name) VALUES
  ('trainer1', 'trainer1', 'Qiu'),
  ('trainer2', 'trainer2', 'Carson'),
  ('trainer3', 'trainer3', 'Laurie');

INSERT INTO Trainer_Availability (day, starting_time, trainer_username) VALUES
  ('Monday', '09:00:00', 'trainer1'),
  ('Monday', '11:00:00', 'trainer1'),
  ('Tuesday', '10:00:00', 'trainer1'),
  ('Wednesday', '11:00:00', 'trainer1'),
  ('Monday', '12:00:00', 'trainer2'),
  ('Tuesday', '13:00:00', 'trainer2'),
  ('Wednesday', '14:00:00', 'trainer2'),
  ('Monday', '15:00:00', 'trainer3'),
  ('Tuesday', '16:00:00', 'trainer3'),
  ('Wednesday', '17:00:00', 'trainer3');

INSERT INTO Room (name) VALUES
  ('Algonquin Gym'),
  ('Carleton Gym'),
  ('Ottawa Gym');

INSERT INTO Class (name, is_group_class, room_id, day, starting_time, trainer_username) VALUES
  ('Zero To Hero', TRUE, (SELECT id FROM Room WHERE name = 'Algonquin Gym'), 'Monday', '09:00:00', 'trainer1'),
  ('Hero To Zero', TRUE, (SELECT id FROM Room WHERE name = 'Carleton Gym'), 'Tuesday', '12:00:00', 'trainer2'),
  ('Zero to Zero', TRUE, (SELECT id FROM Room WHERE name = 'Ottawa Gym'), 'Monday', '15:00:00', 'trainer3'),
  ('Hero to Hero', FALSE, (SELECT id FROM Room WHERE name = 'Algonquin Gym'), 'Monday', '10:00:00', 'trainer1'),
  ('Some Random Class', FALSE, (SELECT id FROM Room WHERE name = 'Carleton Gym'), 'Tuesday', '13:00:00', 'trainer2');

INSERT INTO Member (username, password, name, outstanding_balance, enrolled_class_id) VALUES
  ('member1', 'member1', 'Akuchi', 0, 1),
  ('member2', 'member2', 'Onyx', 0, 2),
  ('member3', 'member3', 'Cyan', 0, 3),
  ('member4', 'member4', 'Olayinka', 0, 4),
  ('member5', 'member5', 'Ora', 0, NULL);

INSERT INTO Achievements_Log (name, description, date, username) VALUES
  ('Arms of Steel', 'Bench Pressed 225lb', '2021-02-03', 'member1'),
  ('Legs of Iron', 'Did a 10k run', '2024-05-06', 'member2');

INSERT INTO Health_Profile (weight, average_sleep, average_calories_burnt, gender, age, username) VALUES
  (110, 1, 1100, 'M', 21, 'member1'),
  (120, 2, 1200, 'F', 22, 'member2'),
  (130, 3, 1300, 'M', 23, 'member3'),
  (140, 4, 1400, 'F', 24, 'member4'),
  (150, 5, 1500, 'M', 25, 'member5');

INSERT INTO Equipment (name, needs_maintenance, room_id) VALUES
  ('Dumbbells', FALSE, (SELECT id FROM Room WHERE name = 'Algonquin Gym')),
  ('Squat Rack', TRUE, (SELECT id FROM Room WHERE name = 'Carleton Gym')),
  ('Cycling Machine', FALSE, (SELECT id FROM Room WHERE name = 'Ottawa Gym'));

INSERT INTO Exercise_Routine_Log (name, date, num_reps, username) VALUES
  ('Benchpressing', '2021-02-03', 10, 'member1'),
  ('Jumping In The Air', '2024-05-06', 20, 'member2');

INSERT INTO Fitness_Goal (name, description, date, username) VALUES
  ('Have a 6-pack', 'This will require doing many sit-ups.', '2021-02-03', 'member1'),
  ('Can jump more then 2.5 meters high', 'This will require lots of leg strength.', '2024-05-06', 'member2');

INSERT INTO Transactions (name, username, amount, date) VALUES
  ('Membership Fee', 'member1', 20, '2021-02-03');
