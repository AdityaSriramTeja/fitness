INSERT INTO Admin (username, password, name) VALUES
  ('admin1', 'admin1', 'MrAdmin1'),
  ('admin2', 'admin2', 'MrAdmin2');

INSERT INTO Trainer (username, password, name) VALUES
  ('trainer1', 'trainer1', 'NinjaTrainer1'),
  ('trainer2', 'trainer2', 'NinjaTrainer2'),
  ('trainer3', 'trainer3', 'NinjaTrainer3');

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
  ('Room 1'),
  ('Room 2'),
  ('Room 3');

INSERT INTO Class (name, is_group_class, room_id, day, starting_time, trainer_username) VALUES
  ('Class 1', TRUE, (SELECT id FROM Room WHERE name = 'Room 1'), 'Monday', '09:00:00', 'trainer1'),
  ('Class 2', TRUE, (SELECT id FROM Room WHERE name = 'Room 2'), 'Monday', '12:00:00', 'trainer2'),
  ('Class 3', TRUE, (SELECT id FROM Room WHERE name = 'Room 3'), 'Monday', '15:00:00', 'trainer3'),
  ('Class 4', TRUE, (SELECT id FROM Room WHERE name = 'Room 1'), 'Monday', '10:00:00', 'trainer1'),
  ('Class 5', FALSE, (SELECT id FROM Room WHERE name = 'Room 2'), 'Monday', '13:00:00', 'trainer2');


INSERT INTO Member (username, password, name, outstanding_balance, enrolled_class_id) VALUES
  ('member1', 'member1', 'Bob1', 0, 1),
  ('member2', 'member2', 'Bob2', 0, 2),
  ('member3', 'member3', 'Bob3', 0, 3),
  ('member4', 'member4', 'Bob4', 0, 4),
  ('member5', 'member5', 'Bob5', 0, 5);

INSERT INTO Achievements_Log (name, description, date, username) VALUES
  ('Achievement 1', 'Description 1', '2021-01-01', 'member1'),
  ('Achievement 2', 'Description 2', '2021-01-01', 'member2');

INSERT INTO Health_Profile (weight, average_sleep, average_calories_burnt, gender, age, username) VALUES
  (110, 1, 1100, 'M', 21, 'member1'),
  (120, 2, 1200, 'F', 22, 'member2'),
  (130, 3, 1300, 'M', 23, 'member3'),
  (140, 4, 1400, 'F', 24, 'member4'),
  (150, 5, 1500, 'M', 25, 'member5');

INSERT INTO Equipment (name, needs_maintenance, room_id) VALUES
  ('Equipment 1.1', FALSE, (SELECT id FROM Room WHERE name = 'Room 1')),
  ('Equipment 1.2', TRUE, (SELECT id FROM Room WHERE name = 'Room 2')),
  ('Equipment 2', FALSE, (SELECT id FROM Room WHERE name = 'Room 3'));

INSERT INTO Exercise_Routine_Log (name, date, num_reps, username) VALUES
  ('Routine 1', '2021-01-01', 10, 'member1'),
  ('Routine 2', '2021-01-01', 20, 'member2');

INSERT INTO Fitness_Goal (name, description, date, username) VALUES
  ('Goal 1', 'Description 1', '2021-01-01', 'member1'),
  ('Goal 2', 'Description 2', '2021-01-01', 'member2');