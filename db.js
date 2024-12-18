const customers = [];

function addCustomer(name, address, cpf){
    const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
    customers.push({ id, name, address, cpf });
    return id;
}

function getCustomers(){
    return customers
}

module.exports = {
    addCustomer,
    getCustomers
}