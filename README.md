# Cadastro de Clientes

Um sistema simples em Node.js para gerenciar o cadastro de clientes no terminal. Este projeto demonstra o uso de JavaScript assíncrono com `readline/promises`, além de validações básicas de entrada de dados.

## Funcionalidades

- **Cadastrar clientes**: Inclua o nome, CPF e endereço de um cliente.
- **Listar clientes**: Visualize a lista de clientes cadastrados.
- **Validações**:
  - Nome deve conter pelo menos um sobrenome (verificado por espaços).
  - CPF deve ter 11 dígitos numéricos.
  - Endereço deve ter pelo menos 10 caracteres.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/) (versão 16 ou superior)

## Pré-requisitos

- Node.js instalado na sua máquina.

## Como Executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/helciohumberto/cadastro-de-clientes-nodejs.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Execute o projeto:

   ```bash
   node app.js
   ```

## Estrutura do Projeto

```plaintext
.
├── app.js           # Arquivo principal com o código do sistema
└── README.md        # Documentação do projeto
```

## Como Usar

1. Ao iniciar, você verá o menu com três opções:

   ```plaintext
   Menu:
   1 - Cadastrar Cliente
   2 - Ver Clientes
   3 - Encerrar
   ```

2. Escolha uma opção:

   - **1**: Insira os dados do cliente conforme solicitado.
   - **2**: Veja uma lista de todos os clientes cadastrados.
   - **3**: Encerre o programa.

3. Caso insira dados inválidos, o sistema solicitará correções automaticamente.

## Melhorias Futuras

- Adicionar persistência de dados usando um banco de dados ou arquivo JSON.
- Melhorar as validações, incluindo verificação de CPF válido.
- Implementar uma interface gráfica ou API.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou reportar problemas.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

### Autor

**Hélcio Humberto**  
[LinkedIn](https://www.linkedin.com/helciohumberto) | [GitHub](https://github.com/helciohumberto)
