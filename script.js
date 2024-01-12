function obterAvariasArmazenadas() {
    var avariasArmazenadas = localStorage.getItem('avarias');
    return avariasArmazenadas ? JSON.parse(avariasArmazenadas) : [];
}

function salvarAvarias(avarias) {
    localStorage.setItem('avarias', JSON.stringify(avarias));
}

var avarias = obterAvariasArmazenadas();

document.getElementById("avariaForm").addEventListener("submit", function (event) {
        event.preventDefault();

        cadastrarAvaria();
});

function validarFormulario() {
    var empresa = document.getElementById("avariaForm").empresa.value;
    var frota = document.getElementById("frotaInput").value;
    var tipo = document.getElementById("avariaForm").tipo.value;
    var equipamento = document.getElementById("avariaForm").equipamento.value;
    var descricao = document.getElementById("avariaForm").descricao.value;
    var numeroSerie = document.getElementById("numeroSerieInput").value;

    if (empresa.trim() === "" || frota.trim() === "" || tipo.trim() === "" || equipamento.trim() === "" || descricao.trim() === "" || numeroSerie.trim() === "") {
        alert("Preencha todos os campos antes de cadastrar a avaria.");
        return false;
    }

    return true;
}

function cadastrarAvaria() {
    if (!validarFormulario()) {
        return;
    }

    var empresa = document.getElementById("avariaForm").empresa.value;
    var frota = document.getElementById("frotaInput").value;
    var tipo = document.getElementById("avariaForm").tipo.value;
    var equipamento = document.getElementById("avariaForm").equipamento.value;
    var descricao = document.getElementById("avariaForm").descricao.value;
    var numeroSerie = document.getElementById("numeroSerieInput").value;

    avarias.push({ empresa, frota, tipo, equipamento, descricao, numeroSerie });
    salvarAvarias(avarias);

    var listaAvarias = document.getElementById("avariasList");
    var listItem = document.createElement("li");
    listItem.textContent = `Empresa: ${empresa} - Frota: ${frota} - Tipo: ${tipo} - Equipamento: ${equipamento} - Descrição: ${descricao} - Número de Série: ${numeroSerie}`;
    
    listaAvarias.appendChild(listItem);
}

function exibirAvarias() {
    document.getElementById("avariasList").innerHTML = "";

    var avariasArmazenadas = obterAvariasArmazenadas();

    var listaAvarias = document.getElementById("avariasList");
    avariasArmazenadas.forEach(function (avaria) {
        var listItem = document.createElement("li");
        listItem.textContent = `Empresa: ${avaria.empresa} - Frota: ${avaria.frota} - Tipo: ${avaria.tipo} - Equipamento: ${avaria.equipamento} - Descrição: ${avaria.descricao} - Número de Série: ${avaria.numeroSerie}`;
        listaAvarias.appendChild(listItem);
    });
}

function limparAvarias() {
    document.getElementById("avariasList").innerHTML = "";

    localStorage.removeItem('avarias');
}
function editarAvarias() {
    alert("Função de edição ainda não implementada.");
}
