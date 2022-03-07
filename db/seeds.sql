INSERT INTO department (dep_name)
VALUES
  ('Logistics'),
  ('Floor'),
  ('Inventory/Orders'),
  ('Instruments/Accessories'),
  ('Internet Sales'),
  ('Lessons'),
  ('Repairs'),
  ('Shipping/Receiving');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Store Manager', 80000, 1),
  ('Supervisor', 65000, 2),
  ('Department Manager', 60000, 3),
  ('Sales', 28000, 4),
  ('Admin/Sales', 55000, 5),
  ('Instructor', 25000, 6),
  ('Luthier', 72000, 7),
  ('Associate', 32000, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Lovelace', 1, NULL),
  ('Daniel', 'Lawrence', 2, 1),
  ('David', 'Flannigan', 3, 2),
  ('Brent', 'Woolridge', 4, 3),
  ('Jason', 'Hutchison', 4, 3),
  ('Zack', 'Freeman', 4, 3),
  ('Michael', 'Grant', 5, 1),
  ('Joseph', 'Restrado', 6, 2),
  ('Roberto', 'Solarez', 7, 2),
  ('Todd', 'Seymour', 8, 2);
  