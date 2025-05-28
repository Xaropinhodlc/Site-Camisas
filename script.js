
const produtos = [
    {
        id: 1,
        nome: "Camisa Arsenal 2025",
        preco: 179.99,
        imagem: "images/camisa-arsenal.png"
    },
    {
        id: 2,
        nome: "Camisa Barcelona 2025",
        preco: 179.99,
        imagem: "images/camisa-barcelona.png.jpg"
    },
    {
        id: 3,
        nome: "Camisa Barcelona 17/18",
        preco: 199.99,
        imagem: "images/camisa-barcelonaretro.png.jpg"
    },
    {
        id: 4,
        nome: "Camisa Palmeiras 2024",
        preco: 179.99,
        imagem: "images/camisa-palmeiras.png.jpeg" 
    }
];

let carrinho = [];

const listaProdutosElement = document.getElementById('lista-produtos');
const quantidadeCarrinhoElement = document.getElementById('quantidade-carrinho');
const carrinhoIcon = document.getElementById('carrinho-icon');
const carrinhoModal = document.getElementById('carrinho-modal');
const closeButton = document.querySelector('.close-button');
const itensCarrinhoElement = document.getElementById('itens-carrinho');
const carrinhoTotalValorElement = document.getElementById('carrinho-total-valor');
const finalizarCompraBtn = document.querySelector('.finalizar-compra-btn');


function renderizarProdutos() {
    listaProdutosElement.innerHTML = '';
    produtos.forEach(produto => {
    
        const produtoCard = document.createElement('div');
        produtoCard.classList.add('produto-card');

        produtoCard.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button data-id="${produto.id}">Adicionar ao Carrinho</button>
        `;

        
        const addButton = produtoCard.querySelector('button');
        addButton.addEventListener('click', () => adicionarAoCarrinho(produto.id));

        listaProdutosElement.appendChild(produtoCard);
    });
}

function adicionarAoCarrinho(produtoId) {
    
    const produtoAdicionado = produtos.find(produto => produto.id === produtoId);

    if (produtoAdicionado) {
        
        const itemExistente = carrinho.find(item => item.id === produtoId);

        if (itemExistente) {
            
            itemExistente.quantidade++;
        } else {
            
            carrinho.push({ ...produtoAdicionado, quantidade: 1 });
        }
        alert(`${produtoAdicionado.nome} adicionado ao carrinho!`);
        atualizarCarrinho(); 
    }
}

function atualizarCarrinho() {
    
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    quantidadeCarrinhoElement.textContent = totalItens;

    
    itensCarrinhoElement.innerHTML = '';
    let totalCarrinho = 0;

    if (carrinho.length === 0) {
        itensCarrinhoElement.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <span>${item.nome} (x${item.quantidade})</span>
                <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                <button class="remover-item" data-id="${item.id}">Remover</button>
            `;
            
            itemDiv.querySelector('.remover-item').addEventListener('click', () => removerDoCarrinho(item.id));
            itensCarrinhoElement.appendChild(itemDiv);
            totalCarrinho += item.preco * item.quantidade;
        });
    }

    carrinhoTotalValorElement.textContent = totalCarrinho.toFixed(2).replace('.', ',');
}

function removerDoCarrinho(produtoId) {
    carrinho = carrinho.filter(item => item.id !== produtoId);
    atualizarCarrinho();
}


carrinhoIcon.addEventListener('click', (e) => {
    e.preventDefault();
    carrinhoModal.style.display = 'flex'; 
});

closeButton.addEventListener('click', () => {
    carrinhoModal.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === carrinhoModal) {
        carrinhoModal.style.display = 'none';
    }
});

finalizarCompraBtn.addEventListener('click', () => {
    if (carrinho.length > 0) {
        alert("Compra finalizada! Total: R$ " + carrinhoTotalValorElement.textContent);
        carrinho = [];
        atualizarCarrinho();
        carrinhoModal.style.display = 'none';
    } else {
        alert("Seu carrinho está vazio!");
    }
});


document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    atualizarCarrinho();
});