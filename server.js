const db = require('./db/connection');
const express = require('express');
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Welcome Message
console.log(
  '+++++++++++++++++++++++++++++++++  WELCOME TO THE EMPLOYEE TRACKER DATABASE!  +++++++++++++++++++++++++++++++++');

  // Prompted Questions
const startQs = async () => {
  try {
    let answer = await inquirer.prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: ["View All Departments",
                "View a Single Department",
                "Create a Department",
                "Delete a Department",
                "View All Roles",
                "View a Single Role",
                "Delete a Role",
                "View All Employees",
                "View a Single Employee",
                "Delete an Employee",
                "Update an Employee's Role",
                "Add a Department",
                "Add a Role",
                "Add an Employee Role",
                "Exit"]
    });
    switch (answer.action) {
      case "View All Departments":
        viewAllDepartments();
        break;

      case "View a Single Department":
        viewSingleDept();
        break;

      case "Create a Department":
        createDept();
        break;

      case "Delete a Department":
        deleteDept();
        break;

      case "View All Roles":
        viewAllRoles();
        break;

      case "View a Single Role":
        viewRole();
        break;

      case "Delete a Role":
        deleteRole();
        break;

      case "View All Employees":
        viewAllEmployees();
        break;

      case "View a Single Employee":
        viewSingleEmployee();
        break;
        
      case "Delete an Employee":
        deleteEmployee();
        break;

      case "Update an Employees Role":
        updateEmployeeRole();

      case "Add a Department":
        addDepartment();
        break;

      case "Add a Role":
        addRole();
        break;

      case "Add an Employee Role":
        addEmployeeRole();
        break;

      case "Exit":
        exit();
        connection.end();
        break;
    };
  } catch (err) {
    console.log(err);
    startQs();
  };
} 

// Start the app when connected
startQs();
