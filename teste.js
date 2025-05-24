
const resultado = document.getElementById("resultado")

function additem(){
    const item = document.getElementById('nome').value
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;

    const dado = {
        nome: item,
        quantidade: quantidade,
        preco: preco
    }
    console.log(dado)
    fetch('api/produtos/adicionar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dado),
    })
    .then(async response => {
        console.log(response)
        if (!response.ok){
            const err = await response.json();
            throw new Error(err.mensagem || 'Erro desconhecido');
        }
        return response.json();
    }).then(data =>{
        console.log(data)
        resultado.innerHTML = `<h1> ${data.mensagem} <h1>`
        document.getElementById('cadastro').reset();
    }).catch(error => {
        console.error('Erro:', error);
        resultado.innerHTML = `Erro: ${error.message}`
    })
}

async function mostrarItems() {
    try{
        const response = await fetch('api/produtos/buscarTodos.php');
        const {dados} = await response.json()
        resultado.innerHTML = "";
        console.log(dados)
        dados.forEach(dado => {
            console.log(dado)
            const produto = document.createElement("div")
            produto.innerHTML = `
            <p><Strong>Id: </Strong> ${dado.id}</p>
            <p><Strong>Nome: </Strong> ${dado.nome}</p>
            <p><Strong>Quantidade: </Strong> ${dado.quantidade}</p>
            <p><Strong>Preco: </Strong> ${dado.preco}</p>`
            resultado.appendChild(produto)
        });
     } catch (error){
        document.getElementById('resultado').innerHTML = 'Erro ao buscar dados: ' + error.message;
    }
};
