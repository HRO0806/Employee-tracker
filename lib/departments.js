require ('console.table');
const inquirer = require('inquirer');
const connection = require('./db/connection');

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

module.exports = {allDepartments, addDepartment};