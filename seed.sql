-- Data for department table --
INSERT INTO department (name) values 
('Management'),
('Human Resources'),
('Sales'),
('Accounting'),
('Product Oversight'),
('Reception'),
('Warehouse'),
('Temp');

-- Data for role table --
INSERT INTO role (title, salary, department_id) values 
('Regional Manager', 75000, 1),
('Sales', 55000, 3),
('Secretary', 45000, 6),
('Assistant Regional Manager', 60000, 3),
('Lead Accountant', 60000, 4),
('Accountant', 55000, 4),
('Quality Control', 50000, 5),
('Receptionist', 45000, 6),
('Human Relations', 60000, 2),
('Temp', 25000, 8),
('Customer Relations', 47000, 2),
('Warehouse', 40000, 7),
('Supplier Relations', 58000, 5);

-- Data for employee table --
INSERT INTO employee (first_name, last_name, role_id) values 
('Michael', 'Scott', 1), 
('Jim', 'Halpert', 2), 
('Pam', 'Beesly', 3), 
('Dwight', 'Schrute', 4), 
('Angela', 'Martin', 5),
('Kevin', 'Malone', 6),
('Creed', 'Bratton', 7),
('Erin', 'Hannon', 8),
('Andy', 'Bernard', 2),
('Stanley', 'Hudson', 2),
('Toby', 'Flenderson', 9),
('Ryan', 'Howard', 10),
('Kelly', 'Kapoor', 11),
('Darryl', 'Philbin', 12),
('Phyllis', 'Vance', 2),
('Oscar', 'Martinez', 5),
('Meredith', 'Palmer', 13);

-- Set Managers --
UPDATE employee SET manager_id = 2 WHERE id = 1;
UPDATE employee SET manager_id = 3 WHERE id = 4;
UPDATE employee SET manager_id = 12 WHERE id = 11;



