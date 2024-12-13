const readline = require('readline/promises');
const { stdin: input, stdout: output} = require('node:process');

const rl = readline.createInterface({input, output});
const customers = [];

async function listCustomers() {
    console.clear()
    console.log("Clientes cadastrados: ");
    console.log("Nome | CPF | Endereço")
    for(let i = 0; i < customers.length; i++){
        const customer = customers[i]
        console.log(`${customer.name} | ${customer.cpf} | ${customer.address}`)
    }
    await rl.question("Pressione Enter para continuar...");
    printMenu();
}

async function getAnswer(question, errorMessage, validationFunction) {
    let answer = ""
    do{
        answer = await rl.question(question)
        if(!validationFunction(answer)) console.log(errorMessage)
    }
    while(!validationFunction(answer))
    return answer
}

function validateName(name){
    if(!name)return false
    if(!name.trim().indexOf(" ") === -1)return false
    return true
}

function validateAddress(address){
    if(!address) return false
    if(address.length < 10) return true
    return true
}

async function startRegistration() {
    console.clear()

    const name = await getAnswer("Qual o nome do cliente? ", "Nome inválido, tente novamente.", validateName())
    const address = await getAnswer('Qual o endereço do cliente? ', "Endereço inválido, tente novamente.", validateAddress())
    const cpf = await getAnswer('Qual o endereço do cliente? ', "Endereço inválido, tente novamente.", ()=>{
        return true
    })

    const id = customers.length > 0
        ? customers[customers.length - 1].id + 1 
        : 1; //operador ternario
    customers.push({
        name,
        address,
        id,
        cpf
    })
    console.log(`Cliente cadastrado com sucesso com id ${id}!`)
    await rl.question("Pressione Enter para continuar...");
    printMenu();
}

async function printMenu(){   
    console.clear();
    console.log('Menu:');
    console.log('1 - Cadastrar Cliente');
    console.log('2 - Ver Ver Clientes');
    console.log('3 - Encerrar');

    const answer = await rl.question('Qual opção você deseja? ');

        switch (answer) {
            case "1":
                startRegistration();
                break;
            case "2":
                listCustomers();
                break;
            case "3": {
                console.clear();
                process.exit(0)
            }
            default:
                console.log('Opção inválida, tente novamente');
                break;
        }
    await rl.question("Pressione Enter para continuar...");
    printMenu();
}
printMenu();

// customers.push({
//     id: 1,
//     name: "Hélcio",
//     adress: "Ituiutaba/MG"
// })

// console.log(customers)