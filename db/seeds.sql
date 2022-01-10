INSERT INTO employee (first_name, last_name, manager, role_id)
VALUES
('Obi-Wan', 'Kenobi', 'Bob Johnson', 2),
('Anakin', 'Skywalker', 'Bob Johnson', 2),
('Tony', 'Stark', 'Bob Johnson', 3),
('Thor', 'Odinson', 'Bob Johnson', 3),
('Bilbo', 'Baggins', 'Homer Simpson', 4),
('Frodo', 'Baggins', 'Homer Simpson', 4),
('Doc', 'Brown', 'Homer Simpson', 5),
('Marty', 'McFly', 'Homer Simpson', 5),
('Seymour', 'Skinner', 'George Castanza', 6),
('Edna', 'Krabappel', 'George Castanza', 6),
('Edward', 'Snowden', 'George Castanza', 7),
('Edward', 'Scissorhands', 'George Castanza', 7),
('Santa', 'Claus', 'John Adams', 8),
('Jack', 'Frost', 'John Adams', 8),
('Mark', 'Zuckerberg', 'John Adams', 9),
('Elon', 'Musk', 'John Adams', 9),
('Ron', 'Swanson', 'Toby Flenderson', 10),
('Dwight', 'Schrute', 'Toby Flenderson', 10),
('Julius', 'Ceasar', 'Toby Flenderson', 11),
('Genghis', 'Khan', 'Toby Flenderson', 11),
('Bob', 'Johnson', null, 1),
('Homer', 'Simpson', null, 1),
('George', 'Castanza', null, 1),
('John', 'Adams', null, 1),
('Toby', 'Flenderson', null, 1);

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('manager', 1000000.00, 1),
    ('Number Cruncher', 80000.00, 2),
    ('Abicus studier', 100000.00, 2),
    ('Product tester', 200000.00, 3),
    ('Chemist', 300000.00, 3),
    ('Hotdog maker', 400000.00, 4),
    ('Hotdog server', 500000.00, 4),
    ('Monkey trainer', 600000.00, 5),
    ('Monkey superviser', 700000.00, 5),
    ('Complaint taker', 800000.00, 6),
    ('Complaint shredder', 900000.00, 6);


INSERT INTO department (name)
VALUES
    ('mangement'),
    ('Accounting'),
    ('Quality Assurance'),
    ('cafeteria'),
    ('Monkey Care'),
    ('HR');