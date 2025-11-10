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

// ==================== POKÉMONS ====================
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

  if(!destaqueContainer || !indicadoresContainer) return;

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

function montarMenu() {
  const menu = document.getElementById('pokemon-menu');
  if(!menu) return;
  
  menu.innerHTML = '';
  pokemons.forEach(p => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.innerHTML = `<a class="nav-link" href="detalhes.html?id=${p.id}">${p.nome}</a>`;
    menu.appendChild(li);
  });
}

// ==================== CRUD USUÁRIOS ====================
const API_URL = 'http://localhost:8000/usuarios';

// Funções globais para o onclick
window.deletarUsuario = async function(id) {
  if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { 
      method: 'DELETE' 
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar usuário');
    }

    listarUsuarios();
    alert('Usuário deletado com sucesso!');
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    alert('Erro ao deletar usuário. Verifique o console para mais detalhes.');
  }
}

window.editarUsuario = async function(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    
    if (!res.ok) {
      throw new Error('Erro ao carregar usuário');
    }
    
    const user = await res.json();

    const novoNome = prompt('Novo nome:', user.nome);
    if (novoNome === null) return;

    const novoEmail = prompt('Novo email:', user.email);
    if (novoEmail === null) return;

    const novaSenha = prompt('Nova senha:', user.senha);
    if (novaSenha === null) return;

    if (novoNome && novoEmail && novaSenha) {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: novoNome, email: novoEmail, senha: novaSenha })
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar usuário');
      }

      listarUsuarios();
      alert('Usuário atualizado com sucesso!');
    }
  } catch (err) {
    console.error("Erro ao editar usuário:", err);
    alert('Erro ao editar usuário. Verifique o console para mais detalhes.');
  }
}

async function listarUsuarios() {
  const listaUsuarios = document.getElementById('lista-usuarios');
  if(!listaUsuarios) return;

  try {
    const res = await fetch(API_URL);
    
    if (!res.ok) {
      throw new Error(`Erro HTTP: ${res.status}`);
    }
    
    const usuarios = await res.json();

    listaUsuarios.innerHTML = '';

    if (usuarios.length === 0) {
      listaUsuarios.innerHTML = `
        <li class="list-group-item text-center text-muted">
          Nenhum usuário cadastrado
        </li>
      `;
      return;
    }

    usuarios.forEach(user => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center usuario-item';
      li.innerHTML = `
        <div>
          <strong>${user.nome}</strong><br>
          <small class="text-muted">${user.email}</small>
          <small class="badge bg-secondary">ID: ${user.id}</small>
        </div>
        <div class="btn-group">
          <button class="btn btn-sm btn-warning me-1" onclick="editarUsuario(${user.id})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="deletarUsuario(${user.id})">Deletar</button>
        </div>
      `;
      listaUsuarios.appendChild(li);
    });

  } catch(err) {
    console.error("Erro ao listar usuários:", err);
    listaUsuarios.innerHTML = `
      <li class="list-group-item text-center text-danger">
        <strong>Erro ao carregar usuários</strong><br>
        <small>${err.message}</small>
        <br>
        <button class="btn btn-sm btn-outline-primary mt-2" onclick="listarUsuarios()">
          Tentar Novamente
        </button>
      </li>
    `;
  }
}

// Configurar formulário
const formUsuario = document.getElementById('form-usuario');
if(formUsuario) {
  formUsuario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!nome || !email || !senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });

      if (!response.ok) {
        throw new Error('Erro ao criar usuário');
      }

      formUsuario.reset();
      listarUsuarios();
      alert('Usuário adicionado com sucesso!');
    } catch (err) {
      console.error("Erro ao adicionar usuário:", err);
      alert('Erro ao adicionar usuário. Verifique o console para mais detalhes.');
    }
  });
}

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Iniciando aplicação...');
  
  // Carregar Pokémons
  montarHome();
  montarCarrossel();
  montarMenu();

  // Carregar usuários
  listarUsuarios();
});