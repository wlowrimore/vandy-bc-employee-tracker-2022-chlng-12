INSERT INTO department (dep_name)
VALUES
  ('Electric Guitars'),
  ('Acoustic Guitars'),
  ('Basses'),
  ('Effects Pedals'),
  ('Pickups'),
  ('Accessories'),
  ('Internet Sales'),
  ('Lessons'),
  ('Repairs'),
  ('Shipping/Receiving');

  INSERT INTO role (title, salary, department_id)
  VALUES
    ('Store Manager', 8000000, 01),
    ('Supervisor', 6500000, 02),
    ('Department Manager', 4000000, 03),
    ('Sales', 2800000, 04),
    ('Admin/Sales', 5500000, 05),
    ('Luthier', 7200000, 06),
    ('Instructor', 2500000, 07),
    ('Associate', 3200000, 08);