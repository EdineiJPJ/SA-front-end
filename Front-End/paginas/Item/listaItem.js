let pessoaIdParaExcluir = null;
let nomePessoaParaExcluir = '';

async function carregarItens() {
    const response = await fetch('https://cefb9c9b-1c49-4c67-9064-bd6b7509fdf7.mock.pstmn.io/pessoas');
    const itens = await response.json();
    const tabelaItens = document.getElementById('tabelaItens');
    tabelaItens.innerHTML = '';

    itens.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${item.nome}</td>
                    <td>${item.quantidade}</td>
                    <td>${item.numeroCA}</td>
                    <td>${item.tipoItem}</td>
                    <td>${item.validade}</td>
                    <td class="text-center" style="width: 200px;">
            <button class="btn btn-danger bi bi-trash-fill" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="comfirmarExclusao(${item.nome}, '${item.numeroCA}')">Excluir</button>
            <a href="item.html?id=${item.nome}" class="btn btn-primary bi bi-pencil-square">Editar</a>
                    </td>
                `;
        pessoasGrid.appendChild(row);
    });
}

// Função para confirmar exclusão e abrir o modal
function confirmarExclusao(numeroCA, nome) {
    itemCaParaExcluir = numeroCA;
    itemNomeParaExcluir = nome;

    // Atualiza o texto do modal com o nome do funcionário
    document.getElementById('modalBodyTexto').innerHTML = `Tem certeza que deseja excluir o funcionário <b>  ${nome}</b>?`;

    // Abre o modal
    new bootstrap.Modal('#staticBackdrop').show();
}

// Função para excluir funcionário
async function excluirItem() {
    if (pessoaIdParaExcluir !== null) {
        const response = await fetch(`http://localhost:3000/api/pessoas/${pessoaIdParaExcluir}`, { method: 'DELETE' });
        if (response.ok) {
            alert('Pessoa excluída com sucesso!');
            carregarItens();
        }
        itemCaParaExcluir = null; // Resetando o ID após a exclusão
        new bootstrap.Modal(document.getElementById('staticBackdrop')).hide(); // Fechando o modal após a exclusão
    }
}

// Carregar funcionários ao iniciar
carregarItens();