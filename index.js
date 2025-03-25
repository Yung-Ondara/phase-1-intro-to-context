// Your code here
function createEmployeeRecord(firstName, familyName, title, payPerHour) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}
  
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,  // all should be a string
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}
  
function createEmployeeRecords(employeeData) {
    return employeeData.map(function(employee) {
        return createEmployeeRecord(employee);
    });
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return employee;
}

function hoursWorkedOnDate(employee, date) {    
    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === date;
    });
    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === date;
    });
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour;
    return parseFloat(wage.toString());
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(function(e){
        return e.date;
    });
    let payable = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d);
    }, 0);
    return payable;
}

function calculatePayroll(employees) {
    return employees.reduce(function(memo, employee){
        return memo + allWagesFor(employee);
    }, 0);
}