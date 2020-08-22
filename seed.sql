DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE department(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,4) NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
PRIMARY KEY (id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
manager_id INT,
FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL,
PRIMARY KEY (id)
);

INSERT INTO department(name)
VALUES("account");

INSERT INTO department(name)
VALUES("procurement");

INSERT INTO department(name)
VALUES("marketing");


INSERT INTO role(title, salary, department_id)
VALUES("accountant",1000.60,1);

INSERT INTO role(title, salary, department_id)
VALUES("purchasing manager",2000.50,2);

INSERT INTO role(title, salary, department_id)
VALUES("marketing manager",2500.40,3);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("steven","simon", 1, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("richard","laizer", 2, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("sharon","stone", 3, 3);

SELECT manager_id, first_name FROM employee INNER JOIN role ON department_id;

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;