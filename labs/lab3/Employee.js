// Employee Module - exported for use in index.js

let employees = [
    {id: 1, firstName: "Pritesh", lastName: "Patel", email: "pritesh@gmail.com", Salary:5000},
    {id: 2, firstName: "Krish", lastName: "Lee", email: "krish@gmail.com", Salary:4000},
    {id: 3, firstName: "Racks", lastName: "Jacson", email: "racks@gmail.com", Salary:5500},
    {id: 4, firstName: "Denial", lastName: "Roast", email: "denial@gmail.com", Salary:9000}
]

// Returns all employee details
const getAllEmployees = () => employees

// Returns "firstName lastName" for every employee, sorted ascending
const getEmployeeNames = () =>
    employees
        .map(emp => `${emp.firstName} ${emp.lastName}`)
        .sort((a, b) => a.localeCompare(b))

// Returns the sum of all employee salaries
const getTotalSalary = () =>
    employees.reduce((total, emp) => total + emp.Salary, 0)

module.exports = {
    getAllEmployees,
    getEmployeeNames,
    getTotalSalary
}
