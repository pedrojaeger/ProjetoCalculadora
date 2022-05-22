const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button")

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";

    }

    //add digito na tela da calculadora
    addDigito(digito) {
        //checa se na opearção atual já tem um ponto
        if (digito === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digito
        this.updateScreen();
    }

    //Processa operações da calculadora
    processOperation(operation) {

        //Checa se o current está vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // Muda operação
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        //Pega valores atuais (current) e anteriores (previous)
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {

            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;

        }

    }



    //Muda valores da tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation //+= para adicionar numeros ao que ja esta na tela na operação atual
        } else {
            //Checa se valor é zero se for só adiciona o valor atual
            if (previous === 0) {
                operationValue = current
            }

            //Adiciona o valor atual (current) para o previous 
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }


    //MUDA OPERAÇÃO
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"]

        if (!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }


    //DEL - deleta o ultimo digito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    //Botao CE - APAGA OPERAÇÃO ATUAL
    processClearCurrentOperation() {
        this.currentOperationText.innerText = ""
    }

    //BOTAO C - APAGA TODAS AS OPERAÇÕES
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    //BOTAO = FAZ A OPERAÇÃO DE IGUAL 
    processEqualOperator() {

        const operation = previousOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);


buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => { //quando clicar, vai ter o evento

        const value = event.target.innerText; //innerText vai pegar o valor do botao, o que esta escrito no botao, se fosse input seria value

        if (+value >= 0 || value === ".") { //+value vai tentar transformar o valor em numero | se ele conseguir e o numero for maior que 0, ou "." que tambem entra na classe do numeral, segue a operação como numero
            calc.addDigito(value);
        } else {
            calc.processOperation(value);
        }
    }
    )
})
