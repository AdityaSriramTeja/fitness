INSERT INTO Admin (username, password, name) VALUES
  ('admin1', 'admin1', 'Quinlan'),
  ('admin2', 'admin2', 'Chibuzo');

INSERT INTO Trainer (username, password, name) VALUES
  ('qiu_the_trainer', 'qiu_the_trainer', 'Qiu'),
  ('carson_marson', 'carson_marson', 'Carson'),
  ('not_laurie', 'not_laurie', 'Laurie');

INSERT INTO Trainer_Availability (day, starting_time, trainer_username) VALUES
  ('Monday', '09:00:00', 'qiu_the_trainer'),
  ('Monday', '11:00:00', 'qiu_the_trainer'),
  ('Tuesday', '10:00:00', 'qiu_the_trainer'),
  ('Wednesday', '11:00:00', 'qiu_the_trainer'),
  ('Monday', '12:00:00', 'carson_marson'),
  ('Tuesday', '13:00:00', 'carson_marson'),
  ('Wednesday', '14:00:00', 'carson_marson'),
  ('Monday', '15:00:00', 'not_laurie'),
  ('Tuesday', '16:00:00', 'not_laurie'),
  ('Wednesday', '17:00:00', 'not_laurie');

INSERT INTO Room (name) VALUES
  ('Algonquin Gym'),
  ('Carleton Gym'),
  ('Ottawa Gym');

INSERT INTO Class (name, is_group_class, room_id, day, starting_time, trainer_username) VALUES
  ('Zero To Hero', TRUE, (SELECT id FROM Room WHERE name = 'Algonquin Gym'), 'Monday', '09:00:00', 'qiu_the_trainer'),
  ('Hero To Zero', TRUE, (SELECT id FROM Room WHERE name = 'Carleton Gym'), 'Tuesday', '12:00:00', 'carson_marson'),
  ('Zero to Zero', TRUE, (SELECT id FROM Room WHERE name = 'Ottawa Gym'), 'Monday', '15:00:00', 'not_laurie'),
  ('Hero to Hero', FALSE, (SELECT id FROM Room WHERE name = 'Algonquin Gym'), 'Monday', '10:00:00', 'qiu_the_trainer'),
  ('Some Random Class', FALSE, (SELECT id FROM Room WHERE name = 'Carleton Gym'), 'Tuesday', '13:00:00', 'carson_marson');

INSERT INTO Member (username, password, name, outstanding_balance, enrolled_class_id) VALUES
  ('akuchinuts', 'akuchinuts', 'Akuchi', 0, 1),
  ('onyxin', 'onyxin', 'Onyx', 0, 2),
  ('cyanuts', 'cyanuts', 'Cyan', 0, 3),
  ('someuser', 'someuser', 'Olayinka', 0, 4),
  ('oracle', 'oracle', 'Ora', 0, NULL);

INSERT INTO Achievements_Log (name, description, date, username) VALUES
  ('Arms of Steel', 'Bench Pressed 225lb', '2021-02-03', 'akuchinuts'),
  ('Legs of Iron', 'Did a 10k run', '2024-05-06', 'onyxin');

INSERT INTO Health_Profile (weight, average_sleep, average_calories_burnt, gender, age, username) VALUES
  (110, 1, 1100, 'M', 21, 'akuchinuts'),
  (120, 2, 1200, 'F', 22, 'onyxin'),
  (130, 3, 1300, 'M', 23, 'cyanuts'),
  (140, 4, 1400, 'F', 24, 'someuser'),
  (150, 5, 1500, 'M', 25, 'oracle');

INSERT INTO Equipment (name, needs_maintenance, room_id) VALUES
  ('Dumbbells', FALSE, (SELECT id FROM Room WHERE name = 'Algonquin Gym')),
  ('Squat Rack', TRUE, (SELECT id FROM Room WHERE name = 'Carleton Gym')),
  ('Cycling Machine', FALSE, (SELECT id FROM Room WHERE name = 'Ottawa Gym'));

INSERT INTO Exercise_Routine_Log (name, date, num_reps, username) VALUES
  ('Benchpressing', '2021-02-03', 10, 'akuchinuts'),
  ('Jumping In The Air', '2024-05-06', 20, 'onyxin');

INSERT INTO Fitness_Goal (name, description, date, username) VALUES
  ('Have a 6-pack', 'This will require doing many sit-ups.', '2021-02-03', 'akuchinuts'),
  ('Can jump more then 2.5 meters high', 'This will require lots of leg strength.', '2024-05-06', 'onyxin');

INSERT INTO Transactions (name, username, amount, date) VALUES
  ('Membership Fee', 'akuchinuts', 20, '2021-02-03');
