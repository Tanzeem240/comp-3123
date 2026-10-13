var http = require("http");
// Use Employee Module
const employeeModule = require("./Employee");
console.log("Lab 03 -  NodeJs");

// Fixed errors:
// - Each handler now returns after sending a response (previously the code fell
//   through to the 404 res.end(), causing "write after end" errors)
// - Proper status codes (200, 404, 405) and Content-Type headers are now set

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' })
        return res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    }

    if (req.url === '/') {
        // Display message "<h1>Welcome to Lab Exercise 03</h1>"
        res.writeHead(200, { 'Content-Type': 'text/html' })
        return res.end("<h1>Welcome to Lab Exercise 03</h1>")
    }

    if (req.url === '/employee') {
        // Display all details for employees in JSON format
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(employeeModule.getAllEmployees()))
    }

    if (req.url === '/employee/names') {
        // Display only all employees {first name + lastname} in Ascending order in JSON Array
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(employeeModule.getEmployeeNames()))
    }

    if (req.url === '/employee/totalsalary') {
        // Display Sum of all employees salary in given JSON format
        // e.g. { "total_salary" : 100 }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ total_salary: employeeModule.getTotalSalary() }))
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
