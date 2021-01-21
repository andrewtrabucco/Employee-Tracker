const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


// Create the connection information for the sql database
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "wer7890dna",
    database: "employeeTracker_db",
    multipleStatements: true
});


// Connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    startApp();
});


// Function for starting application
function startApp() {
    console.log("\n Welcome to the Employee Manager! \n");
    inquirer
        .prompt({
            name: "business",
            type: "list",
            message: "What would you like to do?",
            choices:
                [
                    "View all Employees",
                    "Add Employee",
                    "Update Employee Role",
                    "View all Departments",
                    "Add a Department",
                    "View all Roles",
                    "Add a Role",
                    "Exit"
                ]
        })
        .then(function (answer) {
            if (answer.business === "View all Employees") {
                viewEmployees();
            }
            else if (answer.business === "Add Employee") {
                addEmployee();
            }
            else if (answer.business === "Update Employee Role") {
                updateRole();
            }
            else if (answer.business === "View all Departments") {
                viewDepartments();
            }
            else if (answer.business === "Add a Department") {
                addDepartment();
            }
            else if (answer.business === "View all Roles") {
                viewRoles();
            }
            else if (answer.business === "Add a Role") {
                addRole();
            }
            else {
                connection.end();
            }
        });
}


function viewEmployees() {
    let query = `
    SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name department, CONCAT(employee2.first_name, " ", employee2.last_name) manager
    FROM employee
    LEFT JOIN role
        ON employee.role_id = role.id
    LEFT JOIN department
        ON role.department_id = department.id
    LEFT JOIN employee employee2
        ON employee.manager_id = employee2.id
        `;
    connection.query(query, function (err, res) {
        console.log("\n\n")
        console.table(res)
        startApp();
    });
}


async function addEmployee() {
    connection.query("SElECT * FROM role", function (err, res) {
        let roles = res;
        let roleArray = res.map(role => role.title);
        connection.query("SELECT * FROM employee", function (err, res) {
            let employees = res;
            let employeeArray = res.map(employee => `${employee.first_name} ${employee.last_name}`)
            inquirer
                .prompt([
                    {
                        name: "firstName",
                        type: "input",
                        message: "What is the employee's first name?",
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "What is the employee's last name?",
                    },
                    {
                        name: "role",
                        type: "list",
                        message: "What is the employee's role?",
                        choices: roleArray
                    },
                    {
                        name: "manager",
                        type: "list",
                        message: "Who is the employee's manager?",
                        choices: employeeArray
                    },
                ]).then(function (answer) {
                    let role = roles.find(role => role.title === answer.role)
                    let manager = employees.find(employee => (employee.first_name + " " + employee.last_name) === answer.manager)
                    let statement = connection.query("INSERT INTO employee SET ?",
                        [
                            {
                                first_name: answer.firstName,
                                last_name: answer.lastName,
                                role_id: role.id,
                                manager_id: manager.id
                            },
                        ],
                        function (err, res) {
                            startApp();
                        });
                });
        });
    });
}

async function updateRole() {
    connection.query("SElECT * FROM role", function (err, res) {
        let roles = res;
        let roleArray = res.map(role => role.title);
        connection.query("SELECT * FROM employee", function (err, res) {
            let employees = res;
            let employeeArray = res.map(employee => `${employee.first_name} ${employee.last_name}`)
            inquirer
                .prompt([
                    {
                        name: "firstLast",
                        type: "list",
                        message: "Who is the employee you would like to update?",
                        choices: employeeArray,
                    },
                    {
                        name: "role",
                        type: "list",
                        message: "What is the employee's new role?",
                        choices: roleArray,
                    },
                ]).then(function (answer) {
                    let role = roles.find(role => role.title === answer.role);
                    let employee = employees.find(employee => (employee.first_name + " " + employee.last_name) === answer.firstLast);
                    connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
                        [
                            role.id,
                            employee.id
                        ],
                        function (err) {
                            startApp();
                        }
                    );
                });
        });
    });
}


function viewDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        console.log("\n\n")
        console.table(res)
        startApp();
    });
}


function addDepartment() {
    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "What is the new department?"
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.departmentName,
                }
                , function (err) {
                    startApp();
                }
            );
        });
}


function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        console.log("\n\n")
        console.table(res)
        startApp();
    });
}


function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the role title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the role salary?"
            }
        ]).then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                }
                , function (err) {
                    startApp();
                }
            );
        });
}