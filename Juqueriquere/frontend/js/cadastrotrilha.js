function cancel(){
    document.getElementById('trilhaModalEdit').style.display = 'none';
    document.getElementById('trilhaModalDelete').style.display = 'none';
  };




  
async function deletarTrilhaConfirm(id) {
    
    try {
        const response = await fetch(`http://localhost:9000/trilhas/${id}`);
        const trilhajson = await response.json([0]);
        const trilha = trilhajson[0]
        document.getElementById('trilhaModalDelete').style.display = 'block';
        document.getElementById('trilhaNome').innerText = trilha.nome;
        document.getElementById('buttonExcluir').addEventListener('click', () => deletarTrilha(id));
        } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao deletar trilha');
        }
};
async function deletarTrilha(id) {
    
    try {
          const response = await fetch('http://localhost:9000/trilhas/' + id, {
            method: 'DELETE'});
          
          const result = await response.json();
        if (response.ok) {
          alert(result.mensagem);
          location.reload();
        } else {
          alert(result.mensagem || 'Erro ao deletar trilha');
        }
        } catch (error) {
          console.error('Erro:', error);
          alert('Erro ao deletar trilha');
        }
};



async function editarTrilha(id) {
  try {
    // Requisição para obter dados da trilha
    const response = await fetch(`http://localhost:9000/trilhas/${id}`);
    const trilhajson = await response.json();
    const trilha = trilhajson[0];
    updateFormFields(trilha);

    document.getElementById('trilhaModalEdit').style.display = 'block';
    document.getElementById('buttonEdit').addEventListener('click', () => editarTrilhaConfirm(id));
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao carregar detalhes da trilha');
  }
}

function updateFormFields(trilha) {
  const items = ['nome', 'local', 'extensao', 'altitude', 'duracao', 'dificuldade', 'monitoria', 'agendamento', 'caracteristicas', 'descricao', 'horario', 'imagem', 'destaque'];

  items.forEach(item => {
    const element = document.getElementById(item);
    if (element) {
      if (element.type === 'checkbox') {
        element.checked = trilha[item] === 1;
      } 
      if (element != 'localização' && element == ''){
        return alert("preencha todos os campos");
      }else {
        element.value = trilha[item] || '';
      }
    }
  });
}


async function editarTrilhaConfirm(id) {
  const trilha = {
    nome: document.getElementById('nome').value,
    local: document.getElementById('local').value,
    extensao: document.getElementById('extensao').value,
    altitude: document.getElementById('altitude').value,
    duracao: document.getElementById('duracao').value,
    dificuldade: document.getElementById('dificuldade').value,
    monitoria: document.getElementById('monitoria').checked ? 1 : 0,
    agendamento: document.getElementById('agendamento').checked ? 1 : 0,
    caracteristicas: document.getElementById('caracteristicas').value,
    descricao: document.getElementById('descricao').value,
    horario: document.getElementById('horario').value,
    imagem: document.getElementById('imagem').value,
    destaque: document.getElementById('destaque').checked ? 1 : 0
  };
  console.log(trilha.extensao)
  if (trilha.nome != 0 && trilha.extensao != 0 && trilha.duracao != 0 && trilha.dificuldade != 0 && trilha.caracteristicas != 0 && trilha.descricao != 0 && trilha.horario != 0){
    
    try {
      const response = await fetch(`http://localhost:9000/trilhas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(trilha)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      alert(result.mensagem || 'Trilha editada com sucesso!');
      location.reload();
    } catch (error) {
      if (error.name === 'SyntaxError') {
        console.error('Erro de JSON:', error);
        alert('Erro ao processar resposta do servidor.');
      } else if (error.message.startsWith('HTTP error')) {
          console.error('Erro de rede:', error);
          alert('Erro ao editar trilha. Verifique sua conexão ou tente novamente mais tarde.');
      } else {
          console.error('Erro desconhecido:', error);
          // alert('Erro ao editar trilha.'); 
          // por algum motivo dá um erro desconhecido de vez em quando mesmo o UPDATE sendo bem sucedido (?)
        }
      }
  }else{
    console.log('preencha os campos obrigatórios')
    }
};

async function fetchTrilhas() {
    try {
        const response = await fetch('http://localhost:9000/trilhas');
        const trilhas = await response.json();
        const cardsContainer = document.getElementById('cards-container');
        const modalCon = document.getElementById('container');
        
        // Limpa o container antes de adicionar novos cards
        cardsContainer.innerHTML = '';

        if (trilhas.length == 0){
          document.getElementById('cards-container').style.display = "block";
          document.getElementById('trilhasGap').style.cssText = `
          display : block;
          flexDirection : initial;
          `;
            const noTrilha = document.createElement('div');
            noTrilha.className = 'card-semtrilha';

            
            noTrilha.innerHTML = `
            
              
                <div class="semTrilha blinking">
                <div>
                  <h1 class="item1">Vazio <br> não há trilhas cadastradas ainda!</h1>
                </div>
                <div>
                  <span class="material-symbols-outlined item2">
                  hiking
                  </span>
                </div>
                    
                
            `;
            cardsContainer.appendChild(noTrilha);
        }

        trilhas.forEach(trilha => {
            
            const card = document.createElement('div');
            card.className = 'card-trilha';

            const imageUrl = trilha.imagem || 'https://via.placeholder.com/300';

            card.innerHTML = `
            
                <img src="${imageUrl}" alt="${trilha.nome}">
                <div class="card-container">
                    
                    <h4>${trilha.nome}</h4>
                    <p>${trilha.descricao}</p>
                    <br>
                    <p><span>Extensão:</span> ${trilha.extensao} metros</p>
                    <br>
                    <p>
                        <span>Horário de Funcionamento:</span> ${trilha.horario}
                    </p>
                    
                    <br>
                    <p><span>Acesso:</span> ${trilha.agendamento ? 'Agendamento necessário' : 'Gratuito'}</p>
                    <div class="card-buttons">
                      <button class="delete" onclick="deletarTrilhaConfirm(${trilha.idtrilhas})"><span class="material-symbols-outlined ">delete</span></button>
                      <button class="edit" onclick="editarTrilha(${trilha.idtrilhas})"><span class="material-symbols-outlined ">edit</span></button>
                    </div>
                    
                
            `;
            cardsContainer.appendChild(card);
            
        });
    } catch (error) {
        console.error('Erro ao buscar trilhas:', error);
    }
};

document.addEventListener('DOMContentLoaded', fetchTrilhas);

