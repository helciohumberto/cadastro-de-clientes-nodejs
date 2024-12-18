const fs = require('fs')
let customers = [];

function addCustomer(name, address, cpf){
    const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;

    customers.push({ id, name, address, cpf });

    fs.writeFileSync("db.json", JSON.stringify(customers));

    return id;
}

function getCustomers(){
    const customersString = fs.readFileSync("db.json", "utf-8");
    customers = JSON.parse(customersString)
    return customers
}

module.exports = {
    addCustomer,
    getCustomers
}