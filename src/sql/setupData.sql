INSERT INTO Admin (username, password, name) VALUES
  ('admin1', 'admin1', 'MrAdmin1'),
  ('admin2', 'admin2', 'MrAdmin2');

INSERT INTO Trainer (username, password, name) VALUES
  ('trainer1', 'trainer1', 'NinjaTrainer1'),
  ('trainer2', 'trainer2', 'NinjaTrainer2'),
  ('trainer3', 'trainer3', 'NinjaTrainer3');

INSERT INTO Room (name) VALUES
  ('Room 1'),
  ('Room 2'),
  ('Room 3');

INSERT INTO Schedule_Slot (date, starting_time, ending_time) VALUES
  ('2021-01-01', '08:00:00', '09:00:00'),
  ('2021-01-01', '09:00:00', '10:00:00'),
  ('2021-01-01', '10:00:00', '11:00:00'),
  ('2021-01-01', '11:00:00', '12:00:00'),
  ('2021-01-01', '12:00:00', '13:00:00');

INSERT INTO Class (name, is_group_class, room_id, schedule_slot_id, trainer_username) VALUES
  ('Class 1', TRUE, 1, 1, 'trainer1'),
  ('Class 2', TRUE, 2, 2, 'trainer2'),
  ('Class 3', TRUE, 3, 3, 'trainer3'),
  ('Class 4', TRUE, 1, 4, 'trainer1'),
  ('Class 5', FALSE, 2, 5, 'trainer2');

INSERT INTO Member (username, password, name, outstanding_balance, enrolled_class_id) VALUES
  ('member1', 'member1', 'Bob1', 0, 1),
  ('member2', 'member2', 'Bob2', 0, 2),
  ('member3', 'member3', 'Bob3', 0, 3),
  ('member4', 'member4', 'Bob4', 0, 4),
  ('member5', 'member5', 'Bob5', 0, 5);

INSERT INTO Achievement (name, description, date, username) VALUES
  ('Achievement 1', 'Description 1', '2021-01-01', 'member1'),
  ('Achievement 2', 'Description 2', '2021-01-01', 'member2');

INSERT INTO Health_Profile (weight, average_sleep, average_calories_burnt, gender, age, username) VALUES
  (110, 1, 1100, 'M', 21, 'member1'),
  (120, 2, 1200, 'F', 22, 'member2'),
  (130, 3, 1300, 'M', 23, 'member3'),
  (140, 4, 1400, 'F', 24, 'member4'),
  (150, 5, 1500, 'M', 25, 'member5');

INSERT INTO Equipment (name, needs_maintenance, room_id) VALUES
  ('Equipment 1.1', FALSE, 1),
  ('Equipment 1.2', TRUE, 1),
  ('Equipment 2', FALSE, 2);

INSERT INTO Exercise_Routine (name, date, num_reps, username) VALUES
  ('Routine 1', '2021-01-01', 10, 'member1'),
  ('Routine 2', '2021-01-01', 20, 'member2');

INSERT INTO Fitness_Goal (name, description, date, username) VALUES
  ('Goal 1', 'Description 1', '2021-01-01', 'member1'),
  ('Goal 2', 'Description 2', '2021-01-01', 'member2');