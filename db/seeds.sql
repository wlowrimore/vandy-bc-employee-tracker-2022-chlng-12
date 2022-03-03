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
  ('Sales', 28000, 4),
  ('Sales', 28000, 5),
  ('Admin/Sales', 55000, 5),
  ('Instructor', 25000, 6),
  ('Luthier', 72000, 7),
  ('Associate', 32000, 8);

INSERT INTO employee (first_name, last_name, manager_id)
VALUES
  ('John', 'Lovelace', 1),
  ('Daniel', 'Lawrence', 1),
  ('David', 'Flannigan', 2),
  ('Brent', 'Woolridge', 3),
  ('Jason', 'Hutchison', 3),
  ('Zack', 'Freeman', 3),
  ('Michael', 'Grant', 1),
  ('Roberto', 'Solarez', 2),
  ('Todd', 'Seynour', 2),
  ('Joseph', 'Restrado', 2);
  