//const {allDepartments, addDepartment} = require('./lib/departments.js');
const inquirer = require ( 'inquirer');
const connection = require('./db/connection');
require ('console.table');

// This function is the source of the program everything is run through here
function start() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'choose',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'Exit']
        }
    ])
    .then((answer) => {
        if (answer.choose === 'view all departments') {
            allDepartments(); 
        }
        else if (answer.choose === 'view all roles') {
            allRoles();
        }
        else if (answer.choose === 'view all employees') {
            allEmployees();
        }
        else if (answer.choose === 'add a department') {
            addDepartment();
        }
        else if (answer.choose === 'add a role') {
            addRole();
        }
        else if (answer.choose === 'add an employee') {
            addEmployee();
        }
        else if (answer.choose === 'update an employee role') {
            updateEmployeeRole();
        }
        else {
            console.log('Thank you goodby!');
            process.exit();
        }
    })
};

//This function get all the data from the departments table
function allDepartments() {
    connection.promise().query(
        'SELECT * FROM department'
    )
    .then(([rows]) => {
        let departments = rows;

        console.table(departments);
    })
    .then(() => {
        start();
    })
};

// This function gets all the data from the roles table and joins with the department
// table's id field.
function allRoles() {
    connection.promise().query(
        `SELECT roles.id, roles.title, department.name AS department, 
        roles.salary FROM roles LEFT JOIN department on roles.department_id = 
        department.id;`
    )
    .then(([rows]) => {
        let roles = rows;

        console.table(roles);
    })
    .then(() => {
        start();
    })
};

//This function gets all the data from the employee table, and join with the roles table's
// id field.
function allEmployees() {
    connection.promise().query(
        `SELECT employee.id, employee.first_name, employee.last_name, 
        employee.manager, roles.title FROM employee LEFT JOIN roles on 
        employee.role_id = roles.id;`
    )
    .then(([rows]) => {
        let employees = rows;

        console.table(employees);
    })
    .then(() => {
        start();
    })
};

// This function allows the user to add a department to the department table, by using the
// inquirer module to request and collect user input.
function addDepartment() {
    inquirer
    .prompt ([
        {
            type: 'input',
            message: 'What is the name of the new department? (required)',
            name: 'name',
            validate: name => {
                if (name) {
                    return true;
                }
                else {
                    console.log('please enter the name of the new department (required)');
                    return false;
                }
            }
        }
    ])
    .then((answer) => {
        connection.promise().query(
            `INSERT INTO department(name)
            VALUES ('${answer.name}');`
        )
        .then(() => {
            start();
        })
    })
}; 

// This function allows the user to add a role to the roles table, by using the
// inquirer module to request and collect user input.
function addRole() {
    inquirer
    .prompt ([
        {
            type: 'input',
            message: 'What is the name of the new role? (required)',
            name: 'name',
            validate: name => {
                if (name) {
                    return true;
                }
                else {
                    console.log('please enter the name of the new role (required)');
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: 'What is the salary of the new role? (required)',
            name: 'salary',
            validate: salary => {
                if (salary) {
                    parseInt(salary);
                    return true;
                }
                else {
                    console.log('Please enter the salary of the new role. (required)')
                    return false;
                }
            }
        },
        {
            type: 'list',
            message: 'Please choose a department for the role to operate under. (required)',
            name: 'department',
            choices: ['Accounting', 'Quality Assurance', 'cafeteria', 'Monkey Care', 'HR']
        }
    ])
    .then((answer) => {
        if (answer.department === 'Accounting') {
            answer.department = 2;
        }
        else if (answer.department === 'Quality Assurance') {
            answer.department = 3;
        }
        else if (answer.department === 'cafeteria') {
            answer.department = 4;
        }
        else if (answer.department === 'Monkey Care') {
            answer.department = 5;
        }
        else {
            answer.department = 6;
        }
        connection.promise().query(
            `INSERT INTO roles (title, salary, department_id)
            VALUES ('${answer.name}', ${answer.salary}, ${answer.department});`
        )
        .then(() => {
            start();
        })
    })
};

//This functino allows the user to add an employee to the employee table, by using the
// the inquirer module to request and collect user input.
function addEmployee() {
    inquirer
    .prompt([
       {
           type: 'input',
           message: "What is the employee's first name? (required)",
           name: 'first',
           validate: first => {
               if(first) {
                   return true;
               }
               else {
                   console.log('Please enter a first name for the employee. (required)');
                   return false;
               }
           }
       },
       {
        type: 'input',
        message: "What is the employee's last name? (required)",
        name: 'last',
        validate: last => {
            if(last) {
                return true;
            }
            else {
                console.log('Please enter a last name for the employee. (required)');
                return false;
            }
        }  
       },
       {
         type: 'list',
         message: 'Please a role for the employee. (required)',
         name: 'role',
         choices: ['Number Cruncher', 'Abicus studier', 'Product tester', 'Chemist', 'Hotdog maker', 'Hotdog server', 'Monkey trainer', 'Monkey superviser', 'Complaint taker', 'Complaint shredder']  
       },
       {
           type: 'list',
           message: 'Please choose a manager for the employee',
           name: 'manager',
           choices: ['Bob Johnson', 'Homer Simpson', 'George Castanza', 'John Adams', 'Toby Flenderson']
       }
    ])
    .then((answer) => {
        if (answer.role === 'Number Cruncher') {
            answer.role = 2;
        }
        else if (answer.role === 'Abicus studier') {
            answer.role = 3;
        }
        else if (answer.role === 'Product tester') {
            answer.role = 4;
        }
        else if (answer.role === 'Chemist') {
            answer.role = 5;
        }
        else if (answer.role === 'Hotdog maker') {
            answer.role = 6;
        }
        else if (answer.role === 'Hotdog server') {
            answer.role = 7;
        }
        else if (answer.role === 'Monkey trainer') {
            answer.role = 8;
        }
        else if (answer.role === 'Monkey superviser') {
            answer.role = 9;
        }
        else if (answer.role === 'Complaint taker') {
            answer.role = 10;
        }
        else {
            answer.role = 11;
        }
        connection.promise().query(
            `INSERT INTO employee (first_name, last_name, manager, role_id)
            VALUES ('${answer.first}', '${answer.last}', '${answer.manager}', ${answer.role});`
        )
        .then(() => {
            start();
        })
    })
};

//This function allows the user to update an employee's role field in the employee table.
function updateEmployeeRole() {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'Which employee would you like to upddate? (required)',
            name: 'name',
            choices: ['Obi-Wan', 'Anakin', 'Tony', 'Thor', 'Bilbo', 'Frodo', 'Doc', 'Marty', 'Seymour', 'Edna', 'Edward', 'Edward', 'Santa', 'Jack', 'Mark', 'Elon', 'Ron', 'Dwight', 'Julius', 'Genghis']
        },
        {
        type: 'list',
        message: 'Which role would like to change the employee to?',
        name: 'role',
        choices: ['Number Cruncher', 'Abicus studier', 'Product tester', 'Chemist', 'Hotdog maker', 'Hotdog server', 'Monkey trainer', 'Monkey superviser', 'Complaint taker', 'Complaint shredder']
        }
    ])
    .then((answer) => {
        if (answer.role === 'Number Cruncher') {
            answer.role = 2;
        }
        else if (answer.role === 'Abicus studier') {
            answer.role = 3;
        }
        else if (answer.role === 'Product tester') {
            answer.role = 4;
        }
        else if (answer.role === 'Chemist') {
            answer.role = 5;
        }
        else if (answer.role === 'Hotdog maker') {
            answer.role = 6;
        }
        else if (answer.role === 'Hotdog server') {
            answer.role = 7;
        }
        else if (answer.role === 'Monkey trainer') {
            answer.role = 8;
        }
        else if (answer.role === 'Monkey superviser') {
            answer.role = 9;
        }
        else if (answer.role === 'Complaint taker') {
            answer.role = 10;
        }
        else {
            answer.role = 11;
        }
        connection.promise().query(
            `UPDATE employee
            SET role_id = ${answer.role}
            Where first_name = '${answer.name}'`
        )
            start();
    })
}

start();
