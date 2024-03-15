/*
// Seleciona o botão
var combos = document.getElementById('combos');

function pag1() {

  // Redireciona para a nova página desejada
  window.location.href = 'combos.html'; // Substitua 'nova_pagina.html' pelo caminho da sua nova página
}

// Adiciona um ouvinte de evento para o clique no botão
combos.addEventListener('click', pag1);
*/


/////////////////////////////////////



//Seleciona o elemento HTML com o id "categorias" e armazenar na variavel listaCategorias
let listaCategorias = document.getElementById("listaCategorias")


//Inicia uma requisição fetch para o arquivo "categorias.json"
fetch("categorias.json").then((response) => {

  //Converte a resposta para json
  response.json().then((dados) => {
    //Converte todos os nomes das categorias para letras maiúsculas
    dados.categorias.forEach((produto) => {
      produto.categoria = produto.categoria.toUpperCase()
    })

    //Itera sobre cada categoria e cria botões HTML dentro do elemento com a id "categorias"
    dados.categorias.forEach((produto) => {
      
      // Adiciona um botão ao HTML com id "botao"
      listaCategorias.innerHTML += `
      <button id="botaoCategoria" onclick="prencherInputeOcultarDiv('${produto.categoria1}', this)">${produto.categoria}</button>
      `
    })  
  })
})

document.querySelector("#categorias").addEventListener("click", function () {
  const caixacategorias = this.nextElementSibling;
  if (caixacategorias.style.display === "block") {
    caixacategorias.style.display = "none";
  } else {
    caixacategorias.style.display = "block";
  }
});


function prencherInputeOcultarDiv(categoria, button) {

  //executar a ação desejada (preencher o input com a categpria)
  preencherInput(categoria)

  //Ocultar a div com a classe "categorias"
  const divCategorias = button.closest("#listaCategorias")
  if (divCategorias) {
    divCategorias.style.display = "none"
  }
}

function preencherInput(categoria) {

  //Obtém a referêncoa para o input
  let input = document.getElementById("barraPesquisa")

  //Define o valor do input como "palavra"
  input.value = categoria

  //Chama automaticamente a função filter após preencher o input
  filtrar()
}




///////////////////////////






let divPesquisa = document.querySelector("#listaProdutos");

fetch("dados.json").then((response) => {
  response.json().then((dados) => {
    dados.listaProdutos.forEach((produto) => {
      produto.nome = produto.nome.toUpperCase();
    });

    //ordena o array
    dados.listaProdutos.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });

    dados.listaProdutos.map((produto, index) => {
      let iditem = index + 1; // Definindo o ID do item

      divPesquisa.innerHTML += `
                <li onclick="scrollToCategoria('produto-${iditem}')">
                    <a id="produto">
                        <img src="${produto.img}" />
                        <span id="nomeProduto">${produto.nome}.</span>
                    </a>
                    <p>R$${produto.preco}</p>
                    <p id="disponivel">${produto.disponivel}</p>
                </li>
            `;
    });
  });
});


let barraP = document.querySelector("#barraPesquisa")

function filtrar() {
  var barraPequisa,
    filter,
    ul,
    li,
    a,
    i,
    span,
    txtValue,
    count = 0;

  //PEGAR OS ELEMENTOS HTML
  barraPequisa = document.getElementById("barraPesquisa");
  ul = document.getElementById("listaProdutos");

  //FILTRO
  filter = barraPequisa.value.toUpperCase();

  //PEGAR TODAS AS LI's DA LISTA
  li = ul.getElementsByTagName("li");

  //PERCORRER TODOS OS LI's
  for (i = 0; i < li.length; i++) {
    //PEGAR A TAG <a> DO ELEMENTO PERCORRIDO
    a = li[i].getElementsByTagName("a")[0];

    //PEGAR O TEXTO DENTRO DA NOSSA TAG <a>
    txtValue = a.textContent || a.innerText;

    //VERIFICAR SE O QUE O USUARIO DIGITOU BATE COM O TEXTO DA TAG <a>
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      //VALOR BATEU
      li[i].style.display = "";

      //INCREMENTAR O CONTADOR
      count++;
      //PEGAR A TAG <span> DO ITEM
      span = li[i].querySelector("#nomeProduto");
      //SE EXISTIR
      if (span) {
        span.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match) => {
          return "<strong>" + match + "</strong>";
        });
      }
    } else {
      //NÃO MOSTRAR O ITEM DA LISTA
      li[i].style.display = "none";
    }
  }

  //VERIFICANDO SE TEM ITENS NA LISTA
  if (filter === "") {
    ul.style.display = "none";
  } else {
    ul.style.display = "block";
  }
}

barraP.addEventListener('keyup', filtrar)







let divPesquisa2 = document.querySelector("#listaProdutos2");

fetch("dados.json").then((response) => {
  response.json().then((dados) => {
    dados.listaProdutos.forEach((produto) => {
      produto.nome = produto.nome.toUpperCase();
    });

    // Ordena o array
    dados.listaProdutos.sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });

    dados.listaProdutos.forEach((produto, index) => {
      let iditem = index + 1; // Definindo o ID do item

      divPesquisa2.innerHTML += `
        <li id="produto-${iditem}">
          <a class="produto">
            <div class="img">
              <img src="${produto.img}" alt="imgproduto"/>
            </div>
            <div class="info">
              <div class="nome">
                <span>${produto.nome}.</span>
              </div>
              <div class="preco">
                <p>R$${produto.preco}</p>
              </div>
              <div class="disponibilidade">
                <p>${produto.disponivel}</p>
              </div>
            </div>
          </a>
        </li>
      `;
    });
  });
});

function scrollToCategoria(categoriaId) {
  let barra = document.getElementById("barraPesquisa");
  barra.value = ""; // Limpa o conteúdo do elemento com o ID "barraPesquisa"

  let lista = document.getElementById("listaProdutos")
  lista.style.display = "none";
  
  var categoria = document.getElementById(categoriaId);
  
  const offset = window.innerHeight / 2 - categoria.clientHeight / 2;
  
  window.scrollTo({
    top: categoria.offsetTop - offset,
    behavior: "smooth"
  });
}


