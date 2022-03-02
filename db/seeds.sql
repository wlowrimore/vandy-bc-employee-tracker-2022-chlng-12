INSERT INTO department (dep_name)
VALUES
  ('Logistics'),
  ('Floor'),
  ('Insturments'),
  ('Accessories'),
  ('Internet Sales'),
  ('Lessons'),
  ('Repairs'),
  ('Shipping/Receiving');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Store Manager', 80000, 1),
  ('Supervisor', 65000, 7),
  ('Department Manager', 40000, 3),
  ('Sales', 28000, 2),
  ('Admin/Sales', 55000, 4),
  ('Luthier', 72000, 6),
  ('Instructor', 25000, 5),
  ('Associate', 32000, 8);

INSERT INTO employee (first_name, last_name, manager_id)
VALUES
  ('John', 'Lovelace', 10),
  ('Daniel', 'Lawrence', 9),
  ('David', 'Flannigan', 8),
  ('Brent', 'Woolridge', 7),
  ('Michael', 'Grant', 6),
  ('Roberto', 'Solarez', 5),
  ('Joseph', 'Restrado', 4),
  ('Todd', 'Seynour', 3);