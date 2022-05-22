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


        //Pega valores atuais (current) e anteriores (previous)
        let operationValue;
        const previous = +this.previousOperationText.innerText;
        const current = +this.currentOperationText.innerText;

        console.log(operation)
        switch (operation) {

            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
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

        console.log(operationValue, operation, current, previous)

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
