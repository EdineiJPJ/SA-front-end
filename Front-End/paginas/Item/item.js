function adicionarItem() {
    const tabela = document.getElementById("tabela").getElementsByTagName('tbody')[0];
    const nomeEpi = document.getElementById("nomeEpi").value.trim();
    const ca = document.getElementById("numberCa").value.trim();
    const quantidade = document.getElementById("quantidadeItem").value;
    const tipoEpi = document.getElementById("tipoEpi").value;

    if (nomeEpi == "" && ca == "" && quantidade == "" && tipoEpi == "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novaLinha = tabela.insertRow();
    const celulaNome = novaLinha.insertCell(0);
    const celulaCa = novaLinha.insertCell(1)
    const celulaQuantidade = novaLinha.insertCell(2);
    const celulaCategoria = novaLinha.insertCell(3);
    const celulaAcao = novaLinha.insertCell(4);

    celulaNome.innerText = nomeEpi;
    celulaCa = ca;
    celulaQuantidade.innerText = quantidade;
    celulaCategoria.innerText = tipoEpi;
    celulaAcao.innerHTML = '<button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="bi bi-trash-fill"></i>Excluir</button>';

    document.getElementById("nomeItem").value = "";
    document.getElementById("numeroCa").value = "";
    document.getElementById("quantidadeItem").value = "";
    document.getElementById("categoriaItem").value = "";
}

function excluirLinha(botao) {
    const linha = botao.parentNode.parentNode;
    linha.parentNode.removeChild(linha);
}