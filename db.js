const fs = require('fs')
let customers = [];

function addCustomer(name, address, cpf){
    const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;

    customers.push({ id, name, address, cpf });

    fs.writeFileSync("db.json", JSON.stringify(customers));

    return id;
}


function validateId(id, customer){
    if (customer.id === id){
        return true;
    } else {
        return false;
    }
}

function updateCustomer(id, newData){
    const customerIndex = customers.findIndex(customer => customer.id === Number(id));
    if(customerIndex === -1){
        return false;
    }

    const customer = customers[customerIndex];

    if(newData.name)
        customer.name = newData.name;
    if(newData.address)
        customer.address = newData.address;
    if(newData.cpf)
        customer.cpf = newData.cpf;

    customers[customerIndex] = customer;

    fs.writeFileSync("db.json", JSON.stringify(customers));

    return true;
}

function deleteCustomer(id){
    const customerIndex = customers.findIndex(customer => customer.id === Number(id));
    if(customerIndex === -1){
        return false;
    }

    customers.splice(customerIndex, 1)

    fs.writeFileSync("db.json", JSON.stringify(customers));

    return true;
}

function getCustomers(){
    const customersString = fs.readFileSync("db.json", "utf-8");
    customers = JSON.parse(customersString)
    return customers
}

function getCustomer(id){
    return customers.find(customer => customer.id === Number(id));
}

module.exports = {
    addCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    getCustomer
}