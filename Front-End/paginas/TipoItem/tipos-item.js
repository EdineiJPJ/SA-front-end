async function carregarTiposItens() {
    try {
        const response = await fetch('https://cefb9c9b-1c49-4c67-9064-bd6b7509fdf7.mock.pstmn.io/profissao');
        const tipoItens = await response.json();

        const selectTipoItens = document.getElementById('tipoItem');

        tipoItens.forEach(tipoItem => {
            const option = document.createElement('option');
            option.value = tipoItem.id;
            option.textContent = tipoItem.nome;
            selectTipoItens.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar o tipo Itens:', error);
    }
}

async function carregarItem() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    await carregarTiposItens(); // Carrega as profissões antes de buscar a pessoa

    if (id) {
        document.getElementById('titulo').innerText = 'Editar EPI';

        const response = await fetch(`https://cefb9c9b-1c49-4c67-9064-bd6b7509fdf7.mock.pstmn.io/pessoas/?id=${id}`);
        const item = await response.json();

        document.getElementById('nome').value = item.nome;
        document.getElementById('numeroCA').value = item.numeroCA;
        document.getElementById('quantidade').value = item.quantidade;
        document.getElementById('tipoItem').value = item.tipoItemId; // Seleciona a profissão correta
        document.getElementById('validade').value = item.validade;
    }
}

async function salvarItem() {
    const nome  = document.getElementById('nome').value;
    const numeroCA = document.getElementById('numeroCA').value;
    const quantidade = document.getElementById('quantidade').value;
    const tipoItemId = document.getElementById('tipoItem').value;
    const validade = document.getElementById('validade').value;

    const response = await fetch('http://localhost:3000/api/pessoas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id ? parseInt(id) : undefined,
            nome, numeroCA, quantidade, tipoItemId, validade
        })
    });

    if (response.ok) {
        alert('Item salvo com sucesso!');
        window.location.href = 'listagem.html';
    }
}

carregarItem();