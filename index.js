const db = require('./db')
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

async function listCustomers() {
    console.clear();
    console.log("Clientes cadastrados:");
    console.log("ID | Nome | CPF | Endereço");

    const customers = db.getCustomers()

    for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];
        console.log(`${customer.id} | ${customer.name} | ${customer.cpf} | ${customer.address}`);
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

function validateId(id) {
    return id > 0;
    
}

function validateAddress(address) {
    if (!address) return false;
    return address.length >= 10; // Endereço deve ter pelo menos 10 caracteres
}

function validateNameUpdate(name) {
    if (!name) return true;
    return name.trim().indexOf(" ") !== -1; // Verifica se há pelo menos um espaço
}
function validateAddressUpdate(address) {
    if (!address) return true;
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

async function startUpdate() {
    console.clear();

    const id = await getAnswer("Qual o Id do cliente? ", "id inválido, tente novamente.", validateId);
    const name = await getAnswer("Qual o novo nome do cliente? Deixe em branco para manter o mesmo.", "Nome inválido, tente novamente.", validateNameUpdate);
    const address = await getAnswer("Qual o novo endereço do cliente? Deixe em branco para manter o mesmo.", "Endereço inválido, tente novamente.", validateAddressUpdate);
    const cpf = await getAnswer("Qual o CPF do cliente? Deixe em branco para manter o mesmo.", "CPF inválido, insira um CPF com 11 dígitos numéricos.", validateCPF);
    
    const result = db.updateCustomer(id, {name, address, cpf});

    if(result)
        console.log(`Cliente atualizado com sucesso com id ${id}`);
    else
        console.log(`Cliente não encontrado!`);

    await rl.question("Pressione Enter para continuar...");
    printMenu()
}

function validateConfirmation(choice){
    choice = choice.toUpperCase();
    return choice === "S" || choice === "N";
}

async function startDelete() {
    console.clear();

    const id = await getAnswer("Qual o Id do cliente? ", "Id inválido, tente novamente.", value => Number(value) > 0);

    const customer = db.getCustomer(id);

    if (!customer) {
        console.log("Cliente não encontrado!");
        await rl.question("Pressione Enter para continuar...");
        return;
    }

    const choice = await getAnswer(
        `Tem certeza que deseja excluir o cliente ${customer.name}? (S/N)`, 
        "Opção inválida, tente novamente.", 
        validateConfirmation
    );

    if (choice.toUpperCase() === "S") {
        const result = db.deleteCustomer(id);

        if (result) {
            console.log(`Cliente com ID ${id} excluído com sucesso!`);
        } else {
            console.log("Erro ao excluir cliente!");
        }
    }

    await rl.question("Pressione Enter para continuar...");
    printMenu();
}


async function printMenu() {
    while (true) {
        console.clear();
        console.log("Menu:");
        console.log("1 - Ver Clientes");
        console.log("2 - Cadastrar Cliente");
        console.log("3 - Editar Clientes");
        console.log("4 - Excluir Cliente")
        console.log("5 - Encerrar");

        const answer = await rl.question("Qual opção você deseja? ");

        switch (answer) {
            case "2":
                await startRegistration();
                break;
            case "1":
                await listCustomers();
                break;
            case "3":
                await startUpdate();
                break;
            case "4":
                await startDelete();
                break;
            case "5":
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
