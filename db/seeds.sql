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