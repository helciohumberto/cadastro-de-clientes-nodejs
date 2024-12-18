const db = require('./db')
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

async function listCustomers() {
    console.clear();
    console.log("Clientes cadastrados:");
    console.log("Nome | CPF | Endereço");

    const customers = db.getCustomers()

    for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];
        console.log(`${customer.name} | ${customer.cpf} | ${customer.address}`);
    }
    await rl.question("Pressione Enter para continuar...");
}

async function getAnswer(question, errorMessage, validationFunction) {
    let answer = "";
    do {
        answer = await rl.question(question);
        if (!validationFunction(answer)) console.log(errorMessage);
    } while (!validationFunction(answer));
    return answer;
}

function validateName(name) {
    if (!name) return false;
    return name.trim().indexOf(" ") !== -1; // Verifica se há pelo menos um espaço
}

function validateAddress(address) {
    if (!address) return false;
    return address.length >= 10; // Endereço deve ter pelo menos 10 caracteres
}

function validateCPF(cpf) {
    // Validação simples para demonstrar (adapte conforme necessário)
    return /^\d{11}$/.test(cpf); // CPF deve ter 11 dígitos numéricos
}

async function startRegistration() {
    console.clear();

    const name = await getAnswer("Qual o nome do cliente? ", "Nome inválido, tente novamente.", validateName);
    const address = await getAnswer("Qual o endereço do cliente? ", "Endereço inválido, tente novamente.", validateAddress);
    const cpf = await getAnswer("Qual o CPF do cliente? ", "CPF inválido, insira um CPF com 11 dígitos numéricos.", validateCPF);
    
    const id = db.addCustomer(name, address, cpf);

    console.log(`Cliente cadastrado com sucesso com id ${id}!`);
    await rl.question("Pressione Enter para continuar...");
    printMenu()
}

async function printMenu() {
    while (true) {
        console.clear();
        console.log("Menu:");
        console.log("1 - Cadastrar Cliente");
        console.log("2 - Ver Clientes");
        console.log("3 - Encerrar");

        const answer = await rl.question("Qual opção você deseja? ");

        switch (answer) {
            case "1":
                await startRegistration();
                break;
            case "2":
                await listCustomers();
                break;
            case "3":
                console.clear();
                console.log("Encerrando o programa...");
                rl.close();
                process.exit(0);
            default:
                console.log("Opção inválida, tente novamente.");
                await rl.question("Pressione Enter para continuar...");
        }
    }
}

printMenu();
db.getCustomers();
