console.log("JS carregado.");

const calcularBtn = document.getElementById("calcularBtn");
const resultadosContainer = document.getElementById("resultados");
const numeroInput = document.getElementById("numeroInput");
const adicionar = document.getElementById("adicionarBtn");
const numerosLista = document.getElementById("numerosLista");
const media = document.getElementById("media");
const mediana = document.getElementById("mediana");
const moda = document.getElementById("moda");
const desvioMedio = document.getElementById("desvioMedio");
const desvioPadrao = document.getElementById("desvioPadrao");
const variancia = document.getElementById("variancia");

const numeros = [];

const adicionarNumero = () => {
    if (numeros.length >= 20) {
        alert("Limite de 20 números atingido!");
        return;
    }
    
    const numero = parseFloat(numeroInput.value);
    
    if (isNaN(numero)) {
        alert("Por favor, insira um número válido.");
        return;
    }
    
    if (numero < -1000000 || numero > 1000000) {
        alert("O número deve estar entre -1.000.000 e 1.000.000");
        return;
    }
    
    // Validar duas casas decimais
    if (!/^-?\d+(\.\d{1,2})?$/.test(numeroInput.value)) {
        alert("Aceita-se no máximo duas casas decimais.");
        return;
    }
    
    numeros.push(numero);
    
    // Adicionar o número à lista HTML
    const itemLista = document.createElement("li");
    
    const span = document.createElement("span");
    span.textContent = numero;
    itemLista.appendChild(span);
    
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.style.marginLeft = "10px";
    btnExcluir.addEventListener("click", () => {
        const index = Array.from(numerosLista.children).indexOf(itemLista);
        numeros.splice(index, 1);
        itemLista.remove();
    });

    itemLista.appendChild(btnExcluir);
    
    numerosLista.appendChild(itemLista);
    
    numeroInput.value = "";
    numeroInput.focus();
};

adicionar.addEventListener("click", adicionarNumero);
numeroInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        adicionarNumero();
    }
});

calcularBtn.addEventListener("click", async () => {
    if (numeros.length === 0) {
        alert("Adicione pelo menos um número.");
        return;
    }

    const response = await fetch("/calcular", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ numeros })
    });

    const dados = await response.json();

    media.textContent = `Média: ${dados.media.toFixed(2)}`;
    mediana.textContent = `Mediana: ${dados.mediana.toFixed(2)}`;
    moda.textContent = `Moda: ${dados.moda.toFixed(2)}`;
    desvioMedio.textContent = `Desvio médio: ${dados.desvio_medio.toFixed(2)}`;
    desvioPadrao.textContent = `Desvio padrão: ${dados.desvio_padrao.toFixed(2)}`;
    variancia.textContent = `Variância: ${dados.variancia.toFixed(2)}`;

    resultadosContainer.classList.remove("hidden");
});