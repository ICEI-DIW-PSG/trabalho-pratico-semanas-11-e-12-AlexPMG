const pokemons = [
  { 
    id: 1, nome: "Bulbasaur", tipo: "Grama", cor: "success", 
    imagem: "bulbasaur.png", 
    gif: "bulbasaur2.gif", 
    imagem_carrossel: "img/bulbasaurcarrosel.png",
    stats: "HP:45 | ATK:49 | DEF:49 | SPA:65 | SPD:65 | SPE:45", 
    descricao: "Bulbasaur é o inicial do tipo grama da região de Kanto.",
    evolucao: "16 para Ivysaur",
    ataque: "Vine Whip"
  },
  { 
    id: 2, nome: "Charmander", tipo: "Fogo", cor: "danger", 
    imagem: "charmander.png", 
    gif: "charmander2.gif",
    imagem_carrossel: "img/charmandercarrosel.png",
    stats: "HP:39 | ATK:52 | DEF:43 | SPA:60 | SPD:50 | SPE:65", 
    descricao: "Charmander é o inicial do tipo fogo da região de Kanto.",
    evolucao: "16 para Charmeleon",
    ataque: "Ember"
  },
  { 
    id: 3, nome: "Squirtle", tipo: "Água", cor: "primary", 
    imagem: "squirtle.png", 
    gif: "squirtle2.gif",
    imagem_carrossel: "img/squirtlecarrosel.png",
    stats: "HP:44 | ATK:48 | DEF:65 | SPA:50 | SPD:64 | SPE:43", 
    descricao: "Squirtle é o inicial do tipo água da região de Kanto.",
    evolucao: "16 para Wartortle",
    ataque: "Water Gun"
  },
  { 
    id: 4, nome: "Chikorita", tipo: "Grama", cor: "success", 
    imagem: "img/chikorita.png", 
    gif: "img/chikorita2.gif", 
    stats: "HP:45 | ATK:49 | DEF:65 | SPA:49 | SPD:65 | SPE:45", 
    descricao: "Chikorita é o inicial do tipo grama da região de Johto.",
    evolucao: "16 para Bayleef",
    ataque: "Razor Leaf"
  },
  { 
    id: 5, nome: "Cyndaquil", tipo: "Fogo", cor: "danger", 
    imagem: "img/cyndaquil.png", 
    gif: "img/cyndaquil2.gif", 
    stats: "HP:39 | ATK:52 | DEF:43 | SPA:60 | SPD:50 | SPE:65", 
    descricao: "Cyndaquil é o inicial do tipo fogo da região de Johto.",
    evolucao: "14 para Quilava",
    ataque: "Ember"
  },
  { 
    id: 6, nome: "Totodile", tipo: "Água", cor: "primary", 
    imagem: "img/totodile.png", 
    gif: "img/totodile2.gif", 
    stats: "HP:50 | ATK:65 | DEF:64 | SPA:44 | SPD:48 | SPE:43", 
    descricao: "Totodile é o inicial do tipo água da região de Johto.",
    evolucao: "18 para Croconaw",
    ataque: "Bite"
  }
];

function montarHome() {
  const container = document.getElementById('lista-pokemons');
  if(!container) return;

  container.innerHTML = '';
  pokemons.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
    col.innerHTML = `
      <div class="card text-center bg-${p.cor} text-white h-100">
        <a href="detalhes.html?id=${p.id}" class="text-decoration-none text-white">
          <div class="card-img">
            <img src="${p.imagem}" alt="${p.nome}" class="static">
            <img src="${p.gif}" alt="${p.nome} animado" class="gif">
          </div>
          <div class="card-body">
            <h5 class="card-title">${p.nome}</h5>
            <p class="card-text">${p.tipo}</p>
            <p class="card-text">${p.stats}</p>
          </div>
        </a>
      </div>
    `;
    container.appendChild(col);
  });
}

function montarCarrossel() {
  const destaqueContainer = document.getElementById('destaque-pokemons');
  const indicadoresContainer = document.getElementById('carousel-indicators');

  destaqueContainer.innerHTML = '';
  indicadoresContainer.innerHTML = '';

  pokemons.slice(0,3).forEach((p,i) => {
    destaqueContainer.innerHTML += `
      <div class="carousel-item ${i===0 ? 'active' : ''}">
        <a href="detalhes.html?id=${p.id}" class="d-block">
          <img src="${p.imagem_carrossel || p.imagem}" class="d-block w-100" alt="${p.nome}">
          <div class="carousel-caption">
            <h5>${p.nome}</h5>
            <p>${p.tipo}</p>
          </div>
        </a>
      </div>
    `;
    indicadoresContainer.innerHTML += `
      <button type="button" data-bs-target="#carouselDestaque" data-bs-slide-to="${i}" ${i===0 ? 'class="active" aria-current="true"' : ''}></button>
    `;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  montarHome();
  montarCarrossel();

  const menu = document.getElementById('pokemon-menu');
  pokemons.forEach(p => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `<a class="nav-link" href="detalhes.html?id=${p.id}">${p.nome}</a>`;
    menu.appendChild(li);
  });
});
