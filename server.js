const express = require('express');
const cTable = require('console.table');
// const router = express.Router();
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
// db.connect(err => {
//   if (err) throw err;
//   console.log('Database connected.');
//   app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  // });
// });


// Welcome Message
console.log('+++++++++++++++++++++++++++++++++++++++++');
console.log('WELCOME TO THE EMPLOYEE TRACKER DATABASE!');
console.log('+++++++++++++++++++++++++++++++++++++++++');

// Prompts the Questions
const startQs = () => {
  inquirer.prompt ([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a New Department",
        "Add a New Role",
        "Add a New Employee",
        "Update an Employee's Role",
        "Update an Employee's Manager",
        "Delete a Department",
        "Exit"]
    }
  ])
    .then((answers) => {
      const { choice } = answers;

      if (choice === "View All Departments") {
        viewAllDepts();
      }

      if (choice === "View All Roles") {
        viewAllRoles();
      }

      if (choice === "View All Employees") {
        viewAllEmployees();
      }

      if (choice === "Add a New Department") {
        addNewDept();
      }

      if (choice === "Add a New Role") {
        addNewRole();
      }

      if (choice === "Add a New Employee") {
        addNewEmployee();
      }

      if (choice === "Update an Employee's Role") {
        updateEmployee();
      }

      if (choice === "Update an Employee's Manager") {
        updateManager();
      }

      if (choice === "View Employee by Department") {
        viewByDept();
      }
      

      // if (choice === "View a Single Department") {
      //   viewSingDept();
      // }

      // if (choice === "Create a Department") {
      //   createDept();
      // }

      if (choice === "Delete a Department") {
        deleteDept();
      }

      

      // if (choice === "View a Single Role") {
      //   viewSingRole();
      // }

      // if (choice === "Create a New Role") {
      //   createRole();
      // }

      // if (choice === "Delete a Role") {
      //   deleteRole();
      // }      

      // if (choice === "View a Single Employee") {
      //   viewSingEmployee();
      // }

      // if (choice === "Delete an Employee") {
      //   deleteEmployee();
      // }

      if (choice === "Exit") {
        console.log("|---- GOOD-BYE! ----|"); 
        db.end()
      }
    })

    viewAllDepts = () => {
      console.log('Viewing All Available Departments');
      const sql = `SELECT department.id AS Dep_ID,
                  department.dep_name AS Dep_Name
                  FROM department`;
      db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQs();
      });
    };

    viewAllRoles = () => {
      const sql = `SELECT role.id, role.title,
                  department.dep_name AS Dep_Name
                  FROM role
                  INNER JOIN department ON role.department_id = department.id`;
      db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQs();
      });
    };

    viewAllEmployees = () => {
      const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                  role.title, department.dep_name AS Department,
                  role.salary,
                  CONCAT (manager.first_name, " ", manager.last_name) AS Manager
                  FROM employee
                  LEFT JOIN role ON employee.role_id = role.id
                  LEFT JOIN department ON role.department_id = department.id
                  LEFT JOIN employee manager ON employee.manager_id = manager.id`;
      db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        startQs();
      });
    };

    addNewDept = () => {
      inquirer.prompt([
        {
          type: 'input',
          name: 'addDept',
          message: 'What department would you like to add?',
          validate: addDept => {
            if (addDept) {
              return true;
            } else {
              console.log('Please enter the department you wish to add.');
              return false;
            }
          }
        }
      ])
      .then(answer => {
        const sql = `INSERT INTO department (dep_name) VALUES (?)`;

        db.query(sql, answer.addDept, (err, result) => {
          if (err) throw err;
          console.log('You added ' + answer.addDept + ' to departments!');

          viewAllDepts();
        });
      });
    };

    addNewRole = () => {
      inquirer.prompt([
        {
          type: 'input',
          name: 'role',
          message: 'What role would you like to add?',
          validate: addRole => {
            if (addRole) {
              return true;
            } else {
              console.log('Please enter the role you wish to add.');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'salary',
          message: ' What is the salary of this role?',
          validate: addSalary => {
            if (addSalary) {
              return true;
            } else {
              console.log('Please enter the salary for this role.');
              return false;
            }
          }
        }
      ])
      .then(answer => {
        const params = [answer.role, answer.salary];
        const sql = `SELECT dep_name, id FROM department`;

        db.query(sql, (err, data) => {
          if (err) throw err;

          const dept = data.map(({ dep_name, id }) => ({ name: dep_name, value: id }));

          inquirer.prompt([
            {
              type: 'list',
              name: 'dept',
              message: 'What department are you adding this role to?',
              choices: dept
            }
          ])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (role.title, role.salary, department_id)
            VALUES (?,?,?)`;

            db.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('You Added' + answer.role + ' to Roles!');

              viewAllRoles();
            });
          });
        });;
      });
    };
    
    addNewEmployee = () => {
      inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "What is the Employee's first name?",
          vialidate: addFirst => {
            if (addFirst) {
              return true;
            } else {
              console.log("Please enter the first name of the new Employee.");
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'lastName',
          message: "What is the employee's last name?",
          validate: addLast => {
            if (addLast) {
              return true;
            } else {
              console.log("Please enter the first name of the new Employee.");
              return false;
            }
          }
        }
      ])
      .then(answer => {
        const params = [answer.firstName, answer.lastName]

        const sql = `SELECT role.id, role.title FROM role`;

        db.query(sql, (err, data) => {
          if (err) throw err;

          const roles = data.map(({ id, title }) => ({ name: title, value: id }));

          inquirer.prompt([
            {
              type: 'list',
              name: 'role',
              message: "What is the new employees role?",
              choices: roles
            }
          ])
          .then(roleChoice => {
            const role = roleChoice.role;
            params.push(role);

            const sql = `SELECT * FROM employee`;

            db.query(sql, (err, data) => {
              if (err) throw err;

              const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));

              inquirer.prompt([
                {
                  type: 'list',
                  name: 'manager',
                  message: "Who is the new employee's manager?",
                  choices: managers
                }
              ])
              .then(managerChoice => {
                const manager = managerChoice.manager;
                params.push(manager);

                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES (?,?,?,?)`;
                db.query(sql, params, (err, result) => {
                  if (err) throw err;
                  console.log("The New Employee Has Been Added!")

                  viewAllEmployees();
                });
              });
            });
          });
        });
      });
    };

    updateEmployee = () => {
      const sql = `SELECT * FROM employee`;
      db.query(sql, (err, data) => {
        if (err) throw err;

        const employee = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'name',
            message: "Which of the following employees would you like to update?",
            choices: employee
          }
        ])
        .then(empChoice => {
          const employee = empChoice.name;
          const params = [];
          params.push(employee);

          const sql = `SELECT * FROM role`;

          db.query(sql, (err, data) => {
            if (err) throw err;

            const roles = data.map(({ id, title }) => ({ name: title, value: id }));

            inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the new role for this employee?",
                choices: roles
              }
            ])
            .then(roleChoice => {
              const role = roleChoice.role;
              params.push(role);

              let employee = params[0];
              params[0] = role
              params[1] = employee

              const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

              db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("You Have Successfully Updated This Employee's Role");

                viewAllEmployees();
              })
            })
          })
        })
      })
    }
    
    updateManager = () => {
      const sql = `SELECT * FROM employee`;

      db.query(sql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'name',
            message: "Which employee would you like to update?",
            choices: employees
          }
        ])
        .then(empChoice => {
          const employee = empChoice.name;
          const params = [];
          params.push(employee);

          const sql = `SELECT * FROM employee`;

          db.query(sql, (err, data) => {
            if (err) throw err;

            const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + ' ' + last_name, value: id }));

            inquirer.prompt([
              {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's new manager?",
                choices: managers
              }
            ])
            .then(managerChoice => {
              const manager = managerChoice.manager;
              params.push(manager);

              let employee = params[0]
              params[0] = manager
              params[1] = employee

              const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;

              db.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log("You Have Successfully Updated Employee's Manager!");

                viewAllEmployees();
              });
            });
          });
        });
      });
    };

    deleteDept = () => {
      const departments = [];
      db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;

        res.forEach(dep => {
          let qObj = {
            name: dep.name,
            value: dep.id
          }
          departments.push(qObj);
        });

        let questions = [
          {
            type: "list",
            name: "name",
            choices: departments,
            message: "Which department would you like to delete?"
          }
        ];

        inquirer.prompt(questions)
        .then(response => {
          const query = `DELETE FROM department WHERE id = ?`;
          db.query(query, [response.id], (err, res) => {
            if (err) throw err;
            console.log(`You've Successfully Deleted ${res.affectedRows}!`);
            viewAllDepts();
          })
        })
      })
    }
    
  }     
    
// Initialize application
startQs();



