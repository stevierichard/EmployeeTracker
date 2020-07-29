const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2583",
  port: 3306,
  database: "employee_tracker_db",
});

connection.connect((err) => {
  if (err) throw err;
  mainMenu();
});

function mainMenu() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add departments",
        "Add roles",
        "Add employees",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add departments":
          addDepartment();
          break;

        case "Add roles":
          inquirer
            .prompt([
              {
                name: "title",
                type: "input",
                message: "Enter your title",
              },
              {
                name: "salary",
                type: "number",
                message: "Enter your salary",
              },
              {
                name: "department",
                type: "number",
                message: "Enter a department role you belongs to",
              },
            ])
            .then(function (roleAnswer) {
              console.log(roleAnswer);
              connection.query(
                "INSERT INTO role SET ?",

                [
                  {
                    title: roleAnswer.title,
                    salary: roleAnswer.salary,
                    department_id: roleAnswer.department,
                  },
                ],
                (err) => {
                  if (err) throw err;
                  mainMenu();
                }
              );
            });

          break;

        case "Add employees":
          addEmployee();
          break;

        case "View departments":
          viewDepartment().then((res) => {
            console.table(res);
            mainMenu();
          });
          break;

        case "View roles":
          viewRole().then((res) => {
            console.table(res);
            mainMenu();
          });
          break;

        case "View employees":
          viewEmployees().then((res) => {
            console.table(res);
            mainMenu();
          });
          break;

        case "Update employee roles":
          updateEmployee();
          break;
      }
    });
}

function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter department name",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        { name: answer.department },
        function (err) {
          if (err) throw err;
          // console.log(answer.department + " has been added to database");
          mainMenu();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter your firstName",
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter your lastName",
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter employee role ID number",
      },
      {
        //check this
        name: "manager_id",
        type: "input",
        message: "Enter employee manager reference number",
      },
    ])
    .then(function (addEmpl) {
      connection.query(
        "INSERT INTO employee SET ?",
        [
          {
            first_name: addEmpl.first_name,
            last_name: addEmpl.last_name,
            role_id: addEmpl.role_id,
            manager_id: addEmpl.manager_id,
          },
        ],
        function (err) {
          if (err) throw err;
          mainMenu();
        }
      );
    });
}

const viewDepartment = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM department", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

const viewRole = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM role", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

const viewEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM employee", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};
